import React from "react";
import { RegisterForm } from "./RegisterForm";

export default function Join() {
  return (
    <>
      <head>
        <title>Bli med</title>
        <meta name="description" content="Bli med" />
      </head>
      <main className=" w-screen p-10">
        <div className="flex justify-center text-3xl">
          <h1>Vil du være med på den neste reisen?</h1>
        </div>
        <div className="flex justify-center pt-4 text-2xl">
          <h1>Meld på ditt lag under</h1>
        </div>
        <div className=" p-24">
          <RegisterForm />
        </div>
      </main>
    </>
  );
}
