import { client } from "../../utils/sanity/sanity.client";
import { networkFull } from "../../utils/sanity/sanity.interface";
import { articlesQuery, networkQuery } from "../../utils/sanity/sanity.queries";
import Header from "@/components/Header";

export const revalidate = 30; // revalidate at most 30 seconds

async function getData(slug: string) {
  const query = `{ "network": ${networkQuery}, "articles": ${articlesQuery} }`
  const  { network, articles }  = await client.fetch(query, {slug});
  return { network, articles };
}

export default async function Network({
  params,
}: {
  params: { slug: string };
}) {
  const data:networkFull = await getData(params.slug);

  return (
    <>
    
    <Header />
      <div className="mt-8">
        <h1>{data.network?.title}</h1>
        {data.articles.map((article:any, index:number) => (
          <div key={index}>
            <a href={`/${params.slug}/${article.currentSlug}`} >
              <h2 className="text-lg line-clamp-2 font-bold">{article.title}</h2>
            </a>
          </div>
        ))}
      </div>
    </>
  );
}
