import { createClientBrowser } from "./supabase.client"

export async function GetAllArticles (slug:string, start:number, end:number) {

    const supabase = createClientBrowser()
  
    const { data, error, count } = await supabase
    .from("articles")
    .select(`
    id,
    title,
    publish_date,
    slug,
    cover_image,
    format(name),
    premium,
    gated,
    authors!articles_authors(name),
    filters!articles_filters(name, slug, description),
    networks!articles_networks!inner(slug)
    `, { count: 'exact' })
    .not('hidden', 'eq', true)
    .eq('networks.slug', slug)
    .order('publish_date', { ascending: false })
    .range(start, end)
    return {data, count}
  }

  export async function GetAllArticlesByTags (slug:string, id:string, start:number, end:number) {

    const supabase = createClientBrowser()
  
    const { data, error, count } = await supabase
    .from("articles")
    .select(`
    id,
    title,
    publish_date,
    slug,
    cover_image,
    format(name),
    authors!articles_authors(name),
    filters!articles_filters!inner(name, slug, description),
    networks!articles_networks!inner(slug)
    `, { count: 'exact' })
    .not('hidden', 'eq', true)
    .eq('networks.slug', slug)
    .eq('filters.slug', id)
    .order('publish_date', { ascending: false })
    .range(start, end)
    
    return {data, count}
  }
  
export async function GetArticle (id:string) {

    const supabase = createClientBrowser()
  
    const { data, error } = await supabase
    .from("articles")
    .select(`
    id,
    title,
    publish_date,
    slug,
    cover_image,
    format(name),
    content,
    gated,
    premium,
    meta_title,
    meta_keywords,
    meta_description,
    meta_image,
    additional_slugs,
    authors!articles_authors(name, biography, profile_image, linkedin, articles(title, slug, cover_image, publish_date, filters!articles_filters(name, slug), format(name))),
    filters!articles_filters(name, slug, description),
    networks!articles_networks!inner(title,slug)
    `)
    .not('authors.articles.slug', 'eq', id)
    .or(`slug.eq.${id}, additional_slugs.cs.${JSON.stringify([{'slug': `${id}`}])}`)
    .limit(4, { referencedTable: 'authors.articles' })
    .single()
    return data
  }

  export async function GetRelatedArticles (slug:string, id:string, filter:string) {

    const supabase = createClientBrowser()
  
    const { data, error } = await supabase
    .from("articles")
    .select(`
    id,
    title,
    publish_date,
    slug,
    cover_image,
    format(name),
    authors!articles_authors(name),
    filters!articles_filters!inner(name, slug),
    networks!articles_networks!inner(slug)
    `)
    .not('slug', 'eq', id)
    .not('hidden', 'eq', true)
    .eq('networks.slug', slug)
    .eq('filters.slug', filter)
    .limit(4)
    .order('publish_date', { ascending: false })
    
    return data
  }

  export async function GetAllNetworks () {

    const supabase = createClientBrowser()
  
    const { data, error } = await supabase
    .from("networks")
    .select(`
    id,
    title,
    slug,
    overview
    `)
    return data
  }
  export async function GetNetwork (slug:string) {

    const supabase = createClientBrowser()
  
    const { data, error } = await supabase
    .from("networks")
    .select(`
    id,
    title,
    slug,
    overview,
    cover_article,
    featured_0(title, publish_date, slug, format(name)),
    featured_1(title, publish_date, slug, format(name)),
    featured_2(title, publish_date, slug, format(name)),
    featured_3(title, publish_date, slug, format(name)),
    featured_4(title, publish_date, slug, format(name))
    `)
    .eq('slug', slug)
    .limit(1)
    .single()
    return data
  }
  
  /*
  id,
  title,
  slug,
  cover_image,
  format(name),
  networks!articles_networks(*, featured_0(title)),
  authors!articles_authors(name),
  filters!articles_filters(name)
  */