"use server";

import { db } from "@/lib/db";

export const getAllUsers = async () => {
  return await db.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      role: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};
