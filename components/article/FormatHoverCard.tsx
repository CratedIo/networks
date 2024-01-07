"use client"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../ui/hover-card";
import Link from "next/link";
import { usePathname } from 'next/navigation'


export default function FormatHoverCard({format}:any) {

  const pathname = usePathname()
  let path:string = pathname.split('/')[1]

  const {name, slug, description} = format;
  
  if(!description){
    return (
    <Link href={'/'+path+'/tag/'+slug} className="px-0 font-medium text-md text-primary hover:underline">{name}</Link>
    )
  }
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Link href={'/'+path+'/tag/'+slug} className="px-0 font-medium text-md text-primary hover:underline">{name}</Link>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex justify-between space-x-4">
          <div className="space-y-1">
            <p className="text-sm">{description}</p>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
  
}
