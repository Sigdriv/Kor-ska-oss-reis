"use server";

import { db } from "@/lib/db";
import type { updateUserType } from "@/types/types";
import { getUser } from "./getUser";
import bcrypt from "bcryptjs";

export async function updateUser({
  id,
  name,
  email,
  phone,
  role,
}: updateUserType) {
  const auth = await getUser();
  if (!auth)
    return {
      title: "Ikke autorisert",
      error: "Du må være logget inn for å kunne oppdatere en bruker.",
    };

  if (auth.user.role !== "DEV") {
    return {
      title: "Ikke autorisert",
      error: "Du må være utvikleren for å bruke denne siden",
    };
  }

  const user = await db.user.findUnique({
    where: {
      id: id,
    },
  });

  if (!user) {
    return {
      title: "Bruker ikke funnet",
      error: "Brukeren du prøver å oppdatere finnes ikke i databasen.",
    };
  }

  if (user.role === "DEV") {
    return {
      title: "Error",
      error: "Du kan ikke oppdatere en bruker med rolle 'DEV.'",
    };
  }

  await db.user.update({
    where: { id },
    data: {
      name,
      email,
      phone,
      role,
    },
  });

  const returnUser = await db.user.findUnique({
    where: {
      id,
    },
  });

  return {
    title: "Bruker oppdatert",
    success: `Brukeren til "${returnUser.name}" ble oppdatert`,
  };
}
