import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { teamsByUser } from "@/types/types";
import Link from "next/link";

export default async function PaamelteCard({
  teamName,
  countParticipants,
  id,
}: teamsByUser) {
  return (
    <main className=" pt-20 flex items-center justify-center">
      <Card className="w-96">
        <CardHeader className=" flex items-center justify-center">
          <CardTitle>{teamName}</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center">
          <p>{countParticipants}</p>
        </CardContent>
        <CardFooter className=" flex items-center justify-center">
          <Link href={`/min-side/dine-paamelte/edit-team/${id}`}>
            <Button>Endre påmelding</Button>
          </Link>
        </CardFooter>
      </Card>
    </main>
  );
}
