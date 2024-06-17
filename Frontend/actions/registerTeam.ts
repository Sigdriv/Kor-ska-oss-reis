"use server";

import { db } from "@/lib/db";
import { CreateTeamsValues } from "@/types/types";

export const registerTeam = async (value: CreateTeamsValues) => {
  const {
    name,
    email,
    countParticipants,
    youngestParticipant,
    oldestParticipant,
    teamName,
    userEmail,
  } = value;

  const existingTeam = await db.team.findFirst({
    where: {
      teamName: {
        equals: teamName,
        mode: "insensitive", // This makes the comparison case-insensitive
      },
    },
  });

  if (existingTeam) {
    return { error: "Lagnavn er allerede i bruk!" };
  }

  try {
    // Fetch the user by userId
    const user = await db.user.findUnique({
      where: {
        email: userEmail,
      },
    });

    if (!user) {
      return {
        error: "Bruker ikke funnet, venligst logg inn igjen og prøv på nytt",
      };
    }

    // Create team associated with the user
    await db.team.create({
      data: {
        name,
        email,
        // phone,
        countParticipants,
        youngestParticipant,
        oldestParticipant,
        teamName,
        createdBy: {
          connect: {
            id: user.id,
          },
        },
      },
    });

    const team = await db.team.findFirst({
      where: {
        teamName: {
          equals: teamName,
          mode: "insensitive",
        },
      },
    });

    return { success: `Lag ved navn "${teamName}" registrert`, id: team.id };
  } catch (error) {
    return {
      error: "En feil oppsto under oppretting av lag, venligst prøv igjen",
    };
  }
};
