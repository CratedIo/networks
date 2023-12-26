'use client'
 
import Link from 'next/link'
import { usePathname } from 'next/navigation'
 
export default function LoginButton() {

    const pathname = usePathname()

    const getURL = () => {
        
        if(pathname == '/') {
            return ''
        } else {
            return `?next=${pathname.substring(1)}`
        }
    }
    return (
        <Link
        href={`/login`+ getURL()}
        className="py-2 px-3 flex rounded-md no-underline border border-slate-500 bg-btn-background hover:bg-btn-background-hover"
        >
            Login
        </Link>
    )
}