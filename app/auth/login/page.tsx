"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useState, useTransition } from "react";
import GooglePicture from "@/assets/google.png";

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
import { LoginValue } from "@/types";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function LogIn() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

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
        if (result.error === "CredentialsSignin") {
          setError("Invalid credentials or user does not exist");
        } else {
          setError("An error occurred. Please try again.");
        }
      } else {
        // Redirect to the dashboard or the intended page
        router.push("/dashboard");
      }
    });
  };

  const handlerSignInProvider = (provider: string) => {
    startTransition(async () => {
      const result = await signIn(provider);

      // if (result === "") {

      // }
    });
  };

  return (
    <>
      <head>
        <title>Login</title>
        <meta name="description" content="Login page" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <main className="flex flex-col items-center justify-center min-h-screen ">
        <Card className="text-white bg-slate-900 w-[400]">
          <CardHeader>
            <CardTitle className="font-bold">Login</CardTitle>
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
                  <Link href="/auth/register">
                    <Button className="w-full" variant="outline">
                      Dont have an account?
                    </Button>
                  </Link>
                  <Button
                    className="w-full"
                    variant="secondary"
                    type="submit"
                    disabled={isPending}
                  >
                    Sign in
                  </Button>
                </div>
              </form>
            </Form>
            <div className="flex flex-col items-center justify-center space-y-3">
              <div className="w-1/3"></div>
              <p>or</p>
              <hr className="w-1/3" />
              <Button
                onClick={() => handlerSignInProvider("google")}
                variant="secondary"
              >
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
