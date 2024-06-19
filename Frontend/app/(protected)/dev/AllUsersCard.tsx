"use client";
import { getAllUsers, getTeamsCount } from "@/actions";
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

export default function AllUsersCard() {
  const [totalUsers, setTotaltUsers] = useState(0);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    startTransition(async () => {
      try {
        const users = await getAllUsers();
        setTotaltUsers(users.length);
      } catch (error) {
        setError(true);
        toast({
          title: "Feil",
          description: "En feil oppstod ved henting av antall brukere",
          variant: "destructive",
        });
      }
    });
  }, [totalUsers]);

  return (
    <main className=" pt-20 ">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div>
          <Card className="w-96">
            <CardHeader className=" flex items-center justify-center">
              <CardTitle>Antall brukere</CardTitle>
              <CardDescription>Antall registrerte brukere</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-center">
              {!error ? (
                <p>{totalUsers}</p>
              ) : (
                <p className=" text-sm">En feil oppsto</p>
              )}
            </CardContent>
            <CardFooter className=" flex items-center justify-center">
              <Link href="/dev/alle-brukere">
                <Button>Alle brukere</Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </main>
  );
}
