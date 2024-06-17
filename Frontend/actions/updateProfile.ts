"use server";

import { db } from "@/lib/db";
import { UpdateProfile } from "@/types/types";

export const updateProfile = async (values: UpdateProfile) => {
  const { id, name, email } = values;

  const existingEmail = await db.user.findUnique({
    where: {
      email,
    },
  });

  if (existingEmail.teamName !== email) {
    const emailWithNewEmail = await db.user.findFirst({
      where: {
        email: {
          equals: email,
          mode: "insensitive", // This makes the comparison case-insensitive
        },
      },
    });

    if (emailWithNewEmail) {
      return { error: "Epost er allerede i bruk!" };
    }
  }

  await db.user.update({
    where: {
      id,
    },
    data: {
      name,
      email,
    },
  });

  return {
    success: `Profil oppdatert med følgende data: \nNavn: "${name}" \nEpost: "${email}"`,
  };
};
