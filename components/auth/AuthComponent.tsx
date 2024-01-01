import { createClientServer } from '@/utils/supabase/supabase.server'
import { cookies } from 'next/headers'
import AuthButton from './AuthButton'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { ModeToggle } from '../ModeToggle'
import { AvatarComponent } from '../users/AvatarComponent'

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

  if (session) {
    const name = session.user.user_metadata.first_name + session.user.user_metadata.last_name
  
    return  (
      <div className="flex items-center gap-4">
        <DropdownMenu>
        <DropdownMenuTrigger>
          <AvatarComponent image={null} name={name} />
        </DropdownMenuTrigger>
        <DropdownMenuContent side="bottom" align="end" className="w-64">
          <DropdownMenuLabel>
            <p className="font-normal text-lg text-ellipsis overflow-hidden">Hey, {session.user.user_metadata.first_name}</p>
            <p className="font-light text-sm text-ellipsis overflow-hidden">{session.user.email}</p>
            </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuLabel><ModeToggle /></DropdownMenuLabel>
          <DropdownMenuItem>Account</DropdownMenuItem>
          <DropdownMenuItem>Upgrade</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
          
          
          <form action={signOut} className="w-full">
            <button className="w-full text-left">
              Sign Out
              <span className="sr-only">Sign Out</span>
            </button>
          </form>
            
            
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
        
      </div>
    )
    }
    
    return (
      
      <>
        <AuthButton label={'Sign In'} url={'/signin'} variant={'outline'}  />
        <ModeToggle />
      </>
    )
  }
  