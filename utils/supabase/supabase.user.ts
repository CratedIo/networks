'use server'
import { createClient } from '@/utils/supabase/supabase.server'
import { cookies } from 'next/headers'


export async function getUserPremiumAccess () {

  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { data: userPremiumAccess } = await supabase
    .from("user_profile")
    .select('premium_access')
    .single()

  return { data: userPremiumAccess }
}

export async function getUserSession () {

  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  
  const { data: { session } } = await supabase.auth.getSession()

  return { data: { session } }
}