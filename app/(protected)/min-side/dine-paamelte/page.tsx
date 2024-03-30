import React from "react";
import PaamelteCard from "./PaamelteCard";
import { auth } from "@/auth";
import { getTeamsByUser } from "@/actions";
import { teamsByUser } from "@/types/types";

export default async function MinSide() {
  const session = await auth();
  let temasByUser = [];
  if (!!session?.user?.email) {
    temasByUser = await getTeamsByUser(session?.user?.email);
  }

  console.log(temasByUser);

  return (
    <div>
      <h1>Min side</h1>
      <h1>Dine påmelte lag:</h1>
      {temasByUser.map((team: teamsByUser) => (
        <PaamelteCard {...team} />
      ))}
    </div>
  );
}
