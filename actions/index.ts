"use server";

import {
  CreateTeamsValues,
  ForgotPasswordValue,
  LoginValue,
  RegisterValue,
  ResetPassword,
  UpdateProfile,
  UpdateTeamsValues,
} from "@/types/types";
import { LoginSchema, RegisterSchema } from "@/schemas";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { auth, signIn, signOut } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { Resend } from "resend";
import Email from "@/components/ui/Email";

export const login = async (values: LoginValue) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields) {
    return { error: "Ugyldige felt" };
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
          return { error: "Ugyldige inndata" };
        }
        default: {
          return { error: "Noew gikk feil, venligst prøv igjen" };
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

export const forgotPassword = async (values: ForgotPasswordValue) => {
  const { email } = values;
  const resend = new Resend(process.env.RESEND_API_KEY_RESET_PASSWORD);

  const user = await db.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    return {
      error: "Bruker ikke funnet",
      description: "Venligst sjekk at eposten er skrevet inn rett",
    };
  }

  const alreadyRequested = await db.resetPassword.findFirst({
    where: {
      userId: user.id,
    },
  });

  if (alreadyRequested) {
    await db.resetPassword.delete({
      where: {
        id: alreadyRequested.id,
      },
    });
  }

  await db.resetPassword.create({
    data: {
      expires: new Date(Date.now() + 15 * 60 * 1000),
      token: (
        Math.random().toString(36).substring(2) +
        Math.random().toString(36).substring(2)
      ).substring(0, 30),
      userId: user.id,
    },
  });

  const getToken = await db.resetPassword.findFirst({
    where: {
      userId: user.id,
    },
  });

  try {
    await resend.emails.send({
      from: "Kor ska oss reis <onboarding@resend.dev>",
      to: email,
      subject: "Tilbakestill passord",
      react: Email({ Token: getToken.token }),
    });
  } catch (error) {
    console.log(error);
    return {
      error: "Epost kunne ikke sendes",
      description: "Venligst prøv igjen",
    };
  }

  return {
    success: "Epost sendt",
    description: "Epost med instruksjoner er sendt",
  };
};

export const resetPassword = async (values: ResetPassword) => {
  const { password, token } = values;

  const resetPasswordUser = await db.resetPassword.findFirst({
    where: {
      token,
    },
  });

  if (!resetPasswordUser) {
    return {
      error: "Ugyldig token",
      description: "Venligst prøv igjen",
    };
  }

  const now = new Date();
  if (resetPasswordUser.expires < now) {
    await db.resetPassword.delete({
      where: {
        id: resetPasswordUser.id,
      },
    });

    return {
      error: "Token er utløpt",
      description: "Venligst be om nytt passordreset",
    };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await db.user.update({
    where: {
      id: resetPasswordUser.userId,
    },
    data: {
      password: hashedPassword,
    },
  });

  await db.resetPassword.delete({
    where: {
      id: resetPasswordUser.id,
    },
  });

  return {
    success: "Passord endret",
    description: "Passordet ditt er endret",
  };
};

export const handleSignOut = async () => {
  await signOut();

  return {
    success: "Du er logget ut",
    description: "Du er logget ut",
  };
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

  return { success: `Lag ved navn: "${teamName}" er oppdatert!` };
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

export const updateProfile = async (values: UpdateProfile) => {
  const { id, name, email } = values;

  const existingEmail = await db.user.findUnique({
    where: {
      email,
    },
  });

  if (existingEmail.teamName !== email) {
    const emailWithNewEmail = await db.user.findFirst({
      where: {
        email: {
          equals: email,
          mode: "insensitive", // This makes the comparison case-insensitive
        },
      },
    });

    if (emailWithNewEmail) {
      return { error: "Epost er allerede i bruk!" };
    }
  }

  await db.user.update({
    where: {
      id,
    },
    data: {
      name,
      email,
    },
  });

  return {
    success: `Profil oppdatert med følgende data: \nNavn: "${name}" \nEpost: "${email}"`,
  };
};

export const getIdFromEmail = async (email: string) => {
  return await db.user.findUnique({
    where: {
      email,
    },
  });
};
