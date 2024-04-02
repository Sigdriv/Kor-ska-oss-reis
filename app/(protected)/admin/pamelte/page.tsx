import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getTeams } from "@/actions";
import { Teams } from "@/types/types";
import Link from "next/link";

export default async function Pamelte() {
  const teams = await getTeams();

  console.log(teams);

  const totalParticipants = teams.reduce(
    (total: number, team: Teams) => total + team.countParticipants,
    0
  );

  return (
    <main className="w-screen">
      <div className=" flex justify-center items-center text-2xl pt-20">
        <h1>Årets påmelte lag</h1>
      </div>
      <div className="p-24">
        <Table>
          <TableCaption>Liste over årets påmelte lag</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Lagnavn</TableHead>
              <TableHead>Kontakt person</TableHead>
              <TableHead>Kontakt epost</TableHead>
              <TableHead>Opprettet av</TableHead>
              <TableHead className="text-right">Antall deltagere</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {teams.map((data: Teams) => (
              <TableRow key={data.id}>
                <TableCell className="font-medium">{data.teamName}</TableCell>
                <TableCell>{data.name}</TableCell>
                <TableCell className="">
                  <Link href={`mailto:${data.email}`}>{data.email}</Link>
                </TableCell>
                <TableCell>{data.createdBy.name}</TableCell>
                <TableCell className="text-right">
                  {data.countParticipants}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={4}>Total</TableCell>
              <TableCell className="text-right">{totalParticipants}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </main>
  );
}
