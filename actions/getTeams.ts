"use server";

import { db } from "@/lib/db";

export const getTeams = async () => {
  return await db.team.findMany({
    include: {
      createdBy: {
        select: {
          name: true,
        },
      },
    },
  });
};
