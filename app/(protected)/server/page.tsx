import { auth } from "@/auth";
import React from "react";

export default async function Server() {
  const session = await auth();

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br text-white from-slate-900 to-slate-800">
      <div>
        {JSON.stringify(session)}
        <p>Dette er et hemmelig server dashboard</p>
      </div>
    </main>
  );
}
