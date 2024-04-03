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
import Link from "next/link";

export default async function PaamelteCard() {
  const totalParticipantsTeams = await getTeamsCount();

  return (
    <main className=" pt-20 flex items-center justify-center">
      <Card className="w-96">
        <CardHeader className=" flex items-center justify-center">
          <CardTitle>Påmelte lag</CardTitle>
          <CardDescription>Antall påmelte lag</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center">
          <p>{totalParticipantsTeams}</p>
        </CardContent>
        <CardFooter className=" flex items-center justify-center">
          <Link href="/admin/paamelte">
            <Button>Se alle påmelte lag</Button>
          </Link>
        </CardFooter>
      </Card>
    </main>
  );
}
