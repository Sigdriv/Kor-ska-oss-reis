import React from "react";

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      {children}
    </main>
  );
}
