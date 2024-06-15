"use server";

import { db } from "@/lib/db";

export const getTeamsCount = async () => {
  return await db.team.count();
};
