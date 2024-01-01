'use server'
import { createClientServer } from '@/utils/supabase/supabase.server'
import { cookies } from 'next/headers'
import { createClientBrowser } from './supabase.client'


export async function getUserPremiumAccess () {

  const cookieStore = cookies()
  const supabase = createClientServer(cookieStore)

  const { data: userPremiumAccess } = await supabase
    .from("user_profile")
    .select('premium_access')
    .single()

  return { data: userPremiumAccess }
}

export async function DomainWhitelistValidation (email:string, id:string) {

  const cookieStore = cookies()
  const supabase = createClientServer(cookieStore)

  const { data, error } = await supabase
    .from("domain_whitelist")
    .select('domain')

  const whitelistDomains = data?.map(function (obj) {
    return obj.domain;
  });

  const domain:string = email.split('@').pop()!

  if(whitelistDomains?.includes(domain)) {

    const { data, error } = await supabase
      .from("user_profile")
      .update({
        premium_access:true
      })
      .eq('id', id)
      .single()
    return true
  }
  return false
}

export async function getUserSession () {

  const cookieStore = cookies()
  const supabase = createClientServer(cookieStore)
  
  const { data: { session } } = await supabase.auth.getSession()

  return { data: { session } }
}

export async function getUser () {

  const cookieStore = cookies()
  const supabase = createClientServer(cookieStore)
  
  const { data: { user } } = await supabase.auth.getUser()

  return { data: { user } }
}

export async function setUserSignin (location:string) {

    const cookieStore = cookies()
    const supabase = createClientServer(cookieStore)

    const { data: { user } } = await supabase.auth.getUser()

    const { data, error } = await supabase
    .from("user_signin")
    .insert({
        user_id: user?.id,
        location_url: location
    })
}

export async function setUserUnsuccessful (email:string, location_url:string, error_message:string) {

  const cookieStore = cookies()
  const supabase = createClientServer(cookieStore)

  const { data, error } = await supabase
  .from("user_unsuccessful")
  .insert({
      email: email,
      location_url: location_url,
      error_message: error_message
  })
}

