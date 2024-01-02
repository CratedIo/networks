import Link from "next/link"

export const BiographyText = {
      block: {
        normal: ({children}:any) => <p className="leading-loose text-sm pb-4 font-secondary-medium">{children}</p>,
      },
      marks: {
        link: ({children, value}:any) => {
          const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined
          return (
            <Link href={value.href} rel={rel} className="text-primary">
              {children}
            </Link>
          )
        },
      }
  }