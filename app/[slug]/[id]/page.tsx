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
  const data:articleFull = await getData(params.id);

  
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const Content = ({ data }:any) => {
    const gated = data.gated;
    return !gated || user ? (
    <p>{data.excerpt}</p>
    ) : (
    <LoginButton />
    )
  }
  
  return (
    <>
    <Header />
      <div className="mt-8">
        <h2 className="text-lg line-clamp-2 font-bold">{data.title}</h2>
        <Content data={data} />
      </div>
    </>
  );
}
