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
import { registerTeam } from "@/actions";
import { CreateTeamsValues } from "@/types/types";
import { createTeamsSchema } from "@/schemas";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/components/ui/use-toast";
import { getSession } from "next-auth/react";

export function RegisterForm() {
  const [isPending, startTransition] = useTransition();
  const [loading, setLoading] = useState(true);
  const routes = useRouter();

  const form = useForm<CreateTeamsValues>({
    resolver: zodResolver(createTeamsSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      teamName: "",
      countParticipants: "",
      youngestParticipant: "",
      oldestParticipant: "",
    },
  });

  useEffect(() => {
    const fetchUser = async () => {
      const session = await getSession();

      form.setValue("name", session?.user?.name ? session.user?.name : "");
      form.setValue("email", session?.user?.email ? session.user?.email : "");
      form.setValue("phone", session?.user?.phone ? session.user?.phone : "");
      form.setValue(
        "userEmail",
        session?.user?.email ? session.user?.email : ""
      );
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setLoading(false);
    };
    fetchUser();
  }, []);

  const onSubmit = (value: CreateTeamsValues) => {
    startTransition(async () => {
      try {
        const data = await registerTeam(value);
        if (data?.error) {
          toast({
            title: "Feil",
            description: data.error,
            variant: "destructive",
          });
        }
        if (data?.success) {
          toast({
            title: "Lag opprettet",
            description: data.success,
            variant: "default",
          });
          routes.push("/min-side/dine-paamelte");
        }
      } catch (error) {
        toast({
          title: "Feil",
          description:
            "En feil oppstod under oppretting av lag, vennligst prøv igjen senere",
          variant: "destructive",
        });
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
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telefon</FormLabel>
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
                <FormLabel>Antall deltagere</FormLabel>
                <FormControl>
                  <Input {...field} type="number" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="youngestParticipant"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Yngste deltager</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>
                  Alderen på den yngste deltageren i laget
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="oldestParticipant"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Eldste deltager</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>
                  Alderen på den eldste deltageren i laget
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
