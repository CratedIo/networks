import { client } from "./lib/sanity.client";
import { networkDirectory } from "./lib/sanity.interface";

async function getData() {
  const query = `
  *[_type == 'networks'] | order(_createdAt desc) {
    title,
    "currentSlug": slug.current,
  }`;

  const data = await client.fetch(query);

  return data;
}

export default async function Home() {
  
  const data: networkDirectory[] = await getData();

  return (
    <div>
      {data.map((network, index) => (
        <div key={index}>
          <a href={`/${network.currentSlug}`} >
            <h2 className="text-lg line-clamp-2 font-bold">{network.title}</h2>
          </a>
        </div>
      ))}
    </div>
  )
}
