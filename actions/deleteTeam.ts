"use server";

import { db } from "@/lib/db";

export const deleteTeam = async (id: string) => {
  const team = await db.team.findUnique({
    where: {
      id,
    },
  });
  try {
    await db.team.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    return { status: 500, message: "En feil oppsto under sletting av lag" };
  }
  return {
    status: 200,
    message: `Lag ved navn "${team.teamName}" er slettet!`,
  };
};
