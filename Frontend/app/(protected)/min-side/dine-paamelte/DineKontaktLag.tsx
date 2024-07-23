import { Skeleton } from "@/components/ui/skeleton";
import DinePaamelte from "./DinePaamelte";
import { useEffect, useState, useTransition } from "react";
import { teamsByUser } from "@/types/types";
import { getTeamsByContactEmail, getUser } from "@/actions";
import { toast } from "@/components/ui/use-toast";

export default function DineKontaktLag() {
  const [noContactTeam, setNoContactTeam] = useState<boolean>(true);
  const [temasByEmail, setTemasByEmail] = useState<teamsByUser[]>();
  const [isPending, startTransition] = useTransition();
  const [deleted, setDeleted] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = () => {
      startTransition(async () => {
        try {
          const session = await getUser();
          if (!!session?.user?.email) {
            const data = await getTeamsByContactEmail(
              session?.user?.email,
              session?.user?.id
            );
            setTemasByEmail(data);

            if (!data?.length) {
              setNoContactTeam(false);
            }
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
    <main className="mt-10">
      {!!noContactTeam && (
        <>
          <h1>Lag hvor du er kontaktperson:</h1>
          {isPending && (
            <div className="grid grid-cols-3">
              <div className="w-screen grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 pt-10 text-2xl pb-10 gap-16">
                <Skeleton className="w-[250px] h-[200px] sm:w-[200px] md:w-[300px] rounded-md" />
                <Skeleton className="w-[250px] h-[200px] sm:w-[200px] md:w-[300px] rounded-md" />
                <Skeleton className="w-[250px] h-[200px] sm:w-[200px] md:w-[300px] rounded-md" />
              </div>
            </div>
          )}

          {!isPending && !deleted && error && (
            <div>
              <h1 className="text-red-700 text-xl">
                En feil oppsto under henting av lag <br /> Vennligst prøv igjen
              </h1>
            </div>
          )}

          {!isPending && !deleted && !error && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
              {temasByEmail?.map((team: teamsByUser) => (
                <DinePaamelte
                  contactPerson={true}
                  {...team}
                  setDeleted={setDeleted}
                  key={team.id}
                />
              ))}
            </div>
          )}
        </>
      )}
    </main>
  );
}
