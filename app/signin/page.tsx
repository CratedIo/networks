import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/supabase.server'
import { redirect, usePathname } from 'next/navigation'
import AuthButton from '@/components/AuthButton'
import { setUserUnsuccessful } from '@/utils/supabase/supabase.user'

export default async function Signin({
  searchParams,
}: {
  searchParams: { auth: string, error: string, next: string }
}) {

  let errorMessage;
  if(searchParams.error) {
    
    switch(searchParams.error) {
      case 'timeout':
        errorMessage = 'Something went wrong. Please try again.';
        break
      case 'domain':
        errorMessage = 'Please use a different email provider';
        break
      default:
        errorMessage = 'Something went wrong. Please try again.'
    }
  }
  
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const {
    data: { user },
  } = await supabase.auth.getUser()
  
  const signIn = async (formData: FormData) => {
    'use server'

    const blacklistDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', ]
    const email = formData.get('email') as string
    const domain:string = email.split('@').pop()!

    const next = searchParams.next != undefined ? `?next=${searchParams.next}`:''

    if(blacklistDomains.includes(domain)) {

      setUserUnsuccessful(email, searchParams.next != undefined ? searchParams.next: '/', 'domain')

      if(next != ''){
        return redirect(`/signin${next}&error=domain`)
      }
      return redirect(`/signin?error=domain`)
    }

    const cookieStore = cookies()
    const supabase = createClient(cookieStore)


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

    const { data, error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: true,
        emailRedirectTo: getURL(),
      },
    })

    if (error) {

      setUserUnsuccessful(email, searchParams.next != undefined ? searchParams.next: '/', 'timeout')

      if(next != ''){
        return redirect(`/signin${next}&error=timeout`)
      }
      return redirect(`/signin?error=timeout`)
    }

    if(next != ''){
      return redirect(`/signin${next}&auth=email`)
    }
    return redirect(`/signin?auth=email`)
  }

  if (user) {
    return redirect('/')
  }
  return (
    <>
      <div className="h-screen flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
        <form
          className="animate-in flex flex-col w-full justify-center gap-2 text-foreground"
          action={signIn}
        >
          <label className="text-md" htmlFor="email">
            Email
          </label>
          <input
            className="rounded-md px-4 py-2 bg-inherit border mb-6"
            name="email"
            type="email"
            placeholder="name@company.com"
            required
          />
          <button 
          
          type="submit"
          className="bg-emerald-700 rounded-md px-4 py-2 text-foreground mb-2">
            Sign In
          </button>
          {searchParams?.error && (
            <p className="p-4 text-center">
              {errorMessage}
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