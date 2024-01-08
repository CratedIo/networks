import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import Link from "next/link";
import { PaginationControls } from "@/components/pagination/PaginationControls";
import Date from "@/components/utils/date";
import Header from "@/components/Header";
import { ChevronRight, Eye, Flame, ListMinus, Mail, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import ArticleFormat from "@/components/article/ArticleFormat";
import ArticleImageIcon from "@/components/article/ArticleImageIcon";
import { notFound } from "next/navigation";
import { NetworkPageProps } from "@/utils/supabase/supabase.interface";
import { Metadata } from "next";
import { toPlainText } from "@portabletext/react";
import { GetAllArticles, GetNetwork } from "@/utils/supabase/supabase.queries";
import { sanityImage } from "@/components/utils/sanityImage";
import FeaturedArticles from "@/components/featured/FeaturedArticles";
import ArticleBlock from "@/components/article/ArticleBlock";

export const revalidate = 0; // revalidate at most 30 seconds

let start:number;
let end:number;

async function getNetwork(params: { slug: string }) {
  const slug = params.slug
  //const data  = await client.fetch(networkQuery, {slug, start, end});
  
  const network = await GetNetwork(slug);
  const articleData = await GetAllArticles(slug, start, end);
  if (!network) {
    notFound;
  }
  return {network, articleData};
}

export async function generateMetadata({
  params,
}: NetworkPageProps ): Promise<Metadata> {
  const data = await getNetwork(params);

  if (!data) {
    return {};
  }
  const { network } = data

  const truncateDescription = toPlainText(network?.overview).slice(0, 100) + ("..." as string);

  return {
    title: network?.title,
    description: truncateDescription,
  };
}

export default async function NetworkPage({
  params,
  searchParams,
}: NetworkPageProps ) {
  
  const route = '/' + params.slug
  
  const current_page = searchParams.page != undefined ? Number(searchParams.page) : 1;
  const per_page = 20

  start = (Number(current_page) -1) *Number(per_page)
  end = start + Number(per_page) -1

  const data = await getNetwork(params);

  if (!data.network || !data.articleData.data || !data.articleData.count) {
    notFound();
  }
  const { network, articleData } = data
  const articles = data.articleData.data
  const count = data.articleData.count

  const featured_articles = [network.featured_0, network.featured_1, network.featured_2, network.featured_3, network.featured_4].filter(function (el) {
    return el != null;
  });
  
  const advert:boolean = true;
  const topArticles = articles.slice(0,9);
  const bottomArticles = articles.slice(9);

  let hero:boolean = true
  if(searchParams.page != undefined && searchParams.page != "1") {
    hero = false
  }

  return (
    <>
      <Header title={ network.title } slug={ network.slug } color={network.cover_article.color} />
      <main>
        {hero &&
            <div className="relative isolate w-full min-h-screen flex items-end">
              <div className="absolute w-full h-full -z-10 transform-gpu overflow-hidden " aria-hidden="true">
                <Image
                  fill={true}
                  alt={`Cover Image for ${network.cover_article.title}`}
                  src={sanityImage(network.cover_article.image) + '?w=1920'}
                  priority
                  className={'object-cover animate-blur scale-105'}
                />
              </div>

              <div className="w-full flex flex-col items-end">
                <div className="w-full pt-32 pb-16 px-8 flex justify-between md:items-end flex-col md:flex-row gap-12">
                    <div className={`text-left ${network.cover_article.color}`}>
                      <h1 className="text-7xl font-medium font-primary-medium leading-tight tracking-wide max-w-lg text-balance">{ network.title }</h1>
                      <p className=" max-w-lg">{ network.overview }</p>
                    </div>
                    <div className="text-right max-w-2xl">
                      <div className={`${network.cover_article.color}`}>
                        <div className="flex gap-2 justify-end items-end pb-4">
                          <Sparkles strokeWidth={1} />
                          <p>Spotlight article</p>
                        </div>
                        <h2 className="text-3xl font-medium font-primary-medium leading-snug pb-4 text-balance">{network.cover_article.title}</h2>
                        <p className="text-sm font-medium font-secondary-medium leading-snug pb-4 text-balance">{network.cover_article.description}</p>
                      </div>
                      <Button variant="outline" asChild>
                        <Link href={network.cover_article.url} className="flex gap-2"> 
                          <Eye strokeWidth={1} /> Read now
                        </Link>
                      </Button>
                    </div>
                  </div>
                  <FeaturedArticles featured={featured_articles} params={params} />
              </div>


          </div>
        }
        <div className="container mx-auto px-5 pt-16 pb-32">
          <div className="pb-16 flex gap-2 items-center">
            <Flame strokeWidth={1} /><p className="font-secondary-medium text-lg">Trending topics: <strong>Decarbonization</strong> | <strong>Climate Risk</strong> ...</p>
          </div>
          <div className="article_grid gap-x-10 gap-y-4 pb-16">
            <ArticleBlock network={'climate'} articles={topArticles} start={1} image_skip={[2,3,4,5,7,8,9]} priority_image={true} />
            {advert &&
              <div className="div10 py-24 border flex justify-center border-dotted rounded-md my-6 advert">
              <p>Advertisement Area</p>
            </div>
            }
            <ArticleBlock network={'climate'} articles={bottomArticles} start={11} image_skip={[18,19,20]} priority_image={false} />

          </div>

            <PaginationControls 
            current_page={current_page} 
            per_page={per_page} 
            total={count}
            route={route}
            />

        </div>
      </main>
    </>
  );
}
