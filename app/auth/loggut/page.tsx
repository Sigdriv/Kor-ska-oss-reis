"use client";

import { handleSignOut } from "@/actions";
import { useEffect, useTransition } from "react";

export default function SignOut() {
  const [pending, startTransition] = useTransition();
  useEffect(() => {
    startTransition(async () => {
      await handleSignOut();
    });
  }, []);

  return (
    <main className=" flex flex-col items-center justify-center min-h-screen ">
      <h1>Logger ut....</h1>
    </main>
  );
}
