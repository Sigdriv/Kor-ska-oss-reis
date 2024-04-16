"use client";
import { RegisterValue } from "@/types/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RegisterSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { register } from "@/actions";
import Link from "next/link";
import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { signIn } from "@/auth";
import Image from "next/image";
import GooglePicture from "@/assets/google.png";
import { toast } from "@/components/ui/use-toast";

export default function SignUp() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: RegisterValue) => {
    startTransition(async () => {
      const data = await register(values);

      if (data.success) {
        toast({
          title: "Bruker opprettet",
          description: data.success,
          duration: 5000,
        });
        router.push("/auth/logginn");
      }
      if (data.error) {
        toast({
          title: "Feil",
          description: data.error,
          duration: 5000,
          variant: "destructive",
        });
      }
    });
  };

  return (
    <>
      <head>
        <title>Registrer</title>
        <meta name="Register" content="Register page" />
      </head>
      <main className="flex flex-col items-center justify-center min-h-screen ">
        <Card className=" bg-slate-200 w-[400]">
          <CardHeader>
            <CardTitle className="font-bold">Registrer</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Form {...form}>
              <form
                className="space-y-6"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <div className="flex flex-col space-y-1.5">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Navn</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={isPending}
                            id="name"
                            type="text"
                            placeholder="Ola Nordmann"
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
                </div>
                {success && (
                  <p className="p-2 text-green-500 rounded-lg">{success}</p>
                )}

                <div className="flex gap-3">
                  <Link href="/auth/logginn">
                    <Button className="w-full" variant="outline">
                      Har du allerede en konto?
                    </Button>
                  </Link>
                  <Button
                    className="w-full"
                    variant="secondary"
                    type="submit"
                    disabled={isPending}
                  >
                    Registrer
                  </Button>
                </div>
              </form>
            </Form>
            <div className="flex flex-col items-center justify-center space-y-3">
              <div className="w-1/3"></div>
              <p>eller</p>
              <hr className="w-1/3" />
              <Button onClick={() => signIn("google")} variant="secondary">
                <Image
                  className="h-8 w-8 mr-2"
                  src={GooglePicture}
                  alt="Google"
                />
                Logg inn med Google
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </>
  );
}
