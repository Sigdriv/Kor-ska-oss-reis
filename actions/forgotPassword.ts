"use server";

import Email from "@/components/ui/Email";
import { db } from "@/lib/db";
import { ForgotPasswordValue } from "@/types/types";
import { Resend } from "resend";

export const forgotPassword = async (values: ForgotPasswordValue) => {
  const { email } = values;
  const resend = new Resend(process.env.RESEND_API_KEY_RESET_PASSWORD);

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
      token: (
        Math.random().toString(36).substring(2) +
        Math.random().toString(36).substring(2)
      ).substring(0, 30),
      userId: user.id,
    },
  });

  const getToken = await db.resetPassword.findFirst({
    where: {
      userId: user.id,
    },
  });

  try {
    await resend.emails.send({
      from: "Kor ska oss reis <onboarding@resend.dev>",
      to: email,
      subject: "Tilbakestill passord",
      react: Email({ Token: getToken.token }),
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
    description: "Epost med instruksjoner er sendt",
  };
};
