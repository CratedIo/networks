"use client"

import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { PaginationProps } from "@/utils/supabase/supabase.interface";


export function PaginationControls({
  current_page,
  per_page,
  total,
  route
}: PaginationProps ) {

  const total_pages = Math.ceil(total/per_page)
  const total_pagesArray = Array.from({length: total_pages}, (x, i) => i)

  const show_pages = 3

  const show_previous = current_page > 1
  const show_previousEllipse =  total_pages > show_pages && current_page > show_pages

  const show_next = current_page < total_pages
  const show_nextEllipse =  total_pages > show_pages && current_page < total_pages-1

  if(per_page >= total) {
  return
}

  return (

    <div className="flex justify-between items-center">
      <div className="text-sm flex gap-2">
        Articles <span className="font-medium">{total.toString()}</span>
      </div>
      <Pagination className="justify-end">
        <PaginationContent>

          {show_previous && <PaginationPrevious href={`${route}?page=${current_page - 1}`} />}
          
          {show_previousEllipse && <PaginationEllipsis />}
    
          {total_pagesArray.map((page_number:any, idx:any) => page_number + 1 <= current_page + 2 && page_number + 1 >= current_page - 2 && 
            
              <PaginationLink key={idx} href={`${route}?page=${page_number + 1}`} isActive={page_number + 1 == current_page ? true : false}  >{page_number + 1}</PaginationLink>

          )}
    
          {show_nextEllipse && <PaginationEllipsis />}
    
          {show_next && <PaginationNext href={`${route}?page=${current_page + 1}`} />}
          
        </PaginationContent>
      </Pagination>
    </div>
  )
}

//    {show_nextEllipse && <PaginationEllipsis />}