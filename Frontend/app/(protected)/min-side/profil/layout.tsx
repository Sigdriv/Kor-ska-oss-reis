import { Separator } from "@/components/ui/separator";
import { DocsSidebarNav } from "@/components/ui/sidebar-nav";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forms",
  description: "Advanced form example using react-hook-form and Zod.",
};

const sidebarNavItems = [
  {
    title: "Settings",
    items: [
      {
        title: "Profil",
        href: "/min-side/profil",
        items: [],
        disabled: false,
      },
      {
        title: "Innstillinger",
        href: "/min-side/profil/settings",
        items: [],
        disabled: true,
      },
      {
        title: "Konto",
        href: "/min-side/profil/accounts",
        items: [],
        disabled: true,
      },
    ],
  },
];

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <main className="min-h-screen">
      <div className="md:hidden">
        {/* Content for mobile devices */}
        <h2 className="text-xl font-bold tracking-tight text-center mt-10">
          Innstillinger
        </h2>
        <p className="text-muted-foreground text-center">
          Du kan ikke oppdatere kontoen på denne enheten/skjermstørrelsen <br />
          Vennligst bruk en større skjerm
        </p>
      </div>
      <div className="hidden space-y-6 p-10 pb-16 md:block">
        {/* Content for tablet and larger devices */}
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Innstillinger</h2>
          <p className="text-muted-foreground">Administrer din konto.</p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
            <DocsSidebarNav items={sidebarNavItems} />
          </aside>
          <div className="flex-1 lg:max-w-2xl">{children}</div>
        </div>
      </div>
    </main>
  );
}
