"use client";
import { useEffect, useState } from "react";
import { Teams } from "@/types/types";
import { getTeamById } from "@/actions";
import { UpdatePaamelte } from "./UpdatePaamelte";
import { Skeleton } from "@/components/ui/skeleton";

export default function TeamEditPage() {
  const [team, setTeam] = useState<Teams>();

  const currentUrl = window.location.href;
  const url = new URL(currentUrl);
  const pathSegments = url.pathname.split("/"); // Split the path by '/'
  const id = pathSegments[pathSegments.length - 1]; // Get the last segment

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const teamData = await getTeamById(id); // Fetch team data from API using id
        if (!!teamData)
          teamData.countParticipants = teamData.countParticipants.toString();

        setTeam(teamData);
      } catch (error) {
        console.error("Error fetching team data:", error);
      }
    };

    if (id) {
      fetchTeam();
    }
  }, [id]);

  return !team ? (
    <div className=" flex flex-col justify-center items-center pt-52 text-2xl pb-24 gap-16">
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
      <UpdatePaamelte {...team} key={team.id} />
    </main>
  );
}
