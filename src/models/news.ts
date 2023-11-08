export interface IArticles {
  source: {
    id: string;
    name: string;
  };
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}

export interface INewsResponse {
  articles: IArticles[];
  status?: string;
  totalResults?: number;
  code?: string;
  message?: string;
}
