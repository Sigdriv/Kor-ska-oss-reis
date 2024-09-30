import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, { message: "Passord kan ikke være tomt" }),
});

export const RegisterSchema = z
  .object({
    name: z.string().min(1, { message: "Venligst skriv inn et navn" }),
    email: z.string().email(),
    phone: z
      .string()
      .min(8, { message: "Venligst skriv inn et telefonnummer" }),
    password: z
      .string()
      .min(6, { message: "Passord må være mer enn 6 karakterer" }),
    repeatPassword: z.string().min(6, {
      message: "Passord må være mer enn 6 karakterer",
    }),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: "Passordene må være like",
    path: ["repeatPassword"], // Error will be reported on repeatPassword
  });

export const forgotPasswordSchema = z.object({
  email: z.string().email(),
});

export const resetPasswordSchema = z
  .object({
    token: z.string({ message: "Det skjedde en feil, prøv igjen senere" }),
    password: z.string().min(6, {
      message: "Passord må være mer enn 6 karakterer",
    }),
    repeatPassword: z.string().min(6, {
      message: "Passord må være mer enn 6 karakterer",
    }),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: "Passordene må være like",
    path: ["repeatPassword"], // Error will be reported on repeatPassword
  });

export const profileFormSchema = z.object({
  id: z.string(),
  name: z.string().min(2, {
    message: "Venligst skriv inn et navn.",
  }),
  email: z
    .string({
      required_error: "Venligst skriv inn en e-postadresse.",
    })
    .email(),
  phone: z.string().min(8, {
    message: "Venligst skriv inn et telefonnummer.",
  }),
});

export const createTeamsSchema = z.object({
  name: z.string().min(2, {
    message: "Venligst skriv inn et navn.",
  }),
  email: z
    .string({
      required_error: "Venligst skriv inn en e-postadresse.",
    })
    .email(),
  teamName: z.string().min(2, {
    message: "Venligst skriv inn et lagnavn.",
  }),
  countParticipants: z
    .string()
    .min(1, {
      message: "Venligst skriv inn antall deltagere dere er i laget",
    })
    .refine((value) => Number(value) >= 0, {
      message: "Antall deltakere kan ikke være under 0",
    }),
  youngestParticipant: z.string().optional(),
  oldestParticipant: z.string().optional(),
  userEmail: z.string().email(),
});

export const updateTeamsSchema = z.object({
  id: z.string(),
  name: z.string().min(2, {
    message: "Venligst skriv inn et navn.",
  }),
  email: z
    .string({
      required_error: "Venligst skriv inn en e-postadresse.",
    })
    .email(),
  teamName: z.string().min(2, {
    message: "Venligst skriv inn et lagnavn.",
  }),
  countParticipants: z
    .string()
    .min(1, {
      message: "Venligst skriv inn antall deltagere dere er i laget.",
    })
    .refine((value) => Number(value) >= 0, {
      message: "Antall deltakere kan ikke være under 0",
    }),
  youngestParticipant: z.string().nullable().optional(),
  oldestParticipant: z.string().nullable().optional(),
});

export const updateUserSchema = z.object({
  id: z.string(),
  name: z.string().min(2, {
    message: "Venligst skriv inn et navn.",
  }),
  email: z
    .string({
      required_error: "Venligst skriv inn en e-postadresse.",
    })
    .email(),
  phone: z.string().min(8, {
    message: "Venligst skriv inn et telefonnummer.",
  }),
  role: z.string(),
});

export const contactUsSchema = z.object({
  name: z.string().min(2, {
    message: "Venligst skriv inn et navn.",
  }),
  email: z
    .string({
      required_error: "Venligst skriv inn en e-postadresse.",
    })
    .email(),
  phone: z.string().optional(),
  subject: z.string().min(2, { message: "Venligst skriv inn et emne." }),
  message: z.string().min(10, {
    message: "Venligst skriv inn en melding på minst 10 tegn.",
  }),
});
