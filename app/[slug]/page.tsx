import { client } from "../lib/sanity.client";
import { networkDirectory } from "../lib/sanity.interface";

export const revalidate = 30; // revalidate at most 30 seconds

async function getData(slug: string) {

  const networkQuery = `*[_type == 'networks' && slug.current == 'climate'][0]`
  const articleQuery = `
  *[_type == 'articles' && networks->slug.current == '${slug}'] | order(date desc) {
    title,
    "currentSlug": slug.current,
  }`;

  const query = `{ "network": ${networkQuery}, "articles": ${articleQuery} }`


  const  { network, articles }  = await client.fetch(query);

  return { network, articles };
}

export default async function Network({
  params,
}: {
  params: { slug: string };
}) {
  const data = await getData(params.slug);

  return (
    <div className="mt-8">
      {data.articles.map((article:any, index:number) => (
        <div key={index}>
          <a href={`/${params.slug}/${article.currentSlug}`} >
            <h2 className="text-lg line-clamp-2 font-bold">{article.title}</h2>
          </a>
        </div>
      ))}
    </div>
  );
}
