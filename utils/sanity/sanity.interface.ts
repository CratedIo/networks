export interface networksDirectory {
  title: string;
  currentSlug: string;
}
export interface networkFull {
  network: 
    {
      title: string;
      currentSlug: string;
    },
  articles: [
    {
      title: string;
      currentSlug: string;
    }
  ]
}

export interface articleFull {
  _id: string;
  title: string;
  currentSlug: string;
  excerpt: string;
  gated: boolean;
  premium: boolean;
}