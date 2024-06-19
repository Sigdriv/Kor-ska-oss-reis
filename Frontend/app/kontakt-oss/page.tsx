import React from "react";
import ContactForm from "./ContactForm";

export default function KontaktOss() {
  return (
    <main className=" p-24 pt-10 flex flex-col items-center justify-center">
      <div>
        <h1 className=" text-center text-2xl">
          <strong>Kontakt oss</strong>
        </h1>
        <h1 className="text-xl mt-2">
          Full ut under feltende under for å sende oss en melding
        </h1>
        <ContactForm />
      </div>
    </main>
  );
}
