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
  title: string;
  excerpt: string;
  gated: boolean;
  currentSlug: string;
}