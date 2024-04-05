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
import { useTransition } from "react";
import { updateTeam } from "@/actions";
import { updateTeamsSchema } from "@/schemas";
import { UpdateTeamsValues } from "@/types/types";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";

export function UpdatePaamelte(
  {
    id,
    name,
    email,
    teamName,
    countParticipants,
    youngestParticipant,
    oldestParticipant,
  }: UpdateTeamsValues,
  key: string
) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<UpdateTeamsValues>({
    resolver: zodResolver(updateTeamsSchema),
    defaultValues: {
      id,
      name,
      email,
      teamName,
      countParticipants,
      youngestParticipant,
      oldestParticipant,
    },
  });

  const onSubmit = (value: UpdateTeamsValues) => {
    startTransition(async () => {
      const data = await updateTeam(value);

      if (data.success) {
        toast({
          title: "Lag oppdatert",
          description: data.success,
          variant: "default",
        });
        router.push("/min-side/dine-paamelte");
      }
      if (data.error) {
        toast({
          title: "Feil",
          description: data.error,
          variant: "destructive",
        });
        await new Promise((resolve) => setTimeout(resolve, 5000));
      }
    });
  };

  return (
    <Form {...form}>
      <div className=" flex items-center justify-center" key={key}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-96">
          <FormField
            control={form.control}
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
            name="youngestParticipant"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Yngste deltager</FormLabel>
                <FormControl>
                  <Input {...field} type="number" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="oldestParticipant"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Eldste deltakere</FormLabel>
                <FormControl>
                  <Input {...field} type="number" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-center text-3xl">
            <Button type="submit" disabled={isPending}>
              Oppdater laget
            </Button>
          </div>
        </form>
      </div>
    </Form>
  );
}
