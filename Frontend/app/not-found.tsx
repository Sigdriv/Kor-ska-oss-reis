import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <head>
        <title>Kor ska oss reis | 404 – Page not found</title>
        <meta
          name="description"
          content="Kor ska oss reis | 404 – Page not found"
        />
      </head>
      <main className=" pt-24 justify-center text-center">
        <div>
          <h1 className="text-3xl pb-20">404 – Page not found</h1>
          <h2 className="text-3xl">
            Det var et problem med å finne siden du leter etter
          </h2>
        </div>
        <div>
          <p className="text-xl pt-2">
            Gå tilbake til{" "}
            <Link href="/min-side" className="text-blue-600 hover:underline">
              Min Side
            </Link>
          </p>
        </div>
      </main>
    </>
  );
}
