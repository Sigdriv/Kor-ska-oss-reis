"use server";

import { db } from "@/lib/db";

export const getTeamsByUser = async (email: string) => {
  const user = await db.user.findUnique({
    where: {
      email,
    },
  });

  return await db.team.findMany({
    where: {
      createdBy: {
        id: user.id,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};
