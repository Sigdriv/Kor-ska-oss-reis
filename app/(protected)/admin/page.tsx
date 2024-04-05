import React from "react";
import PaamelteCard from "./PaamelteCard";
// import SendEmailCard from "./SendEmailCard";

export default function Admin() {
  return (
    <main className="">
      <div className=" pt-10 text-2xl">
        <h1>Admin dashboard</h1>
        <div className="flex flex-row gap-2 ml-24">
          <PaamelteCard />
          {/* <SendEmailCard /> */}
        </div>
      </div>
    </main>
  );
}
