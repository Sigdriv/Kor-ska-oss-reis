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
    <>
      <head>
        <title>Kor ska oss reis | Logg ut</title>
        <meta name="description" content="Kor ska oss reis | Logg ut" />
      </head>
      <main className=" flex flex-col items-center justify-center min-h-screen ">
        <h1>Logger ut....</h1>
      </main>
    </>
  );
}
