import { articleQuery } from "@/app/lib/sanity.queries";
import { client } from "../../lib/sanity.client";
import { articleFull } from "../../lib/sanity.interface";

export const revalidate = 30; // revalidate at most 30 seconds

async function getData(id: string) {
  const data = await client.fetch(articleQuery, {id});
  return data;
}

export default async function Article({
  params,
}: {
  params: { id: string };
}) {
  const data:articleFull = await getData(params.id);

  return (
    <div className="mt-8">
      <h2 className="text-lg line-clamp-2 font-bold">{data.title}</h2>
    </div>
  );
}
