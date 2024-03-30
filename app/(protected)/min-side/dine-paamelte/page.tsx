import React from "react";
import DinePaamelte from "./DinePaamelte";
import { auth } from "@/auth";
import { getTeamsByUser } from "@/actions";
import { teamsByUser } from "@/types/types";

export default async function MinSide() {
  const session = await auth();
  let temasByUser = [];
  if (!!session?.user?.email) {
    temasByUser = await getTeamsByUser(session?.user?.email);
  }

  return (
    <main className="w-screen p-20">
      <h1>Dine påmelte lag:</h1>
      <div className=" grid grid-cols-3">
        {temasByUser.map((team: teamsByUser) => (
          <DinePaamelte {...team} key={team.id}/>
        ))}
      </div>
    </main>
  );
}
