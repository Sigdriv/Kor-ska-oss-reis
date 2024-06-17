import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="flex justify-evenly w-screen py-6 bg-slate-200">
      <h3>
        Made by{" "}
        <Link href="https://www.github.com/sigdriv">
          <strong>Sigurd</strong>
        </Link>{" "}
        for &quot;Kor ska oss reis&quot;
      </h3>
    </footer>
  );
}
