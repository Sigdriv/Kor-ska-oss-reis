// "use client";
import Link from "next/link";
import React, { useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { HomeIcon, LogOut, Settings, User } from "lucide-react";
import Image from "next/image";
import { auth } from "@/auth";

export default async function NavBar() {
  const session = await auth();

  return (
    <nav className="flex items-center justify-evenly w-screen text-white bg-slate-900 py-2">
      <div className="flex items-center justify-evenly w-screen">
        <Link href="/">Home </Link>
        <Link href="/about">Om oss </Link>
        <Link href="/join">Bli med </Link>
        {!session ? <Link href="/auth/login">Login </Link> : null}
      </div>

      {!!session ? (
        <div className="mr-8">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              {!!session?.user?.image ? (
                <Image
                  src={session?.user?.image}
                  alt="user image"
                  width={40}
                  height={40}
                  className="rounded-lg cursor-pointer"
                />
              ) : (
                <div className="rounded-lg cursor-pointer">
                  {session.user?.name?.split(" ")[0]}
                </div>
              )}
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Min konto</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <Link href="/min-side">
                  <DropdownMenuItem>
                    <HomeIcon className="mr-2 h-4 w-4" />
                    <span>Min side</span>
                  </DropdownMenuItem>
                </Link>
                <Link href="/dashboard/profile">
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profil</span>
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Innstillinger</span>
                  <DropdownMenuShortcut>⌘,</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>

              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <Link href="/auth/signout">
                  <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logg ut</span>
                  </DropdownMenuItem>
                </Link>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ) : null}
    </nav>
  );
}
