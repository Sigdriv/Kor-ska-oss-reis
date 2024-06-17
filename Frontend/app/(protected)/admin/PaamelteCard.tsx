"use client";
import { getTeamsCount } from "@/actions";
import generateExcelFile from "@/actions/generateExcelFile";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import Link from "next/link";
import { useEffect, useState, useTransition } from "react";

export default function PaamelteCard() {
  const [totalParticipantsTeams, setTotalParticipantsTeams] = useState(0);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    startTransition(async () => {
      try {
        const countTeam = await getTeamsCount();
        setTotalParticipantsTeams(countTeam);
      } catch (error) {
        setError(true);
        toast({
          title: "Feil",
          description:
            "En feil oppstod ved henting av antall lag, vennligst prøv igjen senere",
          variant: "destructive",
        });
      }
    });
  }, [totalParticipantsTeams]);

  const handleDownload = async () => {
    try {
      const blob = await generateExcelFile();

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "teams.xlsx");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error("Error generating the Excel file:", err);
    }
  };

  return (
    <main className=" pt-20 ">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div>
          <Card className="w-96">
            <CardHeader className=" flex items-center justify-center">
              <CardTitle>Påmelte lag</CardTitle>
              <CardDescription>Antall påmelte lag</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-center">
              {!error ? (
                <p>{totalParticipantsTeams}</p>
              ) : (
                <p className=" text-sm">En feil oppsto</p>
              )}
            </CardContent>
            <CardFooter className=" flex items-center justify-center">
              <Link href="/admin/paamelte">
                <Button>Se alle påmelte lag</Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
        <div>
          <Card className="w-96">
            <CardHeader className=" flex items-center justify-center">
              <CardTitle>Last ned Excel ark</CardTitle>
              <CardDescription>Antall påmelte lag</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-center">
              {!error ? (
                <p>{totalParticipantsTeams}</p>
              ) : (
                <p className=" text-sm">En feil oppsto</p>
              )}
            </CardContent>
            <CardFooter className=" flex items-center justify-center">
              <Button onClick={() => handleDownload()}>
                Last ned Excel ark
              </Button>
            </CardFooter>
          </Card>
        </div>
        <div>
          <Card className="w-96">
            <CardHeader className=" flex items-center justify-center">
              <CardTitle>Påmelte lag</CardTitle>
              <CardDescription>Antall påmelte lag</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-center">
              {!error ? (
                <p>{totalParticipantsTeams}</p>
              ) : (
                <p className=" text-sm">En feil oppsto</p>
              )}
            </CardContent>
            <CardFooter className=" flex items-center justify-center">
              <Link href="/admin/paamelte">
                <Button>Se alle påmelte lag</Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </main>
  );
}
