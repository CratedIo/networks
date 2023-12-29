import { createClientServer } from '@/utils/supabase/supabase.server'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { setUserSignin } from '@/utils/supabase/supabase.user'

export async function GET(request: Request) {
  // The `/auth/callback` route is required for the server-side auth flow implemented
  // by the Auth Helpers package. It exchanges an auth code for the user's session.
  // https://supabase.com/docs/guides/auth/auth-helpers/nextjs#managing-sign-in-with-code-exchange
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next')

  if (code) {
    const cookieStore = cookies()
    const supabase = createClientServer(cookieStore)
    await supabase.auth.exchangeCodeForSession(code)
  }

  //Track when users signin
  setUserSignin((next != undefined || next != null)?origin + '/' + next:origin)

  // URL to redirect to after sign in process completes
  if(next != undefined || next != null){
    return NextResponse.redirect(origin + '/' + next)
  }
  return NextResponse.redirect(origin)
}
