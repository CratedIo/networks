import { createClient } from '@/utils/supabase/supabase.server'
import { cookies } from 'next/headers'
import AuthButton from './AuthButton'

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
        <button className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover">
          Sign out
        </button>
      </form>
    </div>
  ) : (
    <AuthButton label={'Sign in'} url={'/signin'} style={2} />
  )
}
