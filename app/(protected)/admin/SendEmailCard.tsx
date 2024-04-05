"use client";
import { getTeamsCount } from "@/actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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
// import { PersonSearch } from "./PersonSearch";

export default function SendEmailCard() {
  return;
  // (
  //   <main className=" pt-20 flex items-center justify-center">
  //     <Card className="w-96">
  //       <CardHeader className=" flex items-center justify-center">
  //         <CardTitle>Send e-post</CardTitle>
  //       </CardHeader>
  //       <CardContent></CardContent>
  //       <CardFooter className=" flex items-center justify-center flex-col gap-4">
  //         <Dialog>
  //           <DialogTrigger asChild>
  //             <Button>Send e-post til en deltager</Button>
  //           </DialogTrigger>
  //           <DialogContent>
  //             <DialogHeader>
  //               <DialogTitle>Hvem vil du sende e-post til?</DialogTitle>
  //               <DialogDescription>
  //                 <PersonSearch />
  //               </DialogDescription>
  //             </DialogHeader>
  //             <div className="flex justify-center gap-10 py-4">
  //               <DialogClose asChild>
  //                 <Button variant="secondary">Avbryt</Button>
  //               </DialogClose>
  //             </div>
  //           </DialogContent>
  //         </Dialog>
  //         <Link href={`mailto:${"sigdriv06@gmail.com"}`}>
  //           <Button>Send e-post til alle deltagere</Button>
  //         </Link>
  //       </CardFooter>
  //     </Card>
  //   </main>
  // );
}
