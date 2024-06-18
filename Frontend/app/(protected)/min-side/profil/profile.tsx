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
import { toast } from "@/components/ui/use-toast";
import { useEffect, useState, useTransition } from "react";
import { getIdFromEmail, getUser, updateProfile } from "@/actions";
import { profileFormSchema } from "@/schemas";
import { UpdateProfile } from "@/types/types";

export function ProfileForm() {
  const [underDevelopment] = useState(false);
  const [isPending, startTransistion] = useTransition();

  const form = useForm<UpdateProfile>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      id: "",
      name: "",
      email: "",
      phone: "",
    },
  });

  useEffect(() => {
    const fetchUser = async () => {
      const getSession = await getUser();

      const user = await getIdFromEmail(getSession?.user?.email ?? "");

      form.setValue("id", user.id ?? "");
      form.setValue("name", user.name ?? "");
      form.setValue("email", user.email ?? "");
      form.setValue("phone", user.phone ?? "");
    };
    fetchUser();
  }, []);

  function onSubmit(data: UpdateProfile) {
    startTransistion(async () => {
      const response = await updateProfile(data);
      if (response.success) {
        toast({
          title: response.success,
          description: "Profilen din er oppdatert",
          variant: "default",
        });
      } else {
        toast({
          title: "Noe gikk galt",
          description: response.error,
          variant: "destructive",
        });
      }
    });
  }

  return underDevelopment ? (
    <main className="flex justify-center">
      <h1 className=" justify-center text-3xl">
        Profile update is under implementing
      </h1>
    </main>
  ) : (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
              <FormLabel>E-post</FormLabel>
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
        <Button type="submit">Oppdater profil</Button>
      </form>
    </Form>
  );
  null;
}
