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
    (total: number, team: Teams) => total + parseInt(team.countParticipants),
    0
  );

  const uniqueEmails = [
    ...new Set(teams.map((team: Teams) => team.email)),
  ].join(";");

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
              <TableHead className="w-[250px]">Lagnavn</TableHead>
              <TableHead>Alder</TableHead>
              <TableHead>Antall deltagere</TableHead>
              <TableHead>Kontakt person</TableHead>
              <TableHead>Kontakt epost</TableHead>
              <TableHead className="text-right">Opprettet av</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {teams.map((data: Teams) => (
              <TableRow key={data.id}>
                <TableCell className="font-medium">{data.teamName}</TableCell>
                <TableCell>
                  {data.youngestParticipant} – {data.oldestParticipant}
                </TableCell>
                <TableCell>{data.countParticipants}</TableCell>
                <TableCell className="">{data.name}</TableCell>
                <TableCell>
                  <Link href={`mailto:${data.email}`}>{data.email}</Link>
                </TableCell>
                <TableCell className="text-right">
                  {data.createdBy.name}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={1}>Total</TableCell>
              <TableCell className="">{}</TableCell>
              <TableCell className="">{totalParticipants}</TableCell>
              <TableCell className="">{}</TableCell>
              <TableCell>
                <Link
                  href={`mailto:${uniqueEmails}?subject=Info angående "Kor ska oss reis"`}
                >
                  Send epost til alle
                </Link>
              </TableCell>
              {/* <TableCell className="">{}</TableCell> */}
              <TableCell className="">{}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </main>
  );
}
