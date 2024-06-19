import React from "react";
import AllUsersCard from "./AllUsersCard";

export default function page() {
  return (
    <main className="w-screen p-20 pt-10 text-2xl min-h-60">
      <h1 className="text-3xl text-center ">
        <strong>Dev dashboard</strong>
      </h1>
      <AllUsersCard />
    </main>
  );
}
