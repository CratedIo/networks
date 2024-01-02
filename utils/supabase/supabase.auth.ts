"use server"
import { cookies } from "next/headers";
import { createClientServer } from "./supabase.server";
import { createClientBrowser } from "./supabase.client";
import { redirect } from "next/navigation";
import { SendSignUpEmail } from "../resend/resend.send";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL
? `https://${process.env.NEXT_PUBLIC_SITE_URL}`
: 'http://localhost:3000';

export async function AuthInWithEmail( data:{
    email:string;
    redirect:any;
    meta_data:any | null;
    create:boolean;
}) {
    const redirectPath = data.redirect ? '?next=' + data.redirect : '';

    const cookieStore = cookies()
    const supabase = createClientServer(cookieStore)
    
    const result = await supabase.auth.signInWithOtp({
        email:data.email,
        options: {
            data:data.meta_data,
            shouldCreateUser: data.create,
            emailRedirectTo: baseUrl + '/auth/callback' + redirectPath,
        },
      })

    if(result.error) {
        const send = await SendSignUpEmail( data.email, redirectPath )
    }
    return JSON.stringify(result)
    
}

export async function AuthInWithEmailResend( data:{
    email:string;
    redirect:any;
}) {
    const redirectPath = data.redirect ? '?next=' + data.redirect : '';

    try {
    const cookieStore = cookies()
    const supabase = createClientServer(cookieStore)

    const result = await supabase.auth.resend({
        type: 'signup',
        email:data.email,
        options: {
            emailRedirectTo: baseUrl + '/auth/callback' + redirectPath,
        },
      })
      return JSON.stringify(result)
    } catch (error) {
        //const send = await SendSignUpEmail()
    }
    
}

export async function AuthDomainValidation (email:string){

    const cookieStore = cookies()
    const supabase = createClientServer(cookieStore)

    const { data, error } = await supabase
        .from("domain_blacklist")
        .select('domain')

    const blacklistDomains = data?.map(function (obj) {
        return obj.domain;
      });

    const domain:string = email.split('@').pop()!

    if(blacklistDomains?.includes(domain)) {
        await AuthInEmailUnsuccessful(email)
        return false
    }
    return true
}

async function AuthInEmailUnsuccessful (email:string) {

    const supabase = createClientBrowser()
  
    const { data, error } = await supabase
    .from("user_unsuccessful")
    .insert({
        email: email
    })
  }

export async function AuthOut() {

    const cookieStore = cookies()
    const supabase = createClientServer(cookieStore)

    await supabase.auth.signOut()
    
    return redirect('/')
}