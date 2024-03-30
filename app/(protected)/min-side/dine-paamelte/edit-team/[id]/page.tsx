"use client";
import { useEffect, useState } from "react";
import { Teams } from "@/types/types";
import { getTeamById } from "@/actions";

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
        setTeam(teamData);
      } catch (error) {
        console.error("Error fetching team data:", error);
      }
    };

    if (id) {
      fetchTeam();
    }
  }, [id]);

  if (!team) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Edit Team</h1>
      <p>Team Name: {team.teamName}</p>
    </div>
  );
}
