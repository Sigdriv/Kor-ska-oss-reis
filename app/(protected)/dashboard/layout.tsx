import { Separator } from "@/components/ui/separator";
import { DocsSidebarNav } from "@/components/ui/sidebar-nav";
import { Metadata } from "next";
import Image from "next/image";

// import { SidebarNav } from "@/app/examples/forms/components/sidebar-nav";

export const metadata: Metadata = {
  title: "Forms",
  description: "Advanced form example using react-hook-form and Zod.",
};

const sidebarNavItems = [
  {
    title: "Settings",
    items: [
      {
        title: "Konto",
        href: "/dashboard",
        items: [],
      },
      {
        title: "Profil",
        href: "/dashboard/profile",
        items: [],
        disabled: false,
      },
      {
        title: "Innstillinger",
        href: "/dashboard/settings",
        items: [],
        disabled: true,
      },
      {
        title: "Konto",
        href: "/dashboard/accounts",
        items: [],
        disabled: false,
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
      <div className="md:hidden"></div>
      <div className="hidden space-y-6 p-10 pb-16 md:block">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Innstillinger</h2>
          <p className="text-muted-foreground">
            Administrer din konto og sett e-postpreferanser.
          </p>
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
