import { z } from "zod";
import { Icons } from "../components/ui/icons";
import {
  createTeamsSchema,
  profileFormSchema,
  updateTeamsSchema,
  updateUserSchema,
} from "../schemas";

export type LoginValue = {
  email: string;
  password: string;
};

export type RegisterValue = {
  name: string;
  email: string;
  phone: string;
  password: string;
};

export type ForgotPasswordValue = {
  email: string;
};

export type ResetPassword = {
  token: string | undefined;
  password: string;
  repeatPassword: string;
};

export type UpdateProfileValue = {
  expires: string | undefined;
  name?: string | null | undefined;
  email?: string | null | undefined;
  id?: string | null | undefined;
};

export interface NavItem {
  title: string;
  href?: string;
  disabled?: boolean;
  external?: boolean;
  icon?: keyof typeof Icons;
  label?: string;
}

export interface Teams {
  id: string;
  name: string;
  email: string;
  userEmail: string;
  countParticipants: string;
  youngestParticipant?: string;
  oldestParticipant?: string;
  teamName: string;
  createdBy: { name: string };
}

export interface teamsByUser {
  teamName: string;
  countParticipants: number;
  id: string;
}

export interface NavItemWithChildren extends NavItem {
  items: NavItemWithChildren[];
}

export interface MainNavItem extends NavItem {}

export interface SidebarNavItem extends NavItemWithChildren {}

export type ProfileFormValues = z.infer<typeof profileFormSchema>;

export type CreateTeamsValues = z.infer<typeof createTeamsSchema>;
export type UpdateTeamsValues = z.infer<typeof updateTeamsSchema>;
export type UpdateProfile = z.infer<typeof profileFormSchema>;

export type updateUserType = z.infer<typeof updateUserSchema>;
