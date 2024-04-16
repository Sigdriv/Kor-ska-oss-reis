// pages/signout.js
"use client";

import { handleSignOut } from "@/actions";
import { useEffect } from "react";

export default function SignOut() {
  useEffect(() => {
    handleSignOut();
  }, []);

  return (
    <main className=" flex flex-col items-center justify-center min-h-screen ">
      <h1>Logger ut....</h1>
    </main>
  );
}
