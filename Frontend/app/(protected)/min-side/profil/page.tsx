import React from "react";
import { ProfileForm } from "./profile";

export default function page() {
  return (
    <>
      <head>
        <title>Profil</title>
        <meta name="description" content="Profile" />
      </head>
      <main>
        <h1 className="mb-4 text-3xl">Profil</h1>
        <ProfileForm />
      </main>
    </>
  );
}
