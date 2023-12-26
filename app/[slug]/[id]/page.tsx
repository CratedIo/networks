import { articleQuery } from "@/utils/sanity/sanity.queries";
import { client } from "../../../utils/sanity/sanity.client";
import { articleFull } from "../../../utils/sanity/sanity.interface";
import Header from "@/components/Header";
import { getUserPremiumAccess, getUserSession } from "@/utils/supabase/supabase.user";
import { setArticleView } from "@/utils/supabase/supabase.view";
import AuthButton from "@/components/AuthButton";

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

  const premium = articleData.premium;
  const gated = articleData.gated;

  const { data: { session } } = await getUserSession()

  if(session){
    setArticleView(articleData._id, session.user.id)
  }

  if(premium && session) {
    var { data: userPremiumAccess } = await getUserPremiumAccess()
  }


  const Content = ({ data }:any) => {

    if(!premium && !gated) { return ( <p>{data.excerpt}</p> ) }

    if(gated) {

      if(session) {
        return ( <p>{data.excerpt}</p> )
      }
      return ( <AuthButton label={'Sign In'} url={'/signin'} /> )
    }

    if(premium) {
      if(session && userPremiumAccess?.premium_access) {
        return ( 
          <div>
            <p>You have the correct access</p>
            <p>{data.excerpt}</p>
          </div> 
        )
      } else if(session && !userPremiumAccess?.premium_access) {
        return ( <p>You do not have the correct access</p> )
      }
      return ( 
        <div>
          <p>This required premium access</p> 
          <AuthButton label={'Sign In'} url={'/signin'} variant={'outline'}/>
        </div> 
      )
    }
    
    return ( <p>{data.excerpt}</p> )
    
  }
  
  return (
      <main>
        <div className="container mx-auto px-5">
          <h2 className="text-lg line-clamp-2 font-bold">{articleData.title}</h2>
          <Content data={articleData} />
        </div>
      </main>
  );
}
