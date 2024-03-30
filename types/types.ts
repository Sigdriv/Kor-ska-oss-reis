import { z } from "zod";
import { Icons } from "../components/ui/icons";
import { profileFormSchema, updateTeamsSchema } from "../schemas";

export type LoginValue = {
  email: string;
  password: string;
};

export type RegisterValue = {
  name: string;
  email: string;
  password: string;
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
  teamName: string;
  countParticipants: string;
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

export type UpdateTeamsValues = z.infer<typeof updateTeamsSchema>;
