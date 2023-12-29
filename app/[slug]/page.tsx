import { AspectRatio } from "@/components/ui/aspect-ratio";
import { client } from "../../utils/sanity/sanity.client";
import { networkFull } from "../../utils/sanity/sanity.interface";
import { articlesQuery, networkQuery } from "../../utils/sanity/sanity.queries";
import Image from "next/image";
import Link from "next/link";
import { NotFound } from "@/components/error/NotFound";

export const revalidate = 30; // revalidate at most 30 seconds

async function getData(slug: string) {
  const query = `{ "network": ${networkQuery}, "articles": ${articlesQuery} }`
  const  { network, articles }  = await client.fetch(query, {slug});
  if(!network || !articles){
    return false
  }
  return { network, articles };
}

export default async function Network({
  params,
}: {
  params: { slug: string };
}) {
  const data:networkFull | boolean = await getData(params.slug);

  if(!data) {
    return <NotFound />
  }

  const {network, articles} = data

  return (
    <main>
      <div className="container mx-auto px-5">
        <h1 className="text-6xl pb-8">{network?.title}</h1>
        <div className="grid grid-cols-3 gap-8">
          {articles.map((article:any, index:number) => (
            <div key={index}>
              <Link href={`/${params.slug}/${article.currentSlug}`} >
                <AspectRatio ratio={11 / 7}>
                  <Image
                    fill
                    alt={`Cover Image for ${article.title}`}
                    src={article.cover_image.asset.url + '?w=600'}
                    priority
                    className={'shadow-small hover:shadow-medium transition-shadow duration-200 rounded-md object-cover'}
                  />
                </AspectRatio>
                <h2 className="text-lg pt-4 font-medium">{article.title}</h2>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
