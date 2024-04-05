"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronsUpDown } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Link from "next/link";

// const participants = getParticipants();

const participants = [
  { label: "Participant 1", value: "test" },
  { label: "Participant 2", value: "" },
  { label: "Participant 3", value: "" },
  { label: "Participant 4", value: "" },
  { label: "Participant 5", value: "" },
];

const FormSchema = z.object({
  participants: z.string({
    required_error: "Please select a language.",
  }),
});

export function PersonSearch() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  return (
    <Form {...form}>
      <FormField
        control={form.control}
        name="participants"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel>Deltager</FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant="outline"
                    role="combobox"
                    className={cn(
                      "w-[200px] justify-between",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    Velg deltager
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0">
                <Command>
                  <CommandInput placeholder="Search language..." />
                  <CommandEmpty>Ingen deltager funnet</CommandEmpty>
                  <CommandGroup>
                    {participants.map((participants) => (
                      <CommandList>
                        <CommandItem
                          value={participants.label}
                          key={participants.value}
                          onSelect={() => {
                            form.setValue("participants", participants.value);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              participants.value === field.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {participants.label}
                        </CommandItem>
                      </CommandList>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
            <FormDescription>
              Dette er deltageren som skal motta e-posten.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <Link href={`mailto:${participants}`}>
        <Button>Send epost</Button>
      </Link>
    </Form>
  );
}
