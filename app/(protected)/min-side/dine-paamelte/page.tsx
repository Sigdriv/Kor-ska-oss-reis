"use client";
import React, { useEffect, useState, useTransition } from "react";
import DinePaamelte from "./DinePaamelte";
import { getTeamsByUser, getUser } from "@/actions";
import { teamsByUser } from "@/types/types";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/components/ui/use-toast";

export default function Dine_Pamelte() {
  const [temasByUser, setTemasByUser] = useState<teamsByUser[]>();
  const [isPending, startTransition] = useTransition();
  const [deleted, setDeleted] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

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
          setError(true);
          toast({
            title: "Feil",
            description:
              "En feil oppstod under henting av lag,\nvenligst prøv igjen senere",
            variant: "destructive",
          });
        }
      });
    };
    fetchData();
  }, []);

  return (
    <main className="w-screen p-20 text-2xl">
      <h1>Dine lag:</h1>
      {!!isPending || deleted ? (
        <div className=" grid grid-cols-3">
          <div className="w-screen grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 pt-20 text-2xl pb-24 gap-16">
            <Skeleton className="w-[250px] h-[200px] sm:w-[200px] md:w-[300px] rounded-md" />
            <Skeleton className="w-[250px] h-[200px] sm:w-[200px] md:w-[300px] rounded-md" />
            <Skeleton className="w-[250px] h-[200px] sm:w-[200px] md:w-[300px] rounded-md" />
          </div>
        </div>
      ) : !temasByUser?.length ? (
        !error ? (
          <div className=" text-xl">
            <h1>Du har ingen påmeldte lag</h1>
          </div>
        ) : (
          <div>
            <h1 className=" text-red-700 text-xl">
              En feil oppsto under henting av lag <br /> Vennligst prøv igjen
            </h1>
          </div>
        )
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {temasByUser.map((team: teamsByUser) => (
            <DinePaamelte {...team} setDeleted={setDeleted} key={team.id} />
          ))}
        </div>
      )}
    </main>
  );
}
