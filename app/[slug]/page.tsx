import { AspectRatio } from "@/components/ui/aspect-ratio";
import { client } from "../../utils/sanity/sanity.client";
import { networkQuery } from "../../utils/sanity/sanity.queries";
import Image from "next/image";
import Link from "next/link";
import { NotFound } from "@/components/error/NotFound";
import { PaginationControls } from "@/components/pagination/PaginationControls";
import Date from "@/components/utils/date";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import { ChevronRight, Eye, ListMinus, Mail, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import TestScroll from "@/components/Test";
import ArticleFormat from "@/components/article/ArticleFormat";
import ArticleImageIcon from "@/components/article/ArticleImageIcon";

export const revalidate = 30; // revalidate at most 30 seconds

let start = 0
let end = 3

async function getData(slug: string) {
  const data  = await client.fetch(networkQuery, {slug, start, end});
  if(!data){
    return false
  }
  return data ;
}

export default async function Network({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { page: string }
}) {
  
  const current_page = searchParams.page != undefined ? Number(searchParams.page) : 1;
  const per_page = 20

  start = (Number(current_page) -1) *Number(per_page)
  end = start + Number(per_page)

  const data = await getData(params.slug);
  if(!data) {
    return <NotFound />
  }
  const {network, articles, total} = data
  const { cover_article, featured_articles } = network

  const artwork = true;
  if(artwork) {
    var topArticles = articles.slice(0,9);
    var bottomArticles = articles.slice(9);
  }
  let hero:boolean = true
  if(searchParams.page != undefined && searchParams.page != "1") {
    hero = false
  }


  return (
    <>
      <Header title={ network.title } slug={ network.currentSlug } />
      <main>
        {hero &&
        <div className="relative">
          <AspectRatio ratio={16 / 8}>
            <Image
              fill={true}
              sizes="(max-width: 1920px) 100vw, (max-width: 1200px) 50vw, 33vw"
              alt={`Cover Image for ${cover_article.title}`}
              src={cover_article.image.asset.url + '?w=1920'}
              priority
              className={'object-cover'}
            />
          </AspectRatio>
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="flex flex-col gap-12 justify-end items-end w-full h-full">
              
              <div className="w-full px-12 flex justify-between items-end">
                <div className="text-left">
                  <h1 className="text-7xl font-medium font-primary-medium leading-tight tracking-wide max-w-lg text-balance">{ network.title }</h1>
                  <p className=" max-w-lg">{ network.overview }</p>
                </div>
                <div className="text-right max-w-2xl">
                  <div className="flex gap-2 justify-end items-end pb-4">
                    <Sparkles strokeWidth={1} />
                    <p>Spotlight article</p>
                  </div>
                  <h2 className="text-3xl font-medium font-primary-medium leading-snug pb-4 text-balance">{cover_article.title}</h2>
                  <p className="text-sm font-medium font-secondary-medium leading-snug pb-4 text-balance">{cover_article.description}</p>
                  <Button variant="outline" asChild>
                    <Link href={cover_article.url} className="flex gap-2"> 
                      <Eye strokeWidth={1} /> Read now
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="flex justify-end w-full ">
                {featured_articles.map(({title, date}=articles, idx:number) => (
                  <div key={idx} className="bg-primary text-primary-foreground p-6 max-w-[320px] flex flex-col items-start justify-between">
                    <div>
                      <div className="pb-2 flex justify-between font-secondary-medium text-sm">
                        <p><Date dateString={date}/></p>
                      </div>
                      <p className="text-md font-medium font-primary-medium leading-snug text-balance">{title}</p>
                    </div>
                    <Button variant="link" className="text-primary-foreground px-0 flex gap-4">
                      Read now <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
        </div>
      </div>
      }
        <div id="test" className="container mx-auto px-5 py-32">
          
          <div className="news_grid gap-x-10 gap-y-4 pb-16">
            {topArticles.map(({title, date, currentSlug, cover_image, categories, format}=articles, idx:number) => (
              <div key={idx} className={`div${idx+1}`}>
                <Link href={`/${params.slug}/${currentSlug}`} className="flex gap-4" >
                  {(idx+1 != 2 && idx+1 != 3 && idx+1 != 4 && idx+1 != 5 && idx+1 != 7 && idx+1 != 8 && idx+1 != 9 && idx+1 != 17 && idx+1 != 18) &&
                    <Image
                      src={cover_image.asset.url + '?w=1200'}
                      width={1200}
                      height={800}
                      alt={`Article: ${title}`}
                      className={'shadow-small hover:shadow-medium transition-shadow duration-200 object-cover'}
                    />
                  }
                  <div>
                    <div className="font-secondary-medium text-sm pb-2 flex gap-2 items-center">
                        <ArticleFormat format={format.title} />
                        {categories.map((category: any, idx: number) => (
                          <p key={idx} className="text-primary" >{category.title}</p>
                        ))}
                    </div>
                    <h3 className="text-lg font-medium font-primary-medium leading-snug">{title}</h3>
                    <div className="pt-2 flex gap-2 font-secondary-medium text-sm">
                      <p><Date dateString={date}/></p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
            <div className="div10 py-16">
              <p>Advertisement in here</p>
            </div>
            {bottomArticles.map(({title, date, currentSlug, cover_image, categories, format}=articles, idx:number) => (
              <div key={idx} className={`div${idx+11}`}>
                <Link href={`/${params.slug}/${currentSlug}`} className="flex gap-4 h-full" >
                {(idx+11 != 18 && idx+11 != 19 && idx+11 != 20 ) &&
                  <div className="relative image-container">
                    <Image
                      src={cover_image.asset.url + '?w=1200'}
                      width={1200}
                      height={800}
                      alt={`Article: ${title}`}
                      className={'shadow-small hover:shadow-medium transition-shadow duration-200 object-cover'}
                    />
                    <ArticleImageIcon format={format.title} />
                  </div>
                  }
                  <div>
                    <div className="font-secondary-medium text-sm pb-2 flex gap-2 items-center">
                        <ArticleFormat format={format.title} />
                        {categories.map((category: any, idx: number) => (
                          <p key={idx} className="text-primary" >{category.title}</p>
                        ))}
                    </div>
                    <h3 className="text-lg font-medium font-primary-medium leading-snug">{title}</h3>
                    <div className="pt-2 flex justify-between font-secondary-medium text-sm">
                      <p><Date dateString={date}/></p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>

            <PaginationControls current_page={current_page} per_page={per_page} total={total} />

        </div>
      </main>
    </>
  );
}

/*
<AspectRatio ratio={11 / 4}>
                  <Image
                    fill={true}
                    sizes="(max-width: 1200px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    alt={`Cover Image for ${title}`}
                    src={cover_image.asset.url + '?w=1200'}
                    priority
                    className={'shadow-small hover:shadow-medium transition-shadow duration-200 object-cover'}
                  />
                </AspectRatio>
                */