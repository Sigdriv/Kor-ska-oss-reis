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
        <div className="flex justify-center items-center text-3xl text-center">
          <h1>Vil du være med på den neste reisen?</h1>
        </div>
        <div className="flex justify-center pt-4 text-2xl text-center">
          <h1>Meld på ditt lag under</h1>
        </div>
        <div className=" pt-20 pb-20 ">
          <RegisterForm />
        </div>
      </main>
    </>
  );
}
