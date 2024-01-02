export interface networksDirectory {
  title: string;
  currentSlug: string;
  overview: string;
  cover_image:any;
}
export interface networkFull {
  network: 
    {
      title: string;
      currentSlug: string;
      overview: string;
      cover_image:any;
    },
  articles: [
    {
      title: string;
      currentSlug: string;
      cover_image:any;
      date: string;
      categories: [];
      authors: [];
    }
  ],
  total:number
}

export interface articleFull {
  _id: string;
  title: string;
  currentSlug: string;
  date: string;
  network: [];
  content: [];
  excerpt: string;
  cover_image:any;
  categories: [];
  format: [];
  authors: [];
  layout: string;
  hidden: boolean;
  gated: boolean;
  premium: boolean;
  meta_title: string;
  meta_keywords: string;
  meta_description: string;
  meta_image: [];
  additional_slugs: [];
}

export interface ArticlePageProps {
  params: {
    id: string;
  };
}

export interface NetworkPageProps {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined }
}