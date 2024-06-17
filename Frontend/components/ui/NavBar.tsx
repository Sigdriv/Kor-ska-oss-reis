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
import { HomeIcon, LogOut, User, UserCog, UsersIcon } from "lucide-react";
import Image from "next/image";
import { auth } from "@/auth";

export default async function NavBar() {
  const session = await auth();

  return (
    <nav className="flex items-center justify-evenly w-screen bg-slate-200 py-2">
      <div className="flex items-center justify-evenly w-screen">
        <Link href="/">Hjem </Link>
        <Link href="/om-oss">Om oss </Link>
        <Link href="/bli-med">Bli med </Link>
        {!session && <Link href="/auth/logginn">Logg inn </Link>}
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
              {session.user.role === "admin" && (
                <>
                  <DropdownMenuGroup>
                    <Link href="/admin">
                      <DropdownMenuItem>
                        <UserCog className="mr-2 h-4 w-4" />
                        <span>Admin</span>
                      </DropdownMenuItem>
                    </Link>
                    <Link href="/admin/paamelte">
                      <DropdownMenuItem>
                        <UsersIcon className="mr-2 h-4 w-4" />
                        <span>Alle lag</span>
                      </DropdownMenuItem>
                    </Link>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                </>
              )}
              <DropdownMenuGroup>
                <Link href="/min-side">
                  <DropdownMenuItem>
                    <HomeIcon className="mr-2 h-4 w-4" />
                    <span>Min side</span>
                  </DropdownMenuItem>
                </Link>
                <Link href="/min-side/dine-paamelte">
                  <DropdownMenuItem>
                    <UsersIcon className="mr-2 h-4 w-4" />
                    <span>Mine lag</span>
                  </DropdownMenuItem>
                </Link>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <Link href="/dashboard/profile">
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profil</span>
                  </DropdownMenuItem>
                </Link>
              </DropdownMenuGroup>

              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <Link href="/auth/loggut">
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
