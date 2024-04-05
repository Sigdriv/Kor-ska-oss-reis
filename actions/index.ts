"use server";

import {
  CreateTeamsValues,
  LoginValue,
  RegisterValue,
  UpdateTeamsValues,
} from "@/types/types";
import { LoginSchema, RegisterSchema } from "@/schemas";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { auth, signIn, signOut } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";

export const login = async (values: LoginValue) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields) {
    return { error: "Invalid fields" };
  }

  const { email, password } = validatedFields.success
    ? validatedFields.data
    : { email: "", password: "" };

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin": {
          return { error: "Invalid credentials" };
        }
        default: {
          return { error: "Something went wrong" };
        }
      }
    }
    throw error;
  }
};

export const register = async (values: RegisterValue) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Ugyldige felt" };
  }

  const { email, password, name } = validatedFields.success
    ? validatedFields.data
    : { email: "", password: "", name: "" };

  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await db.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    return { error: "Epost er allerede i bruk" };
  }

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  return { success: "Bruker opprettet" };
};

export const handleSignOut = async () => {
  return await signOut();
};
export const getUser = async () => {
  const session = await auth();
  return session;
};

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

export const getTeamsCount = async () => {
  return await db.team.count();
};

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

export const getTeamById = async (id: string) => {
  return await db.team.findUnique({
    where: {
      id,
    },
  });
};

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

  return { success: "Lag oppdatert!" };
};

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
