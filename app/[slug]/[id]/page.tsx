import { client } from "../../lib/sanity.client";
import { networkDirectory } from "../../lib/sanity.interface";

export const revalidate = 30; // revalidate at most 30 seconds

async function getData(id: string) {
  const query = `
  *[_type == 'articles' && slug.current == '${id}'] {
    title,
    "currentSlug": slug.current,
  }[0]`;

  const data = await client.fetch(query);

  return data;
}

export default async function Network({
  params,
}: {
  params: { id: string };
}) {
  const data = await getData(params.id);

  return (
    <div className="mt-8">
      <h2 className="text-lg line-clamp-2 font-bold">{data.title}</h2>
    </div>
  );
}
