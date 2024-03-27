"use client";
import { RegisterValue } from "@/types";
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
      setError(data.error ?? null);
      setSuccess(data.success ?? null);

      if (data.success) {
        await new Promise((resolve) => setTimeout(resolve, 5000));
        router.push("/auth/login");
      }
    });
  };

  return (
    <>
      <head>
        <title>Register</title>
        <meta name="Register" content="Register page" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br text-white from-slate-900 to-slate-800">
        <Card className="text-white bg-slate-900 w-[400]">
          <CardHeader>
            <CardTitle className="font-bold">Register</CardTitle>
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
                        <FormLabel>Name</FormLabel>
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
                        <FormLabel>Email</FormLabel>
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
                        <FormLabel>Password</FormLabel>
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
                {error && (
                  <p className="text-red-500 rounded-lg p-2">{error}</p>
                )}
                {success && (
                  <p className="p-2 text-green-500 rounded-lg">{success}</p>
                )}

                <div className="flex gap-3">
                  <Link href="/auth/login">
                    <Button className="w-full" variant="outline">
                      Already have an account?
                    </Button>
                  </Link>
                  <Button
                    className="w-full"
                    variant="secondary"
                    type="submit"
                    disabled={isPending}
                  >
                    Register
                  </Button>
                </div>
              </form>
            </Form>
            <div className="flex flex-col items-center justify-center space-y-3">
              <div className="w-1/3"></div>
              <p>or</p>
              <hr className="w-1/3" />
              <Button onClick={() => signIn("google")} variant="secondary">
                <Image
                  className="h-8 w-8 mr-2"
                  src={GooglePicture}
                  alt="Google"
                />
                Sign in with Google
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </>
  );
}
