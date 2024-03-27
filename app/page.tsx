import Image from "next/image";
import kor_ska_oss_reis from "@/public/assets/main/kor-ska-oss-reis_2024_1920.png";
import Countdown from "@/components/ui/Countdown";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div>
        <h1 className="text-4xl text-center">Velkommen til</h1>
        <h1 className=" text-4xl font-bold">Kor ska vi reis</h1>
      </div>
      <div className="mt-10">
        <Image
          src={kor_ska_oss_reis}
          alt="logo"
          width={1920 / 4}
          className=" rounded-lg"
        />
      </div>
      <div className=" mt-5">
        <h1 className="text-2xl">Tid igjen til neste reise:</h1>
        <div className="mt-2">
          {/* <h1 className="text-2xl">{Countdown}</h1> */}
          <Countdown />
        </div>
      </div>
    </main>
  );
}
