import { Icons } from "./components/ui/icons";

export type LoginValue = {
  email: string;
  password: string;
};

export type RegisterValue = {
  name: string;
  email: string;
  password: string;
};



export interface NavItem {
  title: string
  href?: string
  disabled?: boolean
  external?: boolean
  icon?: keyof typeof Icons
  label?: string
}

export interface NavItemWithChildren extends NavItem {
  items: NavItemWithChildren[]
}

export interface MainNavItem extends NavItem {}

export interface SidebarNavItem extends NavItemWithChildren {}