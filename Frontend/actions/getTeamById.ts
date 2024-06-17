"use server";

import { db } from "@/lib/db";

export const getTeamById = async (id: string) => {
  return await db.team.findUnique({
    where: {
      id,
    },
  });
};
