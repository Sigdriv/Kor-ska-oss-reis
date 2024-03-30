"use server";

import { LoginValue, ProfileFormValues, RegisterValue } from "@/types/types";
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
    return { error: "Invalid fields" };
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
    return { error: "Email already in use!" };
  }

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  return { success: "User created!" };
};

export const handleSignOut = async () => {
  return await signOut();
};
export const getUser = async () => {
  const session = await auth();
  return session;
};

export const registerTeam = async (value: ProfileFormValues) => {
  const { name, email, teamName, countParticipants } = value;

  const existingTeam = await db.paamelte.findFirst({
    where: {
      teamName: {
        equals: teamName,
        mode: "insensitive", // This makes the comparison case-insensitive
      },
    },
  });

  if (existingTeam) {
    return { error: "Team name already in use!" };
  }

  await db.paamelte.create({
    data: {
      name,
      email,
      teamName,
      countParticipants: parseInt(countParticipants),
    },
  });

  return { success: "Team created!" };
};

export const getTeams = async () => {
  return await db.paamelte.findMany();
};

export const getTeamsCount = async () => {
  return await db.paamelte.count();
};

export const getTeamsByUser = async (email: string) => {
  return await db.paamelte.findMany({
    where: {
      email,
    },
  });
};

export const getTeamById = async (id: string) => {
  return await db.paamelte.findUnique({
    where: {
      id,
    },
  });
};
