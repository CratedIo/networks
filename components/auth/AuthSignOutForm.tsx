"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Form
} from "@/components/ui/form"
import { AuthOut } from "@/utils/supabase/supabase.auth"
import { redirect } from "next/navigation"

const formSchema = z.object({})

export function AuthSignOutForm( { redirectParam }:any ) {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema)
  })
 
  async function onSubmit(values: z.infer<typeof formSchema>) {
    
    const result:any = await AuthOut();
  }
  
  return (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <Button type="submit" className="w-full flex gap-2" >Sign Out</Button>
          </form>
        </Form>
  )
}
