import { createClient } from '@/utils/supabase/supabase.server'
import { cookies } from 'next/headers'
import AuthButton from './AuthButton'
import { Button } from './ui/button'

export default async function AuthComponent() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const {
    data: { user },
  } = await supabase.auth.getUser()


  const signOut = async () => {
    'use server'

    const cookieStore = cookies()
    const supabase = createClient(cookieStore)
    await supabase.auth.signOut()
    //return redirect('/login')
  }

  return user ? (
    <div className="flex items-center gap-4">
      Hey, {user.email}!
      <form action={signOut}>
        <Button variant="outline">
          Sign Out
          <span className="sr-only">Toggle theme</span>
        </Button>
      </form>
    </div>
  ) : (
    <AuthButton label={'Sign In'} url={'/signin'} variant={'outline'} />
  )
}
