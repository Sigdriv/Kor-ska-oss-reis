// "use client";
import Link from "next/link";
import React from "react";
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
import { LogOut, Settings, User } from "lucide-react";
import Image from "next/image";
import { auth } from "@/auth";

export default async function NavBar() {
  const session = await auth();

  return (
    <nav className="flex items-center justify-evenly w-screen text-white bg-slate-900 py-2">
      <div className="flex items-center justify-evenly w-screen">
        <Link href="/">Home </Link>
        <Link href="/auth/login">Login </Link>
        <Link href="/auth/register">Register </Link>
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
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <Link href="/dashboard/profile">
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                  <DropdownMenuShortcut>⌘,</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>

              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <Link href="/auth/signout">
                  <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                  </DropdownMenuItem>
                </Link>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ) : null}
      {/* <div className="mr-4">
        <ModeToggle />
      </div> */}
    </nav>
  );
}
