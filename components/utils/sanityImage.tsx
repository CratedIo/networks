import { client } from "@/utils/sanity/sanity.client"
import imageUrlBuilder from '@sanity/image-url'

const builder = imageUrlBuilder(client)

export function sanityImage(source:string) {
    return  builder.image(source)
  }