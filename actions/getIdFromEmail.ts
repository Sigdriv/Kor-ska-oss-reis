"use server";

import { db } from "@/lib/db";

export const getIdFromEmail = async (email: string) => {
  return await db.user.findUnique({
    where: {
      email,
    },
  });
};
