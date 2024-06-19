"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { EditUser } from "./EditUser";
import { updateUserType } from "@/types/types";
import { toast } from "@/components/ui/use-toast";
import { getUserById } from "@/actions";
import { Skeleton } from "@/components/ui/skeleton";

export default function page() {
  const [user, setUser] = useState<updateUserType>();
  const [userId, setUserId] = useState<string>();
  const route = useRouter();
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const currentUrl = window.location.href;
    const url = new URL(currentUrl);
    const pathSegments = url.pathname.split("/"); // Split the path by '/'
    setUserId(pathSegments[pathSegments.length - 1]); // Get the last segment
  }, []);

  useEffect(() => {
    const fetchUser = () => {
      startTransition(async () => {
        try {
          if (userId) {
            const user = await getUserById(userId);
            if (user) setUser(user);
          } else {
            throw new Error("No user id");
          }
        } catch (error) {
          route.push("/dev/alle-brukere");
          toast({
            title: "Feil",
            description:
              "En feil oppsto under henting av bruker, venligst prøv igjen",
            variant: "destructive",
          });
        }
      });
    };
    if (userId) {
      fetchUser();
    }
  }, [userId]);

  return (
    <main className=" text-2xl pt-10">
      <h1 className=" text-center">
        Rediger brukeren til <br />{" "}
        {isPending ? (
          <div className="flex flex-col justify-center items-center pt-1">
            <Skeleton className="w-[230px] h-[40px] rounded-md" />
          </div>
        ) : (
          user?.name
        )}
      </h1>
      {isPending ? (
        <div className=" flex flex-col justify-center items-center pt-52 text-2xl pb-24 gap-16">
          <Skeleton className="w-[400px] h-[40px] rounded-md" />
          <Skeleton className="w-[400px] h-[40px] rounded-md" />
          <Skeleton className="w-[400px] h-[40px] rounded-md" />
          <Skeleton className="w-[400px] h-[40px] rounded-md" />
        </div>
      ) : (
        <div className=" pt-24">{user && <EditUser {...user} />}</div>
      )}
    </main>
  );
}
