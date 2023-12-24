import { client } from "./lib/sanity.client";
import { networksDirectory } from "./lib/sanity.interface";
import { networksQuery } from "./lib/sanity.queries";

async function getData() {
  const data = await client.fetch(networksQuery);
  return data;
}

export default async function Home() {
  
  const data: networksDirectory[] = await getData();

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
