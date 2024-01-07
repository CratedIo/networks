import { ArrowUpRightIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { client } from "../../utils/sanity/sanity.client"
import imageUrlBuilder from '@sanity/image-url'

const builder = imageUrlBuilder(client)

function urlFor(source:any) {
  return builder.image(source)
}

const PodcastComponent = ({value, isInline}:any) => {
  const { url } = value
    return (
      <iframe height="186" width="100%"  scrolling="no" data-name="pb-iframe-player" src={url} loading="lazy"></iframe>
    )
}
const VideoComponent = ({value, isInline}:any) => {
  const { url } = value
    return (
      <div className="pt-[56.25%] pr-0 pb-0 pl-0 relative">
        <iframe height="100%" width="100%" src={url} frameBorder="0" allow="autoplay; fullscreen; picture-in-picture" className="absolute top-0 left-0 w-full h-full"></iframe>
      </div>
    )
}

const ImageComponent = ({value, isInline}:any) => {
  const { link, asset } = value
  
  const ArticleImage = () => {
      return (
          <Image 
          width={1000}
          height={1000}
          priority
          alt=""
          src={urlFor(asset).width(1000).url()} />
      )
  }
  return link ?
  <div className="pb-8" >
      <a href={`${value.link}`} aria-label="">
          <ArticleImage />
      </a>
  </div> 
  : 
  <div className="pb-8">
      <ArticleImage />
  </div>
}

export const RichText = {
      block: {
        h1: ({children}:any) => <h1 className="text-5xl pb-4 block-text">{children}</h1>,
        h2: ({children}:any) => <h2 className="text-4xl pb-4 block-text">{children}</h2>,
        h3: ({children}:any) => <h3 className="text-3xl pb-4 block-text">{children}</h3>,
        h4: ({children}:any) => <h4 className="text-2xl pb-4 block-text">{children}</h4>,
        h5: ({children}:any) => <h5 className="text-xl pb-4 block-text">{children}</h5>,
        h6: ({children}:any) => <h6 className="py-10">{children}</h6>,
        normal: ({children}:any) => <p className="leading-loose text-lg pb-4 font-secondary-medium">{children}</p>,
        blockquote: ({children}:any) => <blockquote className="leading-tight text-5xl pb-4 block-text ">{children}</blockquote>,
      },
      list: {
        bullet: ({children}:any) => <ul className="pl-6 list-disc leading-loose text-lg font-secondary-medium">{children}</ul>,
        number: ({children}:any) => <ol className="pl-6 list-decimal leading-loose text-lg font-secondary-medium">{children}</ol>,
      },
      marks: {
        em: ({children}:any) => <em className="">{children}</em>,
        strong: ({children}:any) => <strong className="font-semibold">{children}</strong>,
        link: ({children, value}:any) => {
          const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined
          return (
            <Link href={value.href} rel={rel} className="text-primary">
              {children}
            </Link>
          )
        },
        pullOutLink: ({value, children}:any) => {
          const { blank, href } = value
          return (
              <Link href={href} target={blank && '_blank'} className="p-6 border flex justify-between no-underline hover:text-primary transition-all" rel="noopener">{children}
              <ArrowUpRightIcon className={"h-6 w-6 duration-300"} />
              </Link>
          )
        },
      },
      types: {
        image: ImageComponent,
        podcast: PodcastComponent,
        video: VideoComponent,
        code: (props:any) => (
          <pre data-language={props.node.language}>
            <code>{props.node.code}</code>
          </pre>
        ),
      },
  }