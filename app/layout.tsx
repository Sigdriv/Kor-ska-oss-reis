import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/ui/footer";
import NavBar from "../components/ui/NavBar";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kor ska oss reis",
  description: "Kor ska oss reis",
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
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <NavBar />
            <main className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
              {/* <main className="min-h-screen bg-gradient-to-br from-green to-yellow"> */}
              {children}
            </main>
            <Toaster />
            <Footer />
          </ThemeProvider>
        </body>
      </html>
    </SessionProvider>
  );
}
