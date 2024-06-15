"use server";

import { signOut } from "@/auth";

export const handleSignOut = async () => {
  await signOut();

  return {
    success: "Du er logget ut",
    description: "Du er logget ut",
  };
};
