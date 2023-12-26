'use client'
 
import Link from 'next/link'
import { usePathname } from 'next/navigation'
 
export default function AuthButton({label, url, pathParam, style }:any) {

    const userPath = pathParam
    const pathname = usePathname()

    const getURL = () => {
        
        if(pathname == '/') {
            return ''
        } else if(userPath) {
            return `?next=${userPath}`
        }
        return `?next=${pathname.substring(1)}`
    }

    switch(style) {
        case 2:
            return (
                <Link
                href={url + getURL()}
                className="py-2 px-3 flex justify-center rounded-md no-underline text-center bg-neutral-600/65 hover:bg-neutral-600/85"
                >
                    {label}
                </Link>
            )
            break;
        case 1:
            return (
                <Link
                href={url + getURL()}
                className="py-2 px-3 flex justify-center rounded-md no-underline text-center bg-neutral-900/65 hover:bg-neutral-900/85"
                >
                    {label}
                </Link>
            )
            break;
        default:
            return (
                <Link
                href={url + getURL()}
                className="hover:underline"
                >
                    {label}
                </Link>
            )
      }

    
}