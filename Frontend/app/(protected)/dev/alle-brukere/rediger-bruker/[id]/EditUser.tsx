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
import { updateUserSchema } from "@/schemas";
import { updateUserType } from "@/types/types";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import Link from "next/link";
import { updateUser } from "@/actions";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function EditUser({ id, name, email, phone, role }: updateUserType) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<updateUserType>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      id,
      name,
      email,
      phone,
      role,
    },
  });

  const onSubmit = (value: updateUserType) => {
    startTransition(async () => {
      const data = await updateUser(value);

      if (data.success) {
        toast({
          title: data.title,
          description: data.success,
          variant: "default",
        });
        router.push("/dev/alle-brukere");
      }
      if (data.error) {
        toast({
          title: data.title,
          description: data.error,
          variant: "destructive",
        });
      }
    });
  };

  return (
    <div className=" pr-10 pl-10 pb-20">
      <Form {...form}>
        <div className=" flex items-center justify-center">
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 w-96"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Navn<sup className=" text-red-600">*</sup>
                  </FormLabel>
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
                  <FormLabel>
                    Epost<sup className=" text-red-600">*</sup>
                  </FormLabel>
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
                  <FormLabel>
                    Telefon<sup className=" text-red-600">*</sup>
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Rolle<sup className=" text-red-600">*</sup>
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Velg en rolle til brukeren" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="USER">USER</SelectItem>
                      <SelectItem value="ADMIN">ADMIN</SelectItem>
                      <SelectItem value="DEV">DEV</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className=" text-3xl grid grid-cols-2">
              <div>
                <Link href="/dev/alle-brukere">
                  <Button disabled={isPending} variant={"outline"}>
                    Avbryt
                  </Button>
                </Link>
              </div>
              <div className="flex justify-end">
                <Button type="submit" disabled={isPending}>
                  Oppdater bruker
                </Button>
              </div>
            </div>
          </form>
        </div>
      </Form>
    </div>
  );
}
