"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useTransition } from "react";

import { resetPasswordSchema } from "@/schemas";
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
import { toast } from "@/components/ui/use-toast";
import type { ResetPassword } from "@/types/types";
import { resetPassword } from "@/actions";
import { Skeleton } from "@/components/ui/skeleton";
import { useParams } from "next/navigation";

export default function ResetPassword() {
  const [isPending, startTransition] = useTransition();
  const { token } = useParams() as { token: string };

  const form = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      token: token,
      password: "",
      repeatPassword: "",
    },
  });

  const onSubmit = (values: ResetPassword) => {
    startTransition(async () => {
      const result = await resetPassword(values);
      if (result && result.error) {
        toast({
          title: result.error,
          description: result.description,
          duration: 5000,
          variant: "destructive",
        });
      } else {
        toast({
          title: result.success,
          description: result.description,
          duration: 5000,
          variant: "default",
        });
      }
    });
  };

  return (
    <>
      <head>
        <title>Kor ska oss reis | Tilbakestill passord</title>
        <meta
          name="description"
          content="Kor ska oss reis | Tilbakestill passsord"
        />
      </head>
      <main className="flex flex-col items-center justify-center min-h-screen ">
        <Card className=" bg-slate-200 w-[400]">
          <CardHeader>
            <CardTitle className="font-bold">Tilbakestill passord</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              {token ? (
                // TODO: Update to use MUI components instead
                <form
                  className="space-y-6"
                  onSubmit={form.handleSubmit(onSubmit)}
                >
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
                              id="email"
                              type="password"
                              placeholder="Passord"
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
                          <FormLabel>Gjenta passord</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              disabled={isPending}
                              type="password"
                              id="repeatPassword"
                              placeholder="Gjenta passord"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <Button
                    className="w-full"
                    variant="secondary"
                    type="submit"
                    disabled={isPending}
                  >
                    Reset passord
                  </Button>
                </form>
              ) : (
                <div className=" flex flex-col justify-center items-center text-2xl pt-8 pb-10 gap-16">
                  <Skeleton className="w-[200px] h-[40px] rounded-md" />
                  <Skeleton className="w-[200px] h-[40px] rounded-md" />
                </div>
              )}
            </Form>
          </CardContent>
        </Card>
      </main>
    </>
  );
}
