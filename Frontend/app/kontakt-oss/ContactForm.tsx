"use client";

import { contactUs } from "@/actions";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { contactUsSchema } from "@/schemas";
import { ContactUsType } from "@/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useTransition } from "react";
import { useForm } from "react-hook-form";

export default function ContactForm() {
  const [isPending, startTransition] = useTransition();

  const form = useForm<ContactUsType>({
    resolver: zodResolver(contactUsSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = (values: ContactUsType) => {
    startTransition(async () => {
      try {
        const response = await contactUs(values);
        if (response.success) {
          toast({
            title: response.success,
            description: response.description,
            variant: "default",
          });
        } else if (response.error) {
          toast({
            title: response.error,
            description: response.description,
            variant: "destructive",
          });
        }
      } catch (error) {
        toast({
          title: "Feil",
          description: "En feil oppstod under sending av melding",
          variant: "destructive",
        });
      }
    });
  };

  return (
    <div className="w-full pt-20">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-8">
            <FormField
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Navn<sup className=" text-red-600">*</sup>
                  </FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Epost<sup className=" text-red-600">*</sup>
                  </FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefon</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Emne <sup className=" text-red-600">*</sup>
                  </FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Melding <sup className=" text-red-600">*</sup>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      className="resize-y"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-center text-3xl">
              <Button type="submit" disabled={isPending}>
                Send melding
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
