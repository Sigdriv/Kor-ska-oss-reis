"use server";

import { db } from "@/lib/db";
import { UpdateTeamsValues } from "@/types/types";

export const updateTeam = async (value: UpdateTeamsValues) => {
  const {
    id,
    name,
    email,
    teamName,
    countParticipants,
    youngestParticipant,
    oldestParticipant,
  } = value;

  const existingTeam = await db.team.findUnique({
    where: {
      id,
    },
  });

  if (existingTeam.teamName !== teamName) {
    const teamWithNewName = await db.team.findFirst({
      where: {
        teamName: {
          equals: teamName,
          mode: "insensitive", // This makes the comparison case-insensitive
        },
      },
    });

    if (teamWithNewName) {
      return { error: "Lagnavn er allerede i bruk!" };
    }
  }

  await db.team.update({
    where: {
      id,
    },
    data: {
      name,
      email,
      teamName,
      countParticipants,
      youngestParticipant,
      oldestParticipant,
    },
  });

  return { success: `Lag ved navn: "${teamName}" er oppdatert!` };
};
