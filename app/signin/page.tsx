import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/supabase.server'
import { redirect, usePathname } from 'next/navigation'
import AuthButton from '@/components/AuthButton'
import { setUserUnsuccessful } from '@/utils/supabase/supabase.user'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Send, SendHorizontal } from 'lucide-react'

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

    const blacklistDomains = ['yahoo.com', 'hotmail.com']
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
    
  <main>
    <div className="container mx-auto px-5">
      <div className="flex justify-center items-center w-full min-h-screen">
        <div className="flex flex-col sm:max-w-md w-full justify-center gap-2">
          <form
            className="animate-in flex flex-col w-full justify-center gap-2 text-foreground"
            action={signIn}
          >
            <Input name="email" type="email" placeholder="Email" required />
            <p className="pb-6 text-sm font-medium">Please use your work email</p>
            <Button type="submit">
              Sign In / Up
              <span className="sr-only">Sign In</span>
            </Button>
            {searchParams?.error && (
              <p className="p-4 text-center">
                {errorMessage}
              </p>
            )}
          </form>
          <div className="pt-8 text-center text-sm font-medium">
            <p>By clicking continue, you agree to our Terms of Service and Privacy Policy.</p>
          </div>
        </div>
        {searchParams?.auth && (
          <>
            <div className="fixed flex justify-center items-center w-screen h-screen bg-neutral-950/85 ">
              <div className="text-center relative flex justify-center items-center">
                
                
                <div className="max-w-md relative z-10 flex flex-col gap-12 items-center">
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
                  <div className="text-center text-lg font-medium">
                    <p>A link to sign into your account has been emailed to the address provided...</p>
                    <p className="pt-4 text-sm">Not working? <AuthButton label={'Try again.'} url={'/signin'} pathParam={searchParams.next} variant={'link'} /></p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  </main>
  )
}

/*<p>Dont have an account?<AuthButton label={'Sign Up'} url={'/signup'} pathParam={searchParams.next} variant={'link'} /></p>*/