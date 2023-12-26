import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/supabase.server'
import { redirect, usePathname } from 'next/navigation'
import AuthButton from '@/components/AuthButton'

export default async function Signin({
  searchParams,
}: {
  searchParams: { auth: string, error: string, next: string }
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
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    const { data, error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: true,
        emailRedirectTo: getURL(),
      },
    })

    if (error) {
      console.log(next)
      if(next != ''){
        return redirect(`/signin${next}&error=invalid`)
      }
      return redirect(`/signin?error=invalid`)
    }

    if(next != ''){
      return redirect(`/signin${next}&auth=email`)
    }
    return redirect(`/signin?auth=email`)
  }

  const signUp = () => {
    const next = searchParams.next != undefined ? `?next=${searchParams.next}`:''
    return redirect(`/signup${next}`)
  }

  if (user) {
    return redirect('/')
  }
  return (
    <>
      <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
        <form
          className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
          action={signIn}
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
          <button className="bg-emerald-700 rounded-md px-4 py-2 text-foreground mb-2">
            Sign In
          </button>
          {searchParams?.error && (
            <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
              Invalid email
            </p>
          )}
        </form>
        <AuthButton label={'Sign Up'} url={'/signup'} pathParam={searchParams.next} style={1} />
      </div>
      {searchParams?.auth && (
        <>
          <div className="fixed flex justify-center items-center w-screen h-screen bg-neutral-950/85 ">
            <div className="text-center relative flex justify-center items-center">
              
              <div className="absolute">
                <div className="rounded-full h-28 w-28 bg-neutral-800 animate-[ping_2s_ease-in-out_infinite] opacity-35"></div>
              </div>
              <div className="max-w-md relative z-10">
                <div className="p-4 ">
                  A link to activate or login to your account has been emailed to the address provided
                </div>
                <div className="">
                  Not working? <AuthButton label={'Try again.'} url={'/signin'} pathParam={searchParams.next} style={0} />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}