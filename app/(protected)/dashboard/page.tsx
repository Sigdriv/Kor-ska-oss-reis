import { auth } from "@/auth";
import React from "react";
import Link from "next/link";
import Image from "next/image";

export default async function Dashboard() {
  const session = await auth();

  if (!session) {
    throw new Error("Session is undefined");
  }

  return (
    <>
      <head>
        <title>Dashboard</title>
        <meta name="description" content="Dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <main className=" min-h-screen ">
        <h1 className="text-center text-3xl p-4">
          Velkommen <strong>{session.user?.name}</strong>
        </h1>
        <h1 className=" text-2xl p-4">Her er din profil</h1>
        <div className="flex flex-col  justify-center">
          <h1 className="text-1xl pt-4">Navn: {session.user?.name}</h1>
          <h1 className="text-1xl pt-2">Epost: {session.user?.email}</h1>
          <div className="">
            {!!session?.user?.image ? (
              <>
                <h1>Bilde:</h1>
                <Image
                  src={session?.user?.image}
                  alt="user image"
                  width={80}
                  height={80}
                  className="rounded-lg cursor-pointer"
                />
              </>
            ) : (
              <h1>Ingen bilde</h1>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
