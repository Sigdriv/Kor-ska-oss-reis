"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useTransition } from "react";
import GooglePicture from "@/public/assets/google/google.png";

import { LoginSchema } from "@/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormLabel,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { LoginValue } from "@/types/types";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { toast } from "@/components/ui/use-toast";

export default function LogIn() {
  const [isPending, startTransition] = useTransition();

  const form = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: LoginValue) => {
    startTransition(async () => {
      const result = await signIn("credentials", {
        ...values,
        redirect: false,
      });
      if (result && result.error) {
        if (result.error === "Configuration") {
          toast({
            title: "Feil",
            description: "Ugyldig epost eller passord",
            duration: 5000,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Feil",
            description: "En feil oppstod. Vennligst prøv igjen",
            duration: 5000,
            variant: "destructive",
          });
        }
      } else {
        window.location.href = "/auth/logginn";
      }
    });
  };

  return (
    <>
      <head>
        <title>Kor ska oss reis | Logg inn</title>
        <meta name="description" content="Kor ska oss reis | Logg inn" />
      </head>

      <main className="flex flex-col items-center justify-center min-h-screen ">
        <Card className=" bg-slate-200 w-[400]">
          <CardHeader>
            <CardTitle className="font-bold">Logg inn</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                className="space-y-6"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <div className="flex flex-col space-y-1.5">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>E-post</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={isPending}
                            id="email"
                            type="email"
                            placeholder="Email"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Passord</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={isPending}
                            type="password"
                            id="Password"
                            placeholder="Password"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Link href="/auth/glemt-passord">
                    <h1 className="text-right text-sm ">Glemt passord?</h1>
                  </Link>
                </div>
                <div className="flex gap-3">
                  <Link href="/auth/register">
                    <Button className="w-full" variant="outline">
                      Har du ikke konto?
                    </Button>
                  </Link>
                  <Button
                    className="w-full"
                    variant="secondary"
                    type="submit"
                    disabled={isPending}
                  >
                    Logg inn
                  </Button>
                </div>
              </form>
            </Form>
            <div className="flex flex-col items-center justify-center space-y-3">
              <div className="w-1/3"></div>
              <p>eller</p>
              <hr className="w-1/3" />
              <div className=" hover:cursor-not-allowed">
                <Button
                  onClick={() => signIn("google")}
                  variant="secondary"
                  // disabled
                >
                  <Image
                    className="h-8 w-8 mr-2"
                    src={GooglePicture}
                    alt="Google"
                  />
                  Login inn med Google
                </Button>
                <p className="text-xs text-left mt-2">Ikke implementert enda</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </>
  );
}
