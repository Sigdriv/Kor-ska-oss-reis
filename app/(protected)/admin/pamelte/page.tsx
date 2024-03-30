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
              <TableHead className="w-[200px]">Kontakt person</TableHead>
              <TableHead>Epost</TableHead>
              <TableHead>Lagnavn</TableHead>
              <TableHead className="text-right">Antall deltagere</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {teams.map((data: Teams) => (
              <TableRow key={data.id}>
                <TableCell className="font-medium">{data.name}</TableCell>
                <TableCell>
                  <Link href={`mailto:${data.email}`}>{data.email}</Link>
                </TableCell>
                <TableCell>{data.teamName}</TableCell>
                <TableCell className="text-right">
                  {data.countParticipants}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total</TableCell>
              <TableCell className="text-right">{totalParticipants}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </main>
  );
}
