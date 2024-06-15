"use server";

import Email from "@/components/ui/Email";
import { db } from "@/lib/db";
import { ForgotPasswordValue } from "@/types/types";
import { render } from "@react-email/render";

export const forgotPassword = async (values: ForgotPasswordValue) => {
  const { email } = values;
  const nodemailer = require("nodemailer");
  const BaseURL = process.env.BASE_URL;

  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const tokenGenerate = async (): Promise<string> => {
    const token =
      Math.random().toString(36).substring(2) +
      Math.random().toString(36).substring(2);
    return await tokenCheck(token);
  };

  const tokenCheck = async (token: string) => {
    const alreadyInUse = await db.resetPassword.findFirst({
      where: {
        token,
      },
    });
    if (alreadyInUse) {
      return await tokenGenerate();
    } else {
      return token;
    }
  };

  const user = await db.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    return {
      error: "Bruker ikke funnet",
      description: "Venligst sjekk at eposten er skrevet inn rett",
    };
  }

  const alreadyRequested = await db.resetPassword.findFirst({
    where: {
      userId: user.id,
    },
  });

  if (alreadyRequested) {
    await db.resetPassword.delete({
      where: {
        id: alreadyRequested.id,
      },
    });
  }

  await db.resetPassword.create({
    data: {
      expires: new Date(Date.now() + 15 * 60 * 1000),
      token: await tokenGenerate(),
      userId: user.id,
    },
  });

  const getToken = await db.resetPassword.findFirst({
    where: {
      userId: user.id,
    },
  });

  try {
    const EmailHTML = render(Email({ URL: BaseURL, Token: getToken.token }), {
      pretty: true,
    });

    await transporter.sendMail({
      from: "Kor ska oss reis <sigdriv06@gmail.com>",
      to: email,
      subject: "Tilbakestill passord",
      html: EmailHTML,
    });
  } catch (error) {
    console.log(error);
    return {
      error: "Epost kunne ikke sendes",
      description: "Venligst prøv igjen",
    };
  }

  return {
    success: "Epost sendt",
    description: "Epost med instruksjoner er sendt, sjekk søppelmappen ",
  };
};
