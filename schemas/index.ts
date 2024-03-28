import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, { message: "Password can not be empty" }),
});

export const RegisterSchema = z.object({
  name: z.string().min(1, { message: "Name is requierd!" }),
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: "Password need to be more than 6 caracters" }),
});

export const profileFormSchema = z.object({
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
  countParticipants: z.string().min(1, {
    message: "Venligst skriv inn antall deltakere.",
  }),
});
