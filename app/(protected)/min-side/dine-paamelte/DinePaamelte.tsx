"use client";
import { deleteTeam } from "@/actions";
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

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";

export interface props {
  setDeleted: (value: boolean) => void;
}

export default function DinePaamelte({
  teamName,
  countParticipants,
  id,
  setDeleted,
}: teamsByUser & props) {
  const handleDeleteTeam = async () => {
    const response = await deleteTeam(id);

    if (response.status === 200) {
      setDeleted(true);
      toast({
        title: "Lag slettet",
        description: response.message,
        variant: "default",
      });
      await new Promise((resolve) => setTimeout(resolve, 5000));
      location.reload();
    }
    if (response.status === 500) {
      setDeleted(true);
      toast({
        title: "Feil",
        description: response.message,
        variant: "destructive",
      });
      await new Promise((resolve) => setTimeout(resolve, 5000));
      location.reload();
    }
  };

  return (
    <main className=" pt-20 flex items-center justify-center">
      <Card className="w-96">
        <CardHeader className=" flex items-center justify-center">
          <CardTitle>{teamName}</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center">
          <p>{countParticipants}</p>
        </CardContent>
        <CardFooter className=" flex items-center justify-center gap-3">
          <Link href={`/min-side/dine-paamelte/edit-team/${id}`}>
            <Button>Endre påmelding</Button>
          </Link>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant={"destructive"}>Slett</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Er du sikker?</DialogTitle>
                <DialogDescription>
                  Denne handlingen kan ikke angres og vil slette alt innholdet i
                  laget.
                </DialogDescription>
              </DialogHeader>
              <div className="flex justify-center gap-10 py-4">
                <DialogClose asChild>
                  <Button
                    variant="destructive"
                    onClick={() => handleDeleteTeam()}
                  >
                    Ja, slett
                  </Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button variant="secondary">Avbryt</Button>
                </DialogClose>
              </div>
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>
    </main>
  );
}
