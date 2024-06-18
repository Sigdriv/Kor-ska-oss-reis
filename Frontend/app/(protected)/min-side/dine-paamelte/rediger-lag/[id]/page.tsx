"use client";
import { useEffect, useState } from "react";
import { Teams } from "@/types/types";
import { getTeamById, getUser } from "@/actions";
import { UpdatePaamelte } from "./UpdatePaamelte";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/components/ui/use-toast";
import { auth } from "@/auth";

export default function TeamEditPage() {
  const [team, setTeam] = useState<Teams>();
  const [teamId, setTeamId] = useState<string>();
  const [contactPerson, setContactPerson] = useState<boolean>(false);

  useEffect(() => {
    const currentUrl = window.location.href;
    const url = new URL(currentUrl);
    const pathSegments = url.pathname.split("/"); // Split the path by '/'
    setTeamId(pathSegments[pathSegments.length - 1]); // Get the last segment
  }, []);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        if (teamId) {
          const team = await getTeamById(teamId);
          const session = await getUser();

          if (team.createdById === session?.user.id) {
            setTeam(await getTeamById(teamId));
          } else if (team.email === session?.user.email) {
            setTeam(await getTeamById(teamId));
            setContactPerson(true);
          } else {
            toast({
              title: "Feil",
              description: "Du har ikke tilgang til dette laget",
              variant: "destructive",
            });
          }
        }
      } catch (error) {
        toast({
          title: "Feil",
          description:
            "En feil oppsto under henting av lag, venligst prøv igjen",
          variant: "destructive",
        });
      }
    };

    if (teamId) {
      fetchTeam();
    }
  }, [teamId]);

  return !team ? (
    <div className=" flex flex-col justify-center items-center pt-52 text-2xl pb-24 gap-16">
      <Skeleton className="w-[400px] h-[40px] rounded-md" />
      <Skeleton className="w-[400px] h-[40px] rounded-md" />
      <Skeleton className="w-[400px] h-[40px] rounded-md" />
      <Skeleton className="w-[400px] h-[40px] rounded-md" />
      <Skeleton className="w-[400px] h-[40px] rounded-md" />
      <Skeleton className="w-[400px] h-[40px] rounded-md" />
    </div>
  ) : (
    <main>
      <div className=" flex justify-center pt-10 text-2xl pb-24">
        <h1>Oppdater laget: {team.teamName}</h1>
      </div>
      <UpdatePaamelte contactPerson={contactPerson} {...team} key={team.id} />
    </main>
  );
}
