import { groq } from 'next-sanity'

const networkFields = groq`
  title,
  "currentSlug": slug.current,
`
const articlesFields = groq`
  title,
  "currentSlug": slug.current,
`
const articleFields = groq`
  _id,
  title,
  excerpt,
  gated,
  premium,
  "currentSlug": slug.current,
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