import Header from "@/components/Header";
import { client } from "../utils/sanity/sanity.client";
import { networksDirectory } from "../utils/sanity/sanity.interface";
import { networksQuery } from "../utils/sanity/sanity.queries";

async function getData() {
  const data = await client.fetch(networksQuery);
  return data;
}

export default async function Home() {

  const data: networksDirectory[] = await getData();

  return (
    <>
      <Header />
      {data.map((network:any, index:number) => (
        <div key={index}>
          <a href={`/${network.currentSlug}`} >
            <h2 className="text-lg line-clamp-2 font-bold">{network.title}</h2>
          </a>
        </div>
      ))}
    </>
  )
}
