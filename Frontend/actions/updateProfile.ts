"use server";

import { db } from "@/lib/db";
import { UpdateProfile } from "@/types/types";
import { getUser } from "./getUser";

export const updateProfile = async (values: UpdateProfile) => {
  const { id, name, email, phone } = values;
  const session = await getUser();

  // Check if the current session user is allowed to update the profile
  if (session?.user?.id !== id) {
    return { error: "Unauthorized action!" };
  }

  // Check if the email or phone has changed
  const isEmailChanged = email !== session?.user?.email;
  const isPhoneChanged = phone !== session?.user?.phone;

  if (isEmailChanged) {
    // Check if the new email is already in use by another user
    const existingEmail = await db.user.findUnique({
      where: { email },
    });

    if (existingEmail) {
      return { error: "Epost er allerede i bruk!" };
    }
  }

  if (isPhoneChanged) {
    // Check if the new phone number is already in use by another user (if required)
    const existingPhone = await db.user.findUnique({
      where: { phone },
    });

    if (existingPhone) {
      return { error: "Telefonnummeret er allerede i bruk!" };
    }
  }

  // Update the user profile
  await db.user.update({
    where: { id },
    data: { name, email, phone },
  });

  return {
    success: `Profil oppdatert`,
  };
};
