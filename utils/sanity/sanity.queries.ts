import { groq } from 'next-sanity'

const networkFields = groq`
  title,
  "currentSlug": slug.current,
  overview,
  cover_article{
    title,
    description,
    url,
    image{asset->{url}},
    article->{
      title,
      "slug": slug.current,
    }
  },
  featured_articles[]->{
    title,
    "Slug": slug.current,
    date,
    categories[]->{
    title
    },
  }
`
const articlesFields = groq`
  _id,
  title,
  "currentSlug": slug.current,
  cover_image{asset->{url}},
  date,
  categories[]->{
    title
    },
  format->{
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
  format[]->{
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
  meta_image,
  additional_slugs
`
export const networksQuery = groq`
*[_type == 'networks'] {
  ${networkFields}
}`

export const networkQuery = groq`{
"network": *[_type == 'networks' && slug.current == $slug][0] {
    ${networkFields}
  },
"articles": *[_type == 'articles' && $slug in network[]->slug.current && !hidden] | order(date desc) [$start...$end] {
    ${articlesFields}
  },
"total": count(*[_type == 'articles' && $slug in network[]->slug.current && !hidden]) 
}
`
export const articleQuery = groq`
*[_type == 'articles' && (slug.current == $id || $id in additional_slugs)][0] {
  ${articleFields}
}`