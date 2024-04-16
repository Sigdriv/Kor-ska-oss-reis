import Image from "next/image";
import kor_ska_oss_reis from "@/public/assets/main/kor-ska-oss-reis_2024_1920.png";
import Countdown from "@/components/ui/Countdown";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <head>
        <title>Kor ska oss reis</title>
        <meta name="description" content="Kor ska oss reis" />
      </head>
      <main className="flex min-h-screen flex-col items-center p-24">
        <div>
          <h1 className="text-4xl text-center">Velkommen til</h1>
          <h1 className=" text-4xl font-bold">Kor ska oss reis</h1>
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
            <Countdown />
          </div>
        </div>
        <div className=" mt-5">
          <h1 className="text-2xl">Vil du være med på den neste reisen?</h1>
          <div className="mt-2 flex items-center justify-center">
            <Link href="/join">
              <button className="bg-blue-800 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded">
                Meld deg på
              </button>
            </Link>
            <Link href="/om-oss">
              <button className="bg-blue-800 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded ml-2">
                Les mer
              </button>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
