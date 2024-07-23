"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { forgotPasswordSchema } from "@/schemas";
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
import { ForgotPasswordValue } from "@/types/types";
import { toast } from "@/components/ui/use-toast";
import { useTransition } from "react";
import { forgotPassword } from "@/actions";

export default function ForgottenPassword() {
  const [isPending, startTransition] = useTransition();

  const form = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: ForgotPasswordValue) => {
    startTransition(async () => {
      const result = await forgotPassword(values);
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
        <title>Kor ska oss reis | Reset passord</title>
        <meta name="description" content="Kor ska oss reis | Reset passord" />
      </head>

      <main className="flex flex-col items-center justify-center min-h-screen ">
        <Card className=" bg-slate-200 w-[400]">
          <CardHeader>
            <CardTitle className="font-bold">Reset passord</CardTitle>
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
                <Button
                  className="w-full"
                  variant="secondary"
                  type="submit"
                  disabled={isPending}
                >
                  Reset passord
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </main>
    </>
  );
}
