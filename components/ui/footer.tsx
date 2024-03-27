import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="flex justify-evenly w-screen text-white py-6 bg-slate-900">
      <h3>Made by <Link href='https://www.github.com/sigdriv'>
      Sigurd
      </Link></h3>
    </footer>
  );
}
