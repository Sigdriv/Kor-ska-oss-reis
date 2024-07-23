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
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";

export default function SignUp() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      repeatPassword: "",
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
        <title>Kor ska oss reis | Registrer</title>
        <meta name="Register" content="Kor ska oss reis | Registrer" />
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
                        <FormLabel>
                          Navn<sup className=" text-red-600">*</sup>
                        </FormLabel>
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
                        <FormLabel>
                          E-post<sup className=" text-red-600">*</sup>
                        </FormLabel>
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
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Telefon<sup className=" text-red-600">*</sup>
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={isPending}
                            id="phone"
                            type="phone"
                            placeholder="Telefon"
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
                        <FormLabel>
                          Passord<sup className=" text-red-600">*</sup>
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={isPending}
                            type="password"
                            id="Password"
                            placeholder="passord"
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
                    name="repeatPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Gjenta passord<sup className=" text-red-600">*</sup>
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={isPending}
                            type="password"
                            id="RepeatPassword"
                            placeholder="Gjenta passord"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

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

            {/* TODO: Fix google signin */}
            {/* <div className="flex flex-col items-center justify-center space-y-3">
              <div className="w-1/3"></div>
              <p>eller</p>
              <hr className="w-1/3" />
              <div className=" hover:cursor-not-allowed">
                <Button
                  onClick={() => signIn("google")}
                  variant="secondary"
                  disabled
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
            </div> */}
          </CardContent>
        </Card>
      </main>
    </>
  );
}
