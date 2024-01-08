import { articleQuery } from "@/utils/sanity/sanity.queries";
import { client } from "../../../utils/sanity/sanity.client";
import { ArticlePageProps, articleFull } from "../../../utils/supabase/supabase.interface";
import {
  getUserPremiumAccess,
  getUserSession,
} from "@/utils/supabase/supabase.user";
import { setArticleView } from "@/utils/supabase/supabase.view";
import AuthButton from "@/components/auth/AuthButton";
import { PortableText, toPlainText } from "@portabletext/react";
import { RichText } from "@/components/type/RichText";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";
import { BookmarkPlus, CalendarDays, Heart, Linkedin, MessageCircle, Share, SmilePlus, ThumbsUp } from "lucide-react";
import Date from "@/components/utils/date";
import { AvatarComponent } from "@/components/users/AvatarComponent";
import { Metadata, ResolvedMetadata } from "next";
import { BiographyText } from "@/components/type/BiographyText";
import Link from "next/link";
import Header from "@/components/Header";
import { notFound, usePathname } from "next/navigation";
import { getOgImageUrl, getUrl } from "@/lib/utils";
import { headers } from "next/headers";
import { GetArticle, GetRelatedArticles } from "@/utils/supabase/supabase.queries";
import { sanityImage } from "@/components/utils/sanityImage";
import ArticleFormat from "@/components/article/ArticleFormat";
import FormatHoverCard from "@/components/article/FormatHoverCard";
import AccessMessage from "@/components/article/AccessMessage";


export const revalidate = 30; // revalidate at most 30 seconds

async function getArticle(params: { id: string }) {
  const id = params.id
  const article = await GetArticle(id);

  if (!article) {
    notFound;
  }
  return article;
}

async function getRelatedArticle(slug:string, id: string, filter:string) {
  const relatedArticles = await GetRelatedArticles(slug, id, filter);

  if (!relatedArticles) {
    notFound;
  }
  return relatedArticles;
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const article = await getArticle(params);

  if (!article) {
    return {};
  }

  const truncateDescription = toPlainText(article.content).slice(0, 100) + ("..." as string);

  return {
    title: article.title,
    description: truncateDescription,
  };
}


export default async function ArticlePage({ params }: ArticlePageProps ) {

  const article:any = await getArticle(params);
  if (!article) {
    notFound();
  }
  const {
    title,
    cover_image,
    publish_date,
    authors,
    filters,
    format,
    networks,
    additional_slugs,
    premium,
    gated
  } = article;

  
  let networkDetails = networks.find((o:any) => o.slug === params.slug);

  const relatedArticles:any = await getRelatedArticle(params.slug, params.id, filters[0].slug )
  if (!relatedArticles) {
    notFound();
  }
  const {
    data: { session },
  } = await getUserSession();

  if (session) {
    setArticleView(article._id, session.user.id);
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
      return (
          <AccessMessage />
      );
    }

    if (premium) {
      if (session && userPremiumAccess?.premium_access) {
        return (
            <PortableText value={data.content} components={RichText} />
        );
      } else if (session && !userPremiumAccess?.premium_access) {
        return <p>You do not have the correct access</p>;
      }
      return (
        <AccessMessage />
      );
    }

    return <PortableText value={data.content} components={RichText} />;
  };
  
  const readingTime = (text:any) => {
    text = toPlainText(text)
    const wpm = 250;
    const words = text.trim().split(/\s+/).length;
    const time = Math.ceil(words / wpm);
    return <p className="text-sm">{time} min read</p>
  }

  console.log(params)

  return (
    <>
      <Header title={ networkDetails.title } slug={ networkDetails.slug } color={null} />
      <main>
        <div className="container mx-auto px-5 pt-32">
          <h2 className="text-5xl pb-8 font-primary-medium max-w-4xl">{title}</h2>
          <p className="font-normal text-sm">
            <Date dateString={publish_date} />
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
                            image={author.profile_image}
                            name={author.name}
                          />
                          <div className="space-y-1">
                            <h4 className="text-sm font-semibold">{author.name}</h4>
                            <p className="text-sm">
                              {toPlainText(author.biography).slice(0, 100) + ("..." as string)}
                            </p>
                            <div className="flex items-center pt-2">
                              <Link href={author.linkedin} target="_blank" >
                                <Linkedin className="mr-2 h-4 w-4 opacity-70" />{" "}
                              </Link>
                            </div>
                          </div>
                        </div>
                      </HoverCardContent>
                    </HoverCard>
                  </div>
                ))}
            </div>
            <div>
              {filters.map((filter: any, idx: number) => (
                <FormatHoverCard key={idx} format={filter} />
              ))}
            </div>
          </div>
          
      
            <AspectRatio ratio={16 / 7}>
              <Image
                fill
                alt={`Cover Image for ${title}`}
                src={sanityImage(cover_image) + '?w=1920'}
                priority
                className={
                  "shadow-small hover:shadow-medium transition-shadow duration-200 object-cover"
                }
              />
            </AspectRatio>
            <div className="div10 py-10 border flex justify-center border-dotted rounded-md my-2 advert">
              <p>Advertisement Area</p>
            </div>
      
          <div className="pb-32 pt-16 mx-auto max-w-3xl">
            
            <div className="flex justify-start gap-4 pb-16 items-center">
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
                <>{readingTime(article.content)}</>
            </div>
      
            <div className="main-contant">
              <Content data={article} />
            </div>
      
            <div className="pt-16 pb-8 border-b">
              <p>Written by</p>
              <div className="pt-4">
                {authors.map((author: any, idx: number) => (
                  <div key={idx}>
                    <div className="flex gap-4 items-center pb-4">
                      <AvatarComponent
                        image={author.profile_image}
                        name={author.name}
                      />
                      <p className="text-2xl">{author.name}</p>
                    </div>
                    <PortableText value={author.biography} components={BiographyText} />
                  </div>
                ))}
              </div>
            </div>
            <div className="div10 py-24 border flex justify-center border-dotted rounded-md my-6 advert">
              <p>Advertisement Area</p>
            </div>
      
              <div>
                {authors.map((author: any, idx: number) => author.articles.length > 0 && (
                  <div key={idx} className="pt-8 pb-8 border-b" >
                    <p className="text-2xl pb-16">More from {author.name}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                      {author.articles.map(({title, slug, cover_image, format, filters, publish_date}:any, idx:any) => (
                        <div key={idx}>
                          <Link href={slug}>
                            <AspectRatio ratio={16 / 7}>
                              <Image
                                fill
                                alt={`${title}`}
                                src={sanityImage(cover_image) + '?w=800'}
                                priority
                                className={
                                  "shadow-small hover:shadow-medium transition-shadow duration-200 object-cover"
                                }
                              />
                            </AspectRatio>
                          </Link>
                          <div className="font-secondary-medium text-sm py-2 flex gap-2 items-center">
                              <ArticleFormat format={format.name} />
                              {filters.map((filter: any, idx: number) => (
                                <Link key={idx} href={`/${params.slug}/tag/${filter.slug}`} className="text-primary hover:underline" >{filter.name}</Link>
                              ))}
                          </div>
                          <Link href={slug}>
                            <h4 className="text-xl font-medium font-primary-medium leading-snug text-balance hover:underline">{title}</h4>
                            <p className="pt-2 flex gap-2 font-secondary-medium text-sm"><Date dateString={publish_date}/></p>
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            <>
              {relatedArticles.length > 0 &&
                <div className="pt-8 pb-8 border-b">
                    <p className="text-2xl pb-16">Related content</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                      {relatedArticles.map(({title, slug, cover_image, format, filters, publish_date}:any, idx:any) => (
                        <div key={idx}>
                          <div className="font-secondary-medium text-sm py-2 flex gap-2 items-center">
                            <ArticleFormat format={format.name} />
                            {filters.map((filter: any, idx: number) => (
                              <Link key={idx} href={`/${params.slug}/tag/${filter.slug}`} className="text-primary hover:underline" >{filter.name}</Link>
                            ))}
                          </div>
                          <Link href={slug}>
                            <h4 className="text-xl font-medium font-primary-medium leading-snug text-balance hover:underline">{title}</h4>
                            <p className="pt-2 flex gap-2 font-secondary-medium text-sm"><Date dateString={publish_date}/></p>
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                }
            </>
      
          </div>
        </div>
      </main>
    </>
  );
}
