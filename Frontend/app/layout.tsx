import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/ui/footer";
import NavBar from "../components/ui/NavBar";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kor ska oss reis",
  description:
    "Kor ska oss reis er basert på en egen idé med som er basert på 'Påskelabyrinten' til NRK. Vi har laget en egen versjon av dette, som vi har kalt 'Kor ska oss reis'.",
  keywords:
    "Kor ska oss reis, Påskelabyrinten, Påskelabyrint, NRK, Påske, Påskeegg, Påskequiz, Påskejakt, Påskegåte, Påskeoppgave, Påskekonkurranse, Rennebu, Berkåk, Oppdal, Trondheim, Melhus, Støren, Orkanger, Norge, Norway, Påskeferie, Påskeaktivitet, Påskelek, Påskeunderholdning, Påskekonkurranse, Påskequiz, Påskegåte, Påskeoppgave, Påskejakt, Påskeegg",
  // image: "../public/assets/main/kor-ska-oss-reis_2024_1920.png",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
      <html lang="en">
        <body className={inter.className}>
          <NavBar />
          {/* <main className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800"> */}
          <main className="min-h-screen">
            {/* <main className="min-h-screen bg-gradient-to-br from-green to-yellow"> */}
            {children}
          </main>
          <Toaster />
          <Footer />
        </body>
      </html>
    </SessionProvider>
  );
}
