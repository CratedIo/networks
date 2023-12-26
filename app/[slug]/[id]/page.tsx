import { articleQuery } from "@/utils/sanity/sanity.queries";
import { client } from "../../../utils/sanity/sanity.client";
import { articleFull } from "../../../utils/sanity/sanity.interface";
import Header from "@/components/Header";
import { createClient } from '@/utils/supabase/supabase.server'
import { cookies } from 'next/headers'
import Login from "@/app/login/page";
import LoginButton from "@/components/LoginButton";

export const revalidate = 30; // revalidate at most 30 seconds

async function getData(id: string) {
  const data = await client.fetch(articleQuery, {id});
  return data;
}


export default async function Article({
  params,
}: {
  params: { id: string };
}) {
  const articleData:articleFull = await getData(params.id);

  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const setNewView = async () => {
    const { data, error } = await supabase
    .from("network_view")
    .insert({
      article_id: articleData?._id,
      user_id: user?.id
    })
  }
  if(user) {
    setNewView()
  }

async function getAccess () {
  return supabase
    .from('user_profile')
    .select('vantage_client')
    .eq('id', user?.id)
    .limit(1)
    .single()
}

const {
  data: access
} = await getAccess()

  const Content = ({ data }:any) => {

    const premium = data.premium;
    const gated = data.gated;

    if(premium) {

      if(user && access?.vantage_client) {
        return ( <p>{data.excerpt}</p> )
      } else  if(user) {
        return ( <p>You do not have the correct access</p> )
      }
      return ( <div>
        <p>This required premium access</p> 
        <LoginButton />
      </div> )
    }
    if(gated) {

      if(user) {
        return ( <p>{data.excerpt}</p> )
      }
      return ( <LoginButton /> )
    }
    return ( <p>{data.excerpt}</p> )
    
  }
  
  return (
    <>
    <Header />
      <div className="mt-8">
        <h2 className="text-lg line-clamp-2 font-bold">{articleData.title}</h2>
        <Content data={articleData} />
      </div>
    </>
  );
}
