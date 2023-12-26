import { cookies } from 'next/headers'
import AuthComponent from "@/components/AuthComponent";
import { createClient } from '@/utils/supabase/supabase.server'
import Link from 'next/link';
import { ModeToggle } from './ModeToggle';
import { Laugh } from 'lucide-react';

export default function Header() {

  const cookieStore = cookies()

  const canInitSupabaseClient = () => {
    // This function is just for the interactive tutorial.
    // Feel free to remove it once you have Supabase connected.
    try {
      createClient(cookieStore)
      return true
    } catch (e) {
      return false
    }
  }

  const isSupabaseConnected = canInitSupabaseClient()

  return (
    <nav className="w-full flex items-center justify-between h-16 p-4">
      <Link href={'/'}>
      <Laugh />
      </Link>
      <div className="flex justify-between gap-4 items-center text-sm">
        {isSupabaseConnected && <AuthComponent />}
        <ModeToggle />
      </div>
    </nav>
  )
}
