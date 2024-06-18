import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import DinePaamelte from "./DinePaamelte";
import { useEffect, useState, useTransition } from "react";
import { teamsByUser } from "@/types/types";
import { toast } from "@/components/ui/use-toast";
import { getTeamsByUserId } from "@/actions/getTeamsByUserId";
import { getUser } from "@/actions";

export default function DineEgnePaamelte() {
  const [temasByUser, setTemasByUser] = useState<teamsByUser[]>();
  const [isPending, startTransition] = useTransition();
  const [deleted, setDeleted] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      startTransition(async () => {
        try {
          const session = await getUser();
          if (!!session?.user?.email) {
            const data = await getTeamsByUserId(session?.user?.id);
            setTemasByUser(data);
          }
        } catch (error) {
          setError(true);
          toast({
            title: "Feil",
            description:
              "En feil oppstod under henting av lag,\nvenligst prøv igjen senere",
            variant: "destructive",
          });
        }
      });
    };
    fetchData();
  }, []);

  return (
    <>
      <h1>Dine lag:</h1>
      {!!isPending || deleted ? (
        <div className=" grid grid-cols-3">
          <div className="w-screen grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 pt-10 text-2xl pb-10 gap-16">
            <Skeleton className="w-[250px] h-[200px] sm:w-[200px] md:w-[300px] rounded-md" />
            <Skeleton className="w-[250px] h-[200px] sm:w-[200px] md:w-[300px] rounded-md" />
            <Skeleton className="w-[250px] h-[200px] sm:w-[200px] md:w-[300px] rounded-md" />
          </div>
        </div>
      ) : !temasByUser?.length ? (
        !error ? (
          <div className=" text-xl flex flex-col items-center justify-center gap-3 h-fit w-fit mt-3">
            <div>
              <h1>Du har ingen påmeldte lag</h1>
            </div>
            <div>
              <Link href="/bli-med">
                <Button>Meld på et lag her</Button>
              </Link>
            </div>
          </div>
        ) : (
          <div>
            <h1 className=" text-red-700 text-xl">
              En feil oppsto under henting av lag <br /> Vennligst prøv igjen
            </h1>
          </div>
        )
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {temasByUser.map((team: teamsByUser) => (
            <DinePaamelte
              contactPerson={false}
              {...team}
              setDeleted={setDeleted}
              key={team.id}
            />
          ))}
        </div>
      )}
    </>
  );
}
