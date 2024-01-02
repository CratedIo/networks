import Link from "next/link";
import { client } from "../utils/sanity/sanity.client";
import { networksDirectory } from "../utils/sanity/sanity.interface";
import { networksQuery } from "../utils/sanity/sanity.queries";
import Header from "@/components/Header";

async function getData() {
  const data = await client.fetch(networksQuery);
  return data;
}

export default async function Home() {

  const data: networksDirectory[] = await getData();

  return (
    <>
      <Header title={ 'Networks' } slug={ '/' } />
      <main>
        <div className="container mx-auto px-5 pt-32">
          {data.map((network:any, index:number) => (
            <div key={index}>
              <Link href={`/${network.currentSlug}`} >
                <h2 className="text-lg line-clamp-2 font-bold">{network.title}</h2>
              </Link>
            </div>
          ))}
        </div>
      </main>
    </>
  )
}
