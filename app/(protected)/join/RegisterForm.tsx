"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState, useTransition } from "react";
import { getUser, registerTeam } from "@/actions";
import { CreateTeamsValues } from "@/types/types";
import { createTeamsSchema } from "@/schemas";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/components/ui/use-toast";

export function RegisterForm() {
  const [isPending, startTransition] = useTransition();
  const [loading, setLoading] = useState(true);
  const routes = useRouter();

  const form = useForm<CreateTeamsValues>({
    resolver: zodResolver(createTeamsSchema),
    defaultValues: {
      name: "",
      email: "",
      teamName: "",
      countParticipants: "",
      userEmail: "",
    },
  });

  useEffect(() => {
    const fetchUser = async () => {
      const getSession = await getUser();

      form.setValue(
        "name",
        getSession?.user?.name ? getSession.user?.name : ""
      );
      form.setValue(
        "email",
        getSession?.user?.email ? getSession.user?.email : ""
      );
      form.setValue(
        "userEmail",
        getSession?.user?.email ? getSession.user?.email : ""
      );
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setLoading(false);
    };
    fetchUser();
  }, []);

  const onSubmit = (value: CreateTeamsValues) => {
    startTransition(async () => {
      const data = await registerTeam(value);
      if (data?.error) {
        toast({
          title: "Error",
          description: data.error,
          variant: "destructive",
        });
      }
      if (data?.success) {
        toast({
          title: "Success",
          description: data.success,
          variant: "default",
        });
        routes.push("/min-side/dine-paamelte");
      }
    });
  };

  return loading ? (
    <div className=" flex flex-col justify-center items-center pt-10 text-2xl pb-24 gap-16">
      <Skeleton className="w-[400px] h-[40px] rounded-md" />
      <Skeleton className="w-[400px] h-[40px] rounded-md" />
      <Skeleton className="w-[400px] h-[40px] rounded-md" />
      <Skeleton className="w-[400px] h-[40px] rounded-md" />
      <Skeleton className="w-[400px] h-[40px] rounded-md" />
    </div>
  ) : (
    <Form {...form}>
      <div className=" flex items-center justify-center">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-96">
          <FormField
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Navn</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Epost</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="teamName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Lagnavn</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="countParticipants"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Antall deltakere</FormLabel>
                <FormControl>
                  <Input {...field} type="number" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="userEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Opprettes av</FormLabel>
                <FormControl>
                  <Input {...field} disabled />
                </FormControl>
                <FormDescription>
                  Eposten som er registrert på din bruker
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-center text-3xl">
            <Button type="submit" disabled={isPending}>
              Meld på laget
            </Button>
          </div>
        </form>
      </div>
    </Form>
  );
}
