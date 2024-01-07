import Link from "next/link";
import { client } from "../utils/sanity/sanity.client";
import { networksDirectory } from "../utils/supabase/supabase.interface";
import { networksQuery } from "../utils/sanity/sanity.queries";
import Header from "@/components/Header";
import { GetAllNetworks } from "@/utils/supabase/supabase.queries";

async function get_networks() {
  const networks = await GetAllNetworks();
  return networks;
}

export default async function Home() {

  const networks:any = await get_networks();

  return (
    <>
      <Header title={ 'Networks' } slug={ '/' } color={null} />
      <main>
        <div className="container mx-auto px-5 pt-32">
          {networks.map((network:any, index:number) => (
            <div key={index}>
              <Link href={`/${network.slug}`} >
                <h2 className="text-lg line-clamp-2 font-bold">{network.title}</h2>
              </Link>
            </div>
          ))}
        </div>
      </main>
    </>
  )
}
