"use client";
import React, { useEffect, useState, useTransition } from "react";
import DinePaamelte from "./DinePaamelte";
import { getTeamsByUser, getUser } from "@/actions";
import { teamsByUser } from "@/types/types";
import { Skeleton } from "@/components/ui/skeleton";

export default function MinSide() {
  const [temasByUser, setTemasByUser] = useState<teamsByUser[]>();
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const fetchData = async () => {
      startTransition(async () => {
        try {
          const session = await getUser();
          if (!!session?.user?.email) {
            const data = await getTeamsByUser(session?.user?.email);
            setTemasByUser(data);
          }
        } catch (error) {
          console.error("Error fetching team data:", error);
        }
      });
    };
    fetchData();
  }, []);

  return (
    <main className="w-screen p-20 text-2xl">
      <h1>Dine lag:</h1>
      <div className=" grid grid-cols-3">
        {!!isPending ? (
          <div className="w-screen grid grid-cols-3 pt-20 text-2xl pb-24 ">
            <Skeleton className="w-[300px] h-[200px] rounded-md" />
            <Skeleton className="w-[300px] h-[200px] rounded-md" />
            <Skeleton className="w-[300px] h-[200px] rounded-md" />
          </div>
        ) : !temasByUser?.length ? (
          <div className=" text-xl">
            <h1>Du har ingen påmeldte lag</h1>
          </div>
        ) : (
          temasByUser.map((team: teamsByUser) => (
            <DinePaamelte {...team} key={team.id} />
          ))
        )}
      </div>
    </main>
  );
}
