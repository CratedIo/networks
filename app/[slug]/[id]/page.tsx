import { articleQuery } from "@/utils/sanity/sanity.queries";
import { client } from "../../../utils/sanity/sanity.client";
import { articleFull } from "../../../utils/sanity/sanity.interface";
import Header from "@/components/Header";
import { getUserPremiumAccess, getUserSession } from "@/utils/supabase/supabase.user";
import { setArticleView } from "@/utils/supabase/supabase.view";
import AuthButton from "@/components/auth/AuthButton";
import { PortableText } from "@portabletext/react";
import { RichText } from "@/components/type/RichText";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Button } from "@/components/ui/button";
import { CalendarDays } from "lucide-react";
import Date from "@/components/utils/date";
import { Badge } from "@/components/ui/badge"
import { NotFound } from "@/components/error/NotFound";


export const revalidate = 30; // revalidate at most 30 seconds

async function getData(id: string) {
  const data = await client.fetch(articleQuery, {id});
  
  if(!data) {
    return false
  }
  
  return data;
}

export default async function Article({
  params,
}: {
  params: { id: string };
}) {

  const data:articleFull = await getData(params.id);
  
  if(!data) {
    return <NotFound />
  }
  
  const {title, cover_image, date, authors, categories, network } = data

  const premium = data.premium;
  const gated = data.gated;

  const { data: { session } } = await getUserSession()

  if(session){
    setArticleView(data._id, session.user.id)
  }

  if(premium && session) {
    var { data: userPremiumAccess } = await getUserPremiumAccess()
  }


  const Content = ({ data }:any) => {

    if(!premium && !gated) { return ( <PortableText value={data.content} components={RichText} /> ) }

    if(gated) {

      if(session) {
        return ( <PortableText value={data.content} components={RichText} /> )
      }
      return ( <AuthButton label={'Sign In'} url={'/signin'} /> )
    }

    if(premium) {
      if(session && userPremiumAccess?.premium_access) {
        return ( 
          <div>
            <p>You have the correct access</p>
            <PortableText value={data.content} components={RichText} />
          </div> 
        )
      } else if(session && !userPremiumAccess?.premium_access) {
        return ( <p>You do not have the correct access</p> )
      }
      return ( 
        <div>
          <p>This required premium access</p> 
          <AuthButton label={'Sign In'} url={'/signin'} />
        </div> 
      )
    }
    
    return ( <PortableText value={data.content} components={RichText} /> )
    
  }


  
  return (
      <main>
        <div className="container mx-auto px-5">
          <h2 className="text-5xl pb-8">{title}</h2>
          
          <div className="flex gap-8 items-center text-sm font-medium">
            <p><Date dateString={date}/></p>
            {authors.map((author:any, index:number) => (
            <div key={index}>
              <HoverCard>
                <HoverCardTrigger asChild>
                  <Button variant="link">{author.name}</Button>
                </HoverCardTrigger>
                <HoverCardContent className="w-80">
                  <div className="flex justify-between space-x-4">
                    <Avatar>
                      <AvatarImage src={author.profile.asset.url} />
                      <AvatarFallback>VC</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <h4 className="text-sm font-semibold">@nextjs</h4>
                      <p className="text-sm">
                        The React Framework – created and maintained by @vercel.
                      </p>
                      <div className="flex items-center pt-2">
                        <CalendarDays className="mr-2 h-4 w-4 opacity-70" />{" "}
                        <span className="text-xs text-muted-foreground">
                          Joined December 2021
                        </span>
                      </div>
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </div>
          ))}
          <div>
            {categories.map((category:any, index:number) => (
              <Badge key={index}>{category.title}</Badge>
            ))}
          </div>
          </div>
          <div>
            <AspectRatio ratio={16 / 7}>
              <Image
                fill
                alt={`Cover Image for ${title}`}
                src={cover_image.asset.url}
                priority
                className={'shadow-small hover:shadow-medium transition-shadow duration-200 rounded-md object-cover'}
              />
            </AspectRatio>
          </div>
          
          <Content data={data} />
          <div className="pt-8">
            {authors.map((author:any, index:number) => (
              <div key={index} >
                
                
                <div className="flex gap-8 items-center pb-4">
                  <Avatar>
                    <AvatarImage src={author.profile.asset.url} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <p className="text-2xl">{author.name}</p>
                </div>
                  <PortableText value={author.biography} components={RichText} />
                
              </div>
            ))}
          </div>

          {network.map((network:any, index:number) => (
            <div key={index}>
              <p>{network.title}</p>
            </div>
          ))}

        </div>
      </main>
  );
}
