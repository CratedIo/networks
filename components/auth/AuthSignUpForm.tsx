"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { Check, ChevronsUpDown, Loader2, SendHorizontal } from "lucide-react"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "../ui/switch"
import { AuthDomainValidation, AuthInWithEmail } from "@/utils/supabase/supabase.auth"
import AuthButton from "./AuthButton"
import { SalesforceSignUpHandler } from "@/utils/salesforce/salesforce.handler"
import { useState } from "react"
import { country_list, industry_list } from "@/utils/data/lists"
const formSchema = z.object({
  first_name: z.string().min(1, { message: "First name is required" }).max(255, { message: "Too long" }),
  last_name: z.string().min(1, { message: "Last name is required" }).max(255, { message: "Too long" }),
  job_title: z.string().min(1, { message: "Job title is required" }).max(255, { message: "Too long" }),
  phone_number: z.string().min(1, { message: "Phone number is required" }).max(30, { message: "Too long" }),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Must be a valid email included @" })
    .refine(async (email) => {
        // Where checkIfEmailIsValid makes a request to the backend
        // to see if the email is valid.
        return await AuthDomainValidation(email);
      }, "Please use a business email"),
  company_name: z.string().min(1, { message: "Company name is required" }).max(255, { message: "Too long" }),
  industry: z.string(),
  country: z.string(),
  objective: z.string(),
  interest_primary: z.string(),
  interest_ehs: z.boolean().optional(),
  consent: z.boolean(),
});


export function AuthSignUpForm( { redirectParam }:any ) {

  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      job_title: "",
      phone_number: "",
      email: "",
      company_name: "",
      },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {

    setLoading(true)
    setShow(true)
    
    redirectParam = redirectParam != null ? redirectParam : false; 

    const result:any = await AuthInWithEmail({ 
      email:values.email, 
      redirect: redirectParam, 
      meta_data: {
        first_name: values.first_name,
        last_name: values.last_name
      }, 
      create:true 
    });

    
    //SalesforceSignUpHandler(values.email)

  }

  return (
    <>
    {!show?
      <>
        <Form {...form}>
          <form noValidate onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid grid-cols-1 gap-8">
                <FormField
                  control={form.control}
                  name="first_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="last_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="job_title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Job title</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="phone_number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone number</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormDescription>
                        Please include country code
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company email</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormDescription>
                        Please use a work email
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="company_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 
                 <FormField
                           control={form.control}
                           name="industry"
                           render={({ field }) => (
                             <FormItem className="flex flex-col">
                               <FormLabel>Industry</FormLabel>
                               <Popover>
                                 <PopoverTrigger asChild>
                                   <FormControl>
                                     <Button
                                       variant="outline"
                                       role="combobox"
                                       className={`justify-between ${!field.value && "text-muted-foreground"}`}
                                     >
                                       {field.value
                                         ? industry_list.find(
                                             (item) => item.value === field.value
                                           )?.label
                                         : "Select industry..."}
                                       <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                     </Button>
                                   </FormControl>
                                 </PopoverTrigger>
                                 <PopoverContent className="w-full max-w-[400px] p-0">
                                   <Command>
                                     <CommandInput placeholder="Search industries..." />
                                     <CommandEmpty>No industries found.</CommandEmpty>
                                     <CommandGroup className=" overflow-auto max-h-[300px]">
                                       { industry_list.map((item) => (
                                         <CommandItem
                                           value={item.label}
                                           key={item.value}
                                           onSelect={() => {
                                             form.setValue("industry", item.value)
                                           }}
                                         >
                                           <Check
                                             className={`mr-2 h-4 w-4 ${item.value === field.value ? "opacity-100" : "opacity-0"}`}
                                           />
                                           {item.label}
                                         </CommandItem>
                                       ))}
                                     </CommandGroup>
                                   </Command>
                                 </PopoverContent>
                               </Popover>
                               <FormDescription>
                               Please select your indusrty
                               </FormDescription>
                               <FormMessage />
                             </FormItem>
                           )}
                         />
                                      
                 <FormField
                           control={form.control}
                           name="country"
                           render={({ field }) => (
                             <FormItem className="flex flex-col">
                               <FormLabel>Country</FormLabel>
                               <Popover>
                                 <PopoverTrigger asChild>
                                   <FormControl>
                                     <Button
                                       variant="outline"
                                       role="combobox"
                                       className={`justify-between ${!field.value && "text-muted-foreground"}`}
                                     >
                                       {field.value
                                         ? country_list.find(
                                             (item) => item.value === field.value
                                           )?.label
                                         : "Select country"}
                                       <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                     </Button>
                                   </FormControl>
                                 </PopoverTrigger>
                                 <PopoverContent className="w-full max-w-[400px] p-0">
                                   <Command>
                                     <CommandInput placeholder="Search countries..." />
                                     <CommandEmpty>No countires found.</CommandEmpty>
                                     <CommandGroup className=" overflow-auto max-h-[300px]">
                                       { country_list.map((item) => (
                                         <CommandItem
                                           value={item.label}
                                           key={item.value}
                                           onSelect={() => {
                                             form.setValue("country", item.value)
                                           }}
                                         >
                                           <Check
                                             className={`mr-2 h-4 w-4 ${item.value === field.value ? "opacity-100" : "opacity-0"}`}
                                           />
                                           {item.label}
                                         </CommandItem>
                                       ))}
                                     </CommandGroup>
                                   </Command>
                                 </PopoverContent>
                               </Popover>
                               <FormDescription>
                               Description
                               </FormDescription>
                               <FormMessage />
                             </FormItem>
                           )}
                         />
                                      
                  <FormField
                           control={form.control}
                           name="objective"
                           render={({ field }) => (
                             <FormItem className="space-y-3">
                               <FormLabel>Your objective</FormLabel>
                               <FormControl>
                                 <RadioGroup
                                   onValueChange={field.onChange}
                                   defaultValue={field.value}
                                   className="flex flex-col space-y-1"
                                 >
                                   <FormItem className="flex items-center space-x-3 space-y-0">
                                     <FormControl>
                                       <RadioGroupItem value="To improve buying decisions" />
                                     </FormControl>
                                     <FormLabel className="font-normal">
                                     To improve buying decisions
                                     </FormLabel>
                                   </FormItem>
                                   <FormItem className="flex items-center space-x-3 space-y-0">
                                     <FormControl>
                                       <RadioGroupItem value="To gain knowledge of your competitive landscape" />
                                     </FormControl>
                                     <FormLabel className="font-normal">
                                     To gain knowledge of your competitive landscape
                                     </FormLabel>
                                   </FormItem>
                                 </RadioGroup>
                               </FormControl>
                               <FormDescription>
                               Which best describes how you will use Verdantix’s research
                               </FormDescription>
                               <FormMessage />
                             </FormItem>
                           )}
                         />
                 
                  <FormField
                           control={form.control}
                           name="interest_primary"
                           render={({ field }) => (
                             <FormItem className="space-y-3">
                               <FormLabel>Primary area of interest</FormLabel>
                               <FormControl>
                                 <RadioGroup
                                   onValueChange={field.onChange}
                                   defaultValue={field.value}
                                   className="flex flex-col space-y-1"
                                 >
                                   <FormItem className="flex items-center space-x-3 space-y-0">
                                     <FormControl>
                                       <RadioGroupItem value="Environment, Health &amp; Safety" />
                                     </FormControl>
                                     <FormLabel className="font-normal">
                                     Environment, Health &amp; Safety
                                     </FormLabel>
                                   </FormItem>
                                   <FormItem className="flex items-center space-x-3 space-y-0">
                                     <FormControl>
                                       <RadioGroupItem value="Operational Excellence" />
                                     </FormControl>
                                     <FormLabel className="font-normal">
                                     Operational Excellence
                                     </FormLabel>
                                   </FormItem>
                                   <FormItem className="flex items-center space-x-3 space-y-0">
                                     <FormControl>
                                       <RadioGroupItem value="Smart Buildings" />
                                     </FormControl>
                                     <FormLabel className="font-normal">
                                     Smart Buildings
                                     </FormLabel>
                                   </FormItem>
                                 </RadioGroup>
                               </FormControl>
                               <FormMessage />
                             </FormItem>
                           )}
                         />
                
                <FormField
                              control={form.control}
                              name="interest_ehs"
                              render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                  <div className="space-y-0.5">
                                    <FormLabel className="text-base">Environment, Health &amp; Safety</FormLabel>
                                  </div>
                                  <FormControl>
                                    <Switch
                                      checked={field.value}
                                      onCheckedChange={field.onChange}
                                    />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                
                <FormField
                              control={form.control}
                  name="consent"
                              render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                  <div className="space-y-0.5">
                                    <FormLabel className="text-base">Accept terms and conditions</FormLabel>
                                    <FormDescription>
                                    You agree to our Terms of Service and Privacy Policy.
                                    </FormDescription>
                                  </div>
                                  <FormControl>
                                    <Switch
                                      checked={field.value}
                                      onCheckedChange={field.onChange}
                                    />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
            <Button type="submit" className="w-full flex gap-2">{loading && <Loader2 className="h-4 w-4 animate-spin"/>} Sign Up</Button>
            </div>
          </form>
        </Form>
        <div className="pt-4 text-center text-sm font-medium">
          <p>Already have an account?<AuthButton label={'Sign In'} url={'/signin'} pathParam={redirectParam} variant={'link'} /></p>
        </div>
      </>
    :
    <div className="flex flex-col items-center w-full gap-16 authSent">
      <div className="flex items-center gap-4">
        <span className="relative flex h-3 w-3 animate-[bounce_1.2s_ease-in-out_infinite]">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
        </span>
        <span className="relative flex h-3 w-3 animate-bounce">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
        </span>
        <SendHorizontal size={64} className="animate-bounce" />
      </div>
      <div className="text-center text-lg font-normal">
        <p>A link to sign into your account has been emailed to the address provided</p>
      </div>
    </div>
    }
  </>
)
}
