"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

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
import { AuthDomainValidation, AuthInWithEmail } from "@/utils/supabase/supabase.auth"
import AuthButton from "./AuthButton"
import { Loader2, SendHorizontal } from "lucide-react"
import { useState } from "react"
import { redirect } from "next/navigation"
import { SalesforceSignInHandler } from "@/utils/salesforce/salesforce.handler"

const formSchema = z.object({
    email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Must be a valid email" })
    .refine(async (email) => {
        // Where checkIfEmailIsValid makes a request to the backend
        // to see if the email is valid.
        return await AuthDomainValidation(email);
      }, "Please use a business email")
})

export function AuthSignInForm( { redirectParam }:any ) {

  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  
    
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: ""
    },
  })
 
  async function onSubmit(values: z.infer<typeof formSchema>) {

    setLoading(true)
    
    const result:any = await AuthInWithEmail({ 
      email:values.email, 
      redirect: redirectParam, 
      meta_data:null, 
      create:false 
    });

    setShow(true)
    
    //SalesforceSignInHandler(values.email)
    
  }

  return (
    <>
    {!show?
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    Please use your work email.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full flex gap-2" > {loading && <Loader2 className="h-4 w-4 animate-spin"/>} Sign In</Button>
          </form>
          <div className="pt-4 text-center text-sm font-medium">
                <p>By clicking continue, you agree to our Terms of Service and Privacy Policy.</p>
            </div>
            <div className="pt-4 text-center text-sm font-medium">
                <p>Dont have an account?<AuthButton label={'Sign Up'} url={'/signup'} pathParam={redirectParam} variant={'link'} /></p>
            </div>
            
        </Form>
      :
      <div className="flex flex-col items-center w-full gap-16">
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
