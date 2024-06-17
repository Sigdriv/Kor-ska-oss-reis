"use server";

import { db } from "@/lib/db";

export const fetchTeamsData = async () => {
  return await db.team.findMany({
    select: {
      teamName: true,
    },
  });
};
