"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";

export default function AboutUs() {
  const [underDev, setUnderDev] = useState(true);

  return (
    <>
      {underDev && (
        <div className="flex items-center justify-center w-full h-12 bg-red-500">
          <h1 className="text-white">Denne siden er under utvikling</h1>
          <Link href="/">
            <Button className="text-white bg-red-500">X</Button>
          </Link>
        </div>
      )}

      {!underDev && (
        <>
          <div className="flex w-full">
            <h1 className="text-3xl text-left">Om oss</h1>
            <h1 className="text-3xl text-right">Tidligere vinnere: </h1>
          </div>
          <div className="flex w-full mt-10">
            <div className="flex items-center justify-center w-96">
              <h1 className="text-center text-2xl">
                "Kor ska oss reis?" er et påfunn av Rune og Herborg Skjoden med
                inspirasjon av{" "}
                <Link
                  href="https://tv.nrk.no/serie/paaskelabyrinten-tv/sesong/2024"
                  className=" text-blue-500 underline"
                >
                  påskelabyrinten på NRK.
                </Link>{" "}
                Reisen startet i påsken 2023 og har har siden blitt en årlig
                tradisjon hvor påmeldte lag konkurerer om å gjette seg fram til
                den rette plasseringen. Under "Kor ska oss reis?" reiser vi
                rundt i forskjellige byer, land, universer, tidsperioder og
                fantasier.
              </h1>
            </div>
          </div>
        </>
      )}
    </>
  );
}
