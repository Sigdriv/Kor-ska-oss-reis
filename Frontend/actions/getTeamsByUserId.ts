"use server";

import { db } from "@/lib/db";

export const getTeamsByUserId = async (id: string) => {
  return await db.team.findMany({
    where: {
      createdBy: {
        id: id,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};
