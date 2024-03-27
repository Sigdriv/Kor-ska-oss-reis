import React from "react";
import { ProfileForm } from "./profile";

export default function page() {
  return (
    <>
      <head>
        <title>Profile</title>
        <meta name="description" content="Profile" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <main>
        <h1 className="mb-4 text-3xl">Profile</h1>
        <ProfileForm />
      </main>
    </>
  );
}
