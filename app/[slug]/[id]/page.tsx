import { articleQuery } from "@/utils/sanity/sanity.queries";
import { client } from "../../../utils/sanity/sanity.client";
import { articleFull } from "../../../utils/sanity/sanity.interface";
import Head from "next/head";
import {
  getUserPremiumAccess,
  getUserSession,
} from "@/utils/supabase/supabase.user";
import { setArticleView } from "@/utils/supabase/supabase.view";
import AuthButton from "@/components/auth/AuthButton";
import { PortableText } from "@portabletext/react";
import { RichText } from "@/components/type/RichText";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";
import { BookmarkPlus, CalendarDays, Heart, MessageCircle, Share, SmilePlus, ThumbsUp } from "lucide-react";
import Date from "@/components/utils/date";
import { Badge } from "@/components/ui/badge";
import { NotFound } from "@/components/error/NotFound";
import { AvatarComponent } from "@/components/users/AvatarComponent";
import { Metadata, ResolvedMetadata } from "next";
import { BiographyText } from "@/components/type/BiographyText";
import Link from "next/link";
import Header from "@/components/Header";

export const revalidate = 30; // revalidate at most 30 seconds

type Props = {
  params: { id: string }
}

async function getData(id: string) {
  const data = await client.fetch(articleQuery, { id });
  if (!data) {
    return false;
  }
  return data;
}

/*
export async function generateMetadata(
  { params }: Props,
  parent: ResolvedMetadata
): Promise<Metadata> {
  const data = await getData(params.id);
  const previousImages = (await parent).openGraph?.images || [];
  const { title, cover_image, date, authors } = data;

  return {
    title: title,
    openGraph: {
      images: [cover_image.asset.url, ...previousImages],
    },
  };
}

*/

export default async function Article({ params }: Props ) {

  const data: articleFull = await getData(params.id);

  if (!data) {
    return <NotFound />;
  }

  const {
    title,
    cover_image,
    date,
    authors,
    categories,
    format,
    network,
    additional_slugs,
  } = data;

  const premium = data.premium;
  const gated = data.gated;

  const {
    data: { session },
  } = await getUserSession();

  if (session) {
    setArticleView(data._id, session.user.id);
  }

  if (premium && session) {
    var { data: userPremiumAccess } = await getUserPremiumAccess();
  }

  const Content = ({ data }: any) => {
    if (!premium && !gated) {
      return <PortableText value={data.content} components={RichText} />;
    }

    if (gated) {
      if (session) {
        return <PortableText value={data.content} components={RichText} />;
      }
      return <AuthButton label={"Sign In"} url={"/signin"} />;
    }

    if (premium) {
      if (session && userPremiumAccess?.premium_access) {
        return (
          <div>
            <p>You have the correct access</p>
            <PortableText value={data.content} components={RichText} />
          </div>
        );
      } else if (session && !userPremiumAccess?.premium_access) {
        return <p>You do not have the correct access</p>;
      }
      return (
        <div>
          <p>This required premium access</p>
          <AuthButton label={"Sign In"} url={"/signin"} />
        </div>
      );
    }

    return <PortableText value={data.content} components={RichText} />;
  };


  return (
    <main>
      <Header title={ 'Climate Innovation Network' } slug={ '/climate' } />
      <div className="container mx-auto px-5 pt-32">
        <h2 className="text-5xl pb-8 font-primary-medium max-w-4xl">{title}</h2>
        <p className="font-normal text-sm">
          <Date dateString={date} />
        </p>
        <div className="flex gap-8 items-center justify-between text-md">
          <div className="flex items-center gap-2">
            <p className="font-normal">Written by </p>
              {authors.map((author: any, index: number) => (
                <div key={index}>
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <Button variant="link" className="px-0 font-medium text-md">{author.name}</Button>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80">
                      <div className="flex justify-between space-x-4">
                        <AvatarComponent
                          image={author.profile.asset.url}
                          name={author.name}
                        />
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
          </div>
          <div>
            {categories.map((category: any, index: number) => (
              <p key={index}>{category.title}</p>
            ))}
          </div>
        </div>
        

          <AspectRatio ratio={16 / 7}>
            <Image
              fill
              alt={`Cover Image for ${title}`}
              src={cover_image.asset.url}
              priority
              className={
                "shadow-small hover:shadow-medium transition-shadow duration-200 object-cover"
              }
            />
          </AspectRatio>

        <div className="pb-32 pt-16 mx-auto max-w-3xl">
          
          <div className="flex justify-end gap-4 pb-16">
            {!session ?
            <>
              <Link href={'/signin'} >
                <SmilePlus strokeWidth={1} />
              </Link>
              <Link href={'/signin'} >
                <MessageCircle strokeWidth={1} />
              </Link>
              <Link href={'/signin'} >
                <BookmarkPlus strokeWidth={1} />
              </Link>
              <Link href={'/signin'} >
                <Share strokeWidth={1} />
              </Link>
            </>
            :
            <>
              <Link href={'/'} >
                <SmilePlus strokeWidth={1} />
              </Link>
              <Link href={'/'} >
                <MessageCircle strokeWidth={1} />
              </Link>
              <Link href={'/'} >
                <BookmarkPlus strokeWidth={1} />
              </Link>
              <Link href={'/'} >
                <Share strokeWidth={1} />
              </Link>
            </>
            }

          </div>

          <div className="main-contant">
            <Content data={data} />
          </div>

          <div className="pt-16 pb-8 border-b">
            <p>Written by</p>
            <div className="pt-4">
              {authors.map((author: any, idx: number) => (
                <div key={idx}>
                  <div className="flex gap-4 items-center pb-4">
                    <AvatarComponent
                      image={author.profile.asset.url}
                      name={author.name}
                    />
                    <p className="text-2xl">{author.name}</p>
                  </div>
                  <PortableText value={author.biography} components={BiographyText} />
                </div>
              ))}
            </div>
          </div>

          {authors.length <= 1 &&
            <div className="pt-8 pb-8 border-b">
              {authors.map((author: any, idx: number) => (
                <p key={idx} className="text-2xl">More from {author.name}</p>
              ))}
            </div>
          }

        </div>
      </div>
    </main>
  );
}
