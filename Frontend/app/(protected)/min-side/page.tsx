import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export default function page() {
  return (
    <div>
      <h1>Min side</h1>
      <Link href="/min-side/dine-paamelte">
        <Button>Dine påmelte lag</Button>
      </Link>
    </div>
  );
}
