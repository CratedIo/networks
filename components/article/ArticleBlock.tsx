import { ListMinus, Play, AreaChart, Zap, Shield } from "lucide-react";
import Link from "next/link";
import ArticleFormat from "./ArticleFormat";
import Date from "../utils/date";
import Image from "next/image";
import { sanityImage } from "../utils/sanityImage";
import FormatHoverCard from "./FormatHoverCard";

export default function ArticleBlock(data:{network:string, articles:any, start:number, image_skip:any, priority_image:boolean}) {

  return (
    <>
        {data.articles?.map(({title, publish_date, slug, cover_image, filters, format, premium, gated}:any, idx:number) => (
            <div key={idx} className={`div${idx + data.start} flex gap-4`}>
                {!data.image_skip.includes(idx + data.start) &&
                    <div className="relative image-container">
                        <Link href={`/${data.network}/${slug}`} className="flex group" >
                            <Image
                            src={sanityImage(cover_image) + '?w=1200'}
                            width={1200}
                            height={800}
                            alt={`Article: ${title}`}
                            priority={data.priority_image}
                            className={'shadow-small hover:shadow-medium transition-shadow duration-200 object-cover'}
                            />
                        </Link>
                    </div>
                }
                <div className="flex flex-col">
                    <div className="font-secondary-medium text-sm pb-2 flex gap-2 items-center">
                        <ArticleFormat format={format.name} />
                        {filters.map((filter: any, idx: number) => (
                            <FormatHoverCard key={idx} format={filter} />
                        ))}
                        {(premium||gated) && (
                            <>
                                <p>·</p><p><Zap strokeWidth={1} /></p>
                            </>
                        )}
                    </div>
                    <Link href={`/${data.network}/${slug}`} className="flex flex-col gap-2 group" >
                        <h3 className="text-lg font-medium font-primary-medium leading-snug group-hover:underline">{title}</h3>
                        <p className="pb-2 font-secondary-medium text-sm"><Date dateString={publish_date}/></p>
                    </Link>
                </div>
            </div>
        ))}
    </>
  )
}