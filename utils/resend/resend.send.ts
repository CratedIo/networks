import { Resend } from 'resend';
import { EmailSignUp } from '@/components/email/EmailSignUp';
import { NextRequest, NextResponse } from "next/server";

export async function SendSignUpEmail( email:string, redirect:any ) {

    try {
        const resend = new Resend(process.env.RESEND_API_KEY!)
        const { data, error } = await resend.emails.send({
            from: 'Crated <hello@crated.io>',
            to: email,
            subject: 'Sign up to the Network',
            react: EmailSignUp( email, redirect )
        })
        return NextResponse.json({ status: 200 })
    } catch (error) {
        return NextResponse.json({ status: 422, error: "Unprocessable Entity" });
    }
}
