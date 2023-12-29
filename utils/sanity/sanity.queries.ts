import { groq } from 'next-sanity'

const networkFields = groq`
  title,
  "currentSlug": slug.current,
  overview,
  cover_image
`
const articlesFields = groq`
  title,
  "currentSlug": slug.current,
  cover_image{asset->{url}},
  date,
  categories[]->{
    title
    },
  authors
`
const articleFields = groq`
  _id,
  title,
  "currentSlug": slug.current,
  date,
  network[]->{
    title,
    slug
    },
  content,
  excerpt,
  cover_image{asset->{url}},
  categories[]->{
    title
    },
  authors[]->{
    name,
    biography,
    profile{asset->{url}}
    },
  layout,
  hidden,
  gated,
  premium,
  meta_title,
  meta_keywords,
  meta_description,
  meta_image
`

export const networksQuery = groq`
*[_type == 'networks'] {
  ${networkFields}
}`

export const networkQuery = groq`
*[_type == 'networks' && slug.current == $slug][0] {
  ${networkFields}
}`

export const articlesQuery = groq`
*[_type == 'articles' && $slug in network[]->slug.current && !hidden] | order(date desc) {
  ${articlesFields}
}`

export const articleQuery = groq`
*[_type == 'articles' && slug.current == $id][0] {
  ${articleFields}
}`