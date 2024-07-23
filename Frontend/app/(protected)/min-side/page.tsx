"use client";

import { getTeamsCount } from "@/actions";
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

export default function page() {
  const [usersTeams, setUsersTeams] = useState<number>(0);
  const [firstRender, setFirstRender] = useState<boolean>(true);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (firstRender) {
      startTransition(async () => {
        try {
          const response = await getTeamsCount();
          setUsersTeams(response);
        } catch (error) {
          toast({
            title: "Feil",
            description:
              "En feil oppstod under henting av lag, vennligst prøv igjen senere",
            variant: "destructive",
          });
        }
      });
      setFirstRender(false);
    }
  });

  return (
    <>
      <head>
        <title>Kor ska oss reis | Min side</title>
        <meta name="description" content="Kor ska oss reis | Min side" />
      </head>

      <main>
        <div className=" pt-10 text-2xl">
          <h1 className=" text-center text-2xl">
            <strong>Min side</strong>
          </h1>
          <div className="flex flex-row gap-2 ml-24 pt-20">
            <Card className="w-96">
              <CardHeader className=" flex items-center justify-center">
                <CardTitle>Dine lag</CardTitle>
              </CardHeader>
              <CardDescription className="flex items-center justify-center">
                Totalt påmeldte lag
              </CardDescription>
              <CardContent className="flex items-center justify-center">
                <p>{usersTeams}</p>
              </CardContent>
              <CardFooter className=" flex items-center justify-center gap-3">
                <Link href={`/min-side/dine-paamelte`}>
                  <Button>Se dine lag</Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </>
  );
}
