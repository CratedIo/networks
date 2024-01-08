import { ListMinus, Play, AreaChart, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import ArticleFormat from "../article/ArticleFormat";
import Date from "../utils/date";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export default function FeaturedArticles({featured, params}:any) {

      if(featured.length > 3){
            return (
              <Carousel
                opts={{
                  align: "start",
                }}
                className="w-full max-w-3xl md:flex flex-col items-end"
              >
                <div className="flex gap-4 px-8 pb-4 items-center">
                  <p>Trending articles</p>
                  <CarouselPrevious />
                  <CarouselNext />
                </div>
                <CarouselContent className="bg-primary">
                  {featured.map(
                    (
                      { title, publish_date, slug, format }: any,
                      idx: number
                    ) => (
                      <CarouselItem key={idx} className="sm:basis-1/2 lg:basis-1/3 bg-primary" >
                        <div className="bg-primary text-black p-6 pb-2 h-full flex flex-col items-start justify-between">
                          <div>
                            <div className="flex gap-2 items-center font-secondary-medium text-sm">
                              <ArticleFormat format={format.name} />
                              <p>
                                <Date dateString={publish_date} />
                              </p>
                            </div>
                            <Link href={`/${params.slug}/${slug}`}>
                              <p className="text-md font-medium font-primary-medium leading-snug text-balance">
                                {title}
                              </p>
                            </Link>
                          </div>
                          <Button
                            variant="link"
                            asChild
                            className="text-black px-0 flex gap-4"
                          >
                            <Link href={`/${params.slug}/${slug}`}>
                              Read now <ChevronRight className="h-4 w-4" />
                            </Link>
                          </Button>
                        </div>
                      </CarouselItem>
                    )
                  )}
                </CarouselContent>
              </Carousel>
            );
      }

      return (
      <div className="flex justify-end w-full">
            {featured.map(({title, publish_date, slug, format}:any, idx:number) => (

                  <div key={idx} className="bg-primary text-primary-foreground p-6 max-w-[300px] flex flex-col items-start justify-between">
                        <div>
                              <div className="pb-2 flex gap-2 items-center font-secondary-medium text-sm">
                                    <ArticleFormat format={format.name} />
                                    <p><Date dateString={publish_date}/></p>
                              </div>
                              <Link href={`/${params.slug}/${slug}`}>
                                    <p className="text-md font-medium font-primary-medium leading-snug text-balance">{title}</p>
                              </Link>
                        </div>
                        <Button variant="link" asChild className="text-primary-foreground px-0 flex gap-4">
                              <Link href={`/${params.slug}/${slug}`}>
                                    Read now <ChevronRight className="h-4 w-4" />
                              </Link>
                        </Button>
                  </div>
                  
            ))}
            
      </div>
      )
}
