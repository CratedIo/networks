import { PaginationControls } from "@/components/pagination/PaginationControls";
import Header from "@/components/Header";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { notFound } from "next/navigation";
import { TagPageProps } from "@/utils/supabase/supabase.interface";
import { GetAllArticlesByTags, GetNetwork } from "@/utils/supabase/supabase.queries";
import ArticleBlock from "@/components/article/ArticleBlock";

export const revalidate = 0; // revalidate at most 30 seconds

let start:number;
let end:number;

async function getAllArticlesByTags({ slug, id }: any) {
  const networkData = await GetNetwork(slug);
  const articleData = await GetAllArticlesByTags(slug, id, start, end);
  if (!articleData) {
    notFound;
  }
  return {networkData, articleData};
}

export default async function TagPage({
  params,
  searchParams,
}: TagPageProps ) {

  const route = '/' + params.slug + '/tag/' + params.id

  const current_page = searchParams.page != undefined ? Number(searchParams.page) : 1;
  const per_page = 20

  start = (Number(current_page) -1) *Number(per_page)
  end = start + Number(per_page) -1
 
  const data = await getAllArticlesByTags(params);

  const {networkData, articleData} = data

  if (!networkData || !articleData.data || !articleData.count ) {
    return notFound();
  }

  const network = networkData;
  const articles = articleData.data;
  const count = articleData.count;

  const advert:boolean = true;
  
  const topArticles = articles.slice(0,9);
  const bottomArticles = articles.slice(9);

  const tagDetails = articles[0].filters.find((o:any) => o.slug === params.id);


  return (
    <>
      <Header title={ network.title } slug={ network.slug } color={null} />

      <main>
        <div className="container mx-auto px-5 py-32">
          <div className="border-b pb-16">
            <h1 className="text-7xl font-medium leading-tight tracking-wide max-w-lg text-balance">{tagDetails?.name}</h1>
            <p>{count} articles</p>
            <p className="pt-2 pb-8">{tagDetails?.description}</p>
            
            <Button variant="outline">
              <Plus className="mr-2 h-4 w-4" /> Follow
            </Button>
          </div>
          <div className="article_grid gap-x-10 gap-y-4 pb-16 pt-16">
            <ArticleBlock network={'climate'} articles={topArticles} start={1} image_skip={[2,3,4,5,7,8,9]} priority_image={true} />
            {advert &&
              <div className="div10 py-24 border flex justify-center border-dotted rounded-md my-6 advert">
                <p>Advertisement Area</p>
              </div>
            }
            <ArticleBlock network={'climate'} articles={bottomArticles} start={11} image_skip={[2,3,4,5,7,8,9]} priority_image={true} />
          </div>
          <PaginationControls 
            current_page={current_page} 
            per_page={per_page} 
            total={count} 
            route={route}
            />
        </div>
      </main>
    </>
  );
}
