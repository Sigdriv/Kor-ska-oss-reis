// "use client";

// import { zodResolver } from "@hookform/resolvers/zod";
// import { useFieldArray, useForm } from "react-hook-form";
// import { z } from "zod";

// import { cn } from "@/lib/utils";
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { toast } from "@/components/ui/use-toast";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Textarea } from "@/components/ui/textarea";
// import { useEffect, useState } from "react";
// import { getUser } from "@/actions";
// import { profileFormSchema } from "@/schemas";

// // const session = auth();

// type ProfileFormValues = z.infer<typeof profileFormSchema>;

// export function ProfileForm() {
//   const [underDevelopment] = useState(false);

//   const form = useForm<ProfileFormValues>({
//     resolver: zodResolver(profileFormSchema),
//     defaultValues: {
//       name: "",
//       email: "Email",
//     },
//   });

//   useEffect(() => {
//     const fetchUser = async () => {
//       const getSession = await getUser();

//       form.setValue(
//         "name",
//         getSession?.user?.name ? getSession.user?.name : ""
//       );
//       form.setValue(
//         "email",
//         getSession?.user?.email ? getSession.user?.email : ""
//       );
//     };
//     fetchUser();
//   }, []);

//   function onSubmit(data: ProfileFormValues) {
//     toast({
//       title: "You submitted the following values:",
//       description: (
//         <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
//           <code className="text-white">{JSON.stringify(data, null, 2)}</code>
//         </pre>
//       ),
//     });
//   }

//   return underDevelopment ? (
//     <main className="flex justify-center">
//       <h1 className=" justify-center text-3xl">
//         Profile update is under implementing
//       </h1>
//     </main>
//   ) : (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
//         <FormField
//           control={form.control}
//           name="name"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Name</FormLabel>
//               <FormControl>
//                 <Input {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="email"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Email</FormLabel>
//               <FormControl>
//                 <Input {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="picture"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Profile picture</FormLabel>
//               <Select onValueChange={field.onChange} defaultValue={field.value}>
//                 <FormControl>
//                   <SelectTrigger>
//                     <SelectValue placeholder="Select where you want to use your profile picture from" />
//                   </SelectTrigger>
//                 </FormControl>
//                 <SelectContent>
//                   <SelectItem value="m@example.com">Google</SelectItem>
//                   <SelectItem value="m@google.com">GitHub</SelectItem>
//                   <SelectItem value="m@support.com">Discord</SelectItem>
//                 </SelectContent>
//               </Select>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <div>
//           {fields.map((field, index) => (
//             <FormField
//               control={form.control}
//               key={field.id}
//               name={`urls.${index}.value`}
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel className={cn(index !== 0 && "sr-only")}>
//                     URLs
//                   </FormLabel>
//                   <FormDescription className={cn(index !== 0 && "sr-only")}>
//                     Add links to your website, blog, or social media profiles.
//                   </FormDescription>
//                   <FormControl>
//                     <Input {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           ))}
//           <Button
//             type="button"
//             variant="outline"
//             size="sm"
//             className="mt-2"
//             onClick={() => append({ value: "" })}
//           >
//             Add URL
//           </Button>
//         </div>
//         <Button type="submit">Update profile</Button>
//       </form>
//     </Form>
//   );
//   null;
// }
