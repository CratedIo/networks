'use client'
 
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from './ui/button'
 
export default function AuthButton({label, url, pathParam, variant }:any) {

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

    return (
        <Button variant={variant} asChild>
            <Link href={url + getURL()}>
                    {label}
                    <span className="sr-only">{label}</span>
            </Link>
        </Button>
        
    )

    
}