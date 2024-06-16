import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, { message: "Passord kan ikke være tomt" }),
});

export const RegisterSchema = z.object({
  name: z.string().min(1, { message: "Venligst skriv inn et navn" }),
  email: z.string().email(),
  phone: z.string().min(8, { message: "Venligst skriv inn et telefonnummer" }),
  password: z
    .string()
    .min(6, { message: "Passord må være mer enn 6 karakterer" }),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email(),
});

export const resetPasswordSchema = z
  .object({
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
    })
    .optional(),
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
  youngestParticipant: z.string().min(1, {
    message: "Venligst skriv inn en alder på den yngste.",
  }),
  oldestParticipant: z.string().min(1, {
    message: "Venligst skriv inn en alder på den eldste.",
  }),
});
