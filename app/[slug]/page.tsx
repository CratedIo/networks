import { AspectRatio } from "@/components/ui/aspect-ratio";
import { client } from "../../utils/sanity/sanity.client";
import { networkQuery } from "../../utils/sanity/sanity.queries";
import Image from "next/image";
import Link from "next/link";
import { NotFound } from "@/components/error/NotFound";
import { PaginationControls } from "@/components/pagination/PaginationControls";
import Date from "@/components/utils/date";
import { Badge } from "@/components/ui/badge";

export const revalidate = 30; // revalidate at most 30 seconds

let start = 0
let end = 3

async function getData(slug: string) {

  const data  = await client.fetch(networkQuery, {slug, start, end});
  if(!data){
    return false
  }

  console.log(data.network.cover_article)

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

  const artwork = true;

  if(artwork) {
    var topArticles = articles.slice(0,9);
    var bottomArticles = articles.slice(9);
  }

  console.log(topArticles)
  console.log(bottomArticles)


  return (
    <main>
    <div className="relative">
      
        <AspectRatio ratio={16 / 6}>
          <Image
            fill={true}
            sizes="(max-width: 1920px) 100vw, (max-width: 1200px) 50vw, 33vw"
            alt={`Cover Image for ${network.cover_article.title}`}
            src={network.cover_article.image.asset.url + '?w=1920'}
            priority
            className={'object-cover'}
          />
        </AspectRatio>
        <div className="absolute bottom-0">
        <h1 className="text-6xl pb-8">{network?.title}</h1>
      </div>
    </div>
      <div className="container mx-auto px-5 py-32">
        
        <div className="news_grid gap-x-10 gap-y-4 pb-16">
          {topArticles.map(({title, date, currentSlug, cover_image, categories}=articles, idx:number) => (
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
                  <div className="opacity-40 hover:opacity-100 transition-opacity font-secondary-medium text-sm pb-2">
                      {categories.map((category: any, idx: number) => (
                        <p key={idx} className="text-primary" >{category.title}</p>
                      ))}
                  </div>
                  <h3 className="text-lg font-medium font-primary-medium leading-snug">{title}</h3>
                  <div className="pt-2 flex justify-between opacity-40 font-secondary-medium text-sm">
                    <p><Date dateString={date}/></p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
          <div className="div10 py-32">
            <p>Advertisement in here</p>
          </div>
          {bottomArticles.map(({title, date, currentSlug, cover_image, categories}=articles, idx:number) => (
            <div key={idx} className={`div${idx+11}`}>
              <Link href={`/${params.slug}/${currentSlug}`} className="flex gap-4" >
              {(idx+11 != 18 && idx+11 != 19 && idx+11 != 20 ) &&
                <Image
                  src={cover_image.asset.url + '?w=1200'}
                  width={1200}
                  height={800}
                  alt={`Article: ${title}`}
                  className={'shadow-small hover:shadow-medium transition-shadow duration-200 object-cover'}
                />
                }
                <div>
                  <div className="opacity-40 hover:opacity-100 transition-opacity font-secondary-medium text-sm pb-2">
                      {categories.map((category: any, idx: number) => (
                        <p key={idx} className="text-primary" >{category.title}</p>
                      ))}
                  </div>
                  <h3 className="text-lg font-medium font-primary-medium leading-snug">{title}</h3>
                  <div className="pt-2 flex justify-between opacity-40 font-secondary-medium text-sm">
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