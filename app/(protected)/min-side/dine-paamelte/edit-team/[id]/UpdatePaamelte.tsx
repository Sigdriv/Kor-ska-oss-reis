"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useTransition } from "react";
import { registerTeam, updateTeam } from "@/actions";
import { updateTeamsSchema } from "@/schemas";
import { ProfileFormValues, UpdateTeamsValues } from "@/types/types";

export function UpdatePaamelte({
  id,
  name,
  email,
  teamName,
  countParticipants,
}: UpdateTeamsValues) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

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
      if (data?.error) setError(data.error);
      if (data?.success) setSuccess(data.success);
    });
  };

  return (
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
