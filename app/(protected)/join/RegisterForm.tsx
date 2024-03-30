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
import { useEffect, useState, useTransition } from "react";
import { getUser, registerTeam } from "@/actions";
import { CreateTeamsValues } from "@/types/types";
import { createTeamsSchema } from "@/schemas";

export function RegisterForm() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

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
    };
    fetchUser();
  }, []);

  const onSubmit = (value: CreateTeamsValues) => {
    setError(null);
    setSuccess(null);
    startTransition(async () => {
      const data = await registerTeam(value);
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
          <FormField
            control={form.control}
            name="userEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Opprettes av (kan ikke endres)</FormLabel>
                <FormControl>
                  <Input {...field} disabled />
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
              Meld på laget
            </Button>
          </div>
        </form>
      </div>
    </Form>
  );
}
