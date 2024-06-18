"use server";
import { db } from "@/lib/db";

export const getTeamsByContactEmail = async (email: string, id: string) => {
  return await db.team.findMany({
    where: {
      email: email,
      NOT: {
        createdBy: {
          id: id,
        },
      },
    },
  });
};
