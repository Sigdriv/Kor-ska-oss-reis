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
    message: "Name must be at least 2 characters.",
  }),
  email: z
    .string({
      required_error: "Please select an email to display.",
    })
    .email(),
  picture: z.string({
    required_error: "Please select a profile picture.",
  }),
  urls: z
    .array(
      z.object({
        value: z.string().url({ message: "Please enter a valid URL." }),
      })
    )
    .optional(),
});
