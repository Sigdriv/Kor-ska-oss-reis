"use server";

import ContactUsEmail from "@/components/ui/ContactMail";
import { ContactUsType } from "@/types/types";
import { render } from "@react-email/render";

export const contactUs = async (values: ContactUsType) => {
  const nodemailer = require("nodemailer");

  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    const EmailHTML = render(ContactUsEmail({ ...values }), {
      pretty: true,
    });

    await transporter.sendMail({
      from: "Kor ska oss reis <sigdriv06@gmail.com>",
      to: "sigdriv06@gmail.com",
      subject: values.subject || "Ingen emne – Kontakt oss",
      html: EmailHTML,
    });
  } catch (error) {
    return {
      error: "Epost kunne ikke sendes",
      description: "Venligst prøv igjen",
    };
  }

  return {
    success: "Melding sendt",
    description:
      "Meldingen er sendt til oss, vi vil svare deg så fort som mulig",
  };
};
