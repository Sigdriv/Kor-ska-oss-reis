"use server";

import { db } from "@/lib/db";
import { RegisterSchema } from "@/schemas";
import { RegisterValue } from "@/types/types";
import bcrypt from "bcryptjs";

export const register = async (values: RegisterValue) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Ugyldige felt" };
  }

  const { email, password, name, phone } = validatedFields.success
    ? validatedFields.data
    : { email: "", password: "", name: "", phone: "" };

  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await db.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    return { error: "Epost er allerede i bruk" };
  }

  await db.user.create({
    data: {
      name,
      email,
      phone,
      password: hashedPassword,
    },
  });

  return { success: "Bruker opprettet" };
};
