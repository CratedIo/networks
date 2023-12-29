'use client'
 
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '../ui/button'
 
export default function AuthButton({label, url, pathParam, variant }:any) {

    const excludedPaths = ['/', '/signup', '/signin', '/signout']
    const pathname = usePathname()

    const getURL = () => {
        
        if(!excludedPaths.includes(pathname)) {
            return `?next=${pathname.substring(1)}`
        } 
        if(pathParam) {
            return `?next=${pathParam}`
        }
        return ''
    }

    return (
        <Button variant={variant} asChild>
            <Link href={url + getURL()}>
                    {label}
                    <span className="sr-only">{label}</span>
            </Link>
        </Button>
        
    )

    
}