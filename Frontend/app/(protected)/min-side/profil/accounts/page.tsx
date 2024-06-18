import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import GooglePicture from "@/public/assets/google/google.png";

export default function page() {
  return (
    <div>
      <h1 className="mb-4 text-3xl">Konto</h1>
      <p>Link dine kontoer her</p>

      <div className="mt-8">
        <h2 className="text-xl font-semibold">Google</h2>
        <p className="text-muted-foreground">
          Link din Google-konto for å enklere logge inn.
        </p>
        <Button className="btn mt-4">
          <Image className="h-6 w-6 mr-2" src={GooglePicture} alt="Google" />
          Link Google-konto
        </Button>
      </div>
    </div>
  );
}
