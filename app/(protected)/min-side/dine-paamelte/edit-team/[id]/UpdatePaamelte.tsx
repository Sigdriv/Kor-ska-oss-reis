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
import { useState, useTransition } from "react";
import { updateTeam } from "@/actions";
import { updateTeamsSchema } from "@/schemas";
import { UpdateTeamsValues } from "@/types/types";
import { useRouter } from "next/navigation";

export function UpdatePaamelte(
  { id, name, email, teamName, countParticipants }: UpdateTeamsValues,
  key: string
) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter();

  const form = useForm<UpdateTeamsValues>({
    resolver: zodResolver(updateTeamsSchema),
    defaultValues: {
      id,
      name,
      email,
      teamName,
      countParticipants,
    },
  });

  const onSubmit = (value: UpdateTeamsValues) => {
    setError(null);
    setSuccess(null);
    startTransition(async () => {
      const data = await updateTeam(value);

      // ToDo: needs to add existing team check when update team
      // if (data?.error) setError(data.error);
      if (data?.success) {
        setSuccess(data.success);
        await new Promise((resolve) => setTimeout(resolve, 2000));
        router.push("/min-side/dine-paamelte")
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
                  <Input {...field} disabled />
                </FormControl>
                <FormDescription>
                  Lagnavnet kan ikke endres enda
                </FormDescription>
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
          {error && (
            <div className="text-red-500 text-center">
              <p>{error}</p>
            </div>
          )}
          {success && (
            <div className="text-green-500 text-center">
              <p>{success}</p>
            </div>
          )}
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
