"use server"
import { cookies } from "next/headers";
import { createClientServer } from "./supabase.server";
import { createClientBrowser } from "./supabase.client";
import { redirect } from "next/navigation";
import { SendSignUpEmail } from "../resend/resend.send";

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
            emailRedirectTo: 'http://localhost:3000/auth/callback' + redirectPath,
        },
      })

    if(result.error) {
        const send = await SendSignUpEmail( data.email, redirectPath )
    }
    if(!result.error) {
        console.log('no error')
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
            emailRedirectTo: 'http://localhost:3000/auth/callback' + redirectPath,
        },
      })
      console.log('hello');
      return JSON.stringify(result)
    } catch (error) {
        //const send = await SendSignUpEmail()
        return console.log(error);
    }
    
}

export async function AuthDomainValidation (email:string){

    const blacklistDomains = ['yahoo.com', 'hotmail.com']
    const domain:string = email.split('@').pop()!

    if(blacklistDomains.includes(domain)) {
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