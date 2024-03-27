"use client"
import React from "react";
import { useSession } from "next-auth/react";

export default function Server() {
  const session = useSession();

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br text-white from-slate-900 to-slate-800">
      <div>
        {JSON.stringify(session)}
        <p>Dette er et hemmelig client dashboard</p>
      </div>
    </main>
  );
}
