"use server";

import { db } from "@/lib/db";
import { ResetPassword } from "@/types/types";
import bcrypt from "bcryptjs";

export const resetPassword = async (values: ResetPassword) => {
  const { password, token } = values;

  const resetPasswordUser = await db.resetPassword.findFirst({
    where: {
      token,
    },
  });

  if (!resetPasswordUser) {
    return {
      error: "Ugyldig token",
      description: "Venligst prøv igjen",
    };
  }

  const now = new Date();
  if (resetPasswordUser.expires < now) {
    await db.resetPassword.delete({
      where: {
        id: resetPasswordUser.id,
      },
    });

    return {
      error: "Token er utløpt",
      description: "Venligst be om nytt passordreset",
    };
  }

  const user = await db.user.findUnique({
    where: {
      id: resetPasswordUser.userId,
    },
  });

  const samePassword = await bcrypt.compare(password, user.password);

  if (samePassword) {
    return {
      error: "Samme passord",
      description: "Du kan ikke bruke samme passord, venligst velg et annet",
    };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await db.user.update({
    where: {
      id: resetPasswordUser.userId,
    },
    data: {
      password: hashedPassword,
    },
  });

  await db.resetPassword.delete({
    where: {
      id: resetPasswordUser.id,
    },
  });

  return {
    success: "Passord endret",
    description: "Passordet ditt er endret",
  };
};
