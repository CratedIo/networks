import { createClientServer } from '@/utils/supabase/supabase.server'
import { cookies } from 'next/headers'
import AuthButton from './AuthButton'
import { Button } from '../ui/button'
import { getUserSession } from '@/utils/supabase/supabase.user'

export default async function AuthComponent() {
  const cookieStore = cookies()
  const supabase = createClientServer(cookieStore)

  const { data: { session } } = await supabase.auth.getSession()

  const signOut = async () => {
    'use server'

    const cookieStore = cookies()
    const supabase = createClientServer(cookieStore)
    await supabase.auth.signOut()
    //return redirect('/login')
  }

  return session ? (
    <div className="flex items-center gap-4">
      Hey, {session.user.user_metadata.first_name}!
      <form action={signOut}>
        <Button variant="outline">
          Sign Out
          <span className="sr-only">Toggle theme</span>
        </Button>
      </form>
    </div>
  ) : (
    <AuthButton label={'Sign In'} url={'/signin'} variant={'outline'}  />
  )
}
