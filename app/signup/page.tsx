import { headers, cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/supabase.server'
import { redirect } from 'next/navigation'
import AuthButton from '@/components/AuthButton'

export default async function Signup({
  searchParams,
}: {
  searchParams: { message: string, next: string }
}) {

  
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  
  const {
    data: { user },
  } = await supabase.auth.getUser()
  
  const signIn = async (formData: FormData) => {
    'use server'

    const next = searchParams.next != undefined ? `?next=${searchParams.next}`:''

    const getURL = () => {
      let url =
        process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
        process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
        'http://localhost:3000'
      // Make sure to include `https://` when not localhost.
      url = url.includes('http') ? url : `https://${url}`
      // Make sure to include a trailing `/`.
      url = url.charAt(url.length - 1) === '/' ? url : `${url}/auth/callback${next}`
      return url
    }

    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      return redirect('/signup?message=Could not authenticate user')
    }

    return redirect(getURL())
  }

  const signUp = async (formData: FormData) => {
    'use server'

    const next = searchParams.next != undefined ? `?next=${searchParams.next}`:''

    const getURL = () => {
      let url =
        process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
        process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
        'http://localhost:3000'
      // Make sure to include `https://` when not localhost.
      url = url.includes('http') ? url : `https://${url}`
      // Make sure to include a trailing `/`.
      url = url.charAt(url.length - 1) === '/' ? url : `${url}/auth/callback${next}`
      return url
    }

    const origin = headers().get('origin')
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    const { data, error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: true,
        emailRedirectTo: getURL(),
      },
    })

    /*
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: getURL(),
      },
    })
    */

    if (error) {
      return redirect('/signup?message=Could not authenticate user')
    }

    return redirect('/signup?message=Check email to continue sign in process')
  }

if (user) {
  return redirect('/')
  } else {
  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
      <form
        className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
        action={signUp}
      >
        <label className="text-md" htmlFor="email">
          Email
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          name="email"
          placeholder="you@example.com"
          required
        />
        <button
          formAction={signUp}
          className="bg-emerald-700 rounded-md px-4 py-2 text-foreground mb-2"
        >
          Sign Up
        </button>
        {searchParams?.message && (
          <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
            {searchParams.message}
          </p>
        )}
      </form>
      <AuthButton label={'Sign In'} url={'/signin'} pathParam={searchParams.next} style={1} />
    </div>
  )
  }
}

/*

        <label className="text-md" htmlFor="password">
          Password
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          type="password"
          name="password"
          placeholder="••••••••"
          required
        />
        */