"use client";
import { useState } from "react";
import DineEgnePaamelte from "./DineEgnePaamelte";
import DineKontaktLag from "./DineKontaktLag";

export default function Dine_Pamelte() {
  return (
    <main className="w-screen p-20 text-2xl min-h-60">
      <DineEgnePaamelte />
      <DineKontaktLag />
    </main>
  );
}
