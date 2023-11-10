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

export interface ISource {
  id: string;
  name: string;
  description: string;
  url: string;
  category: string;
  language: string;
  country: string;
}

export interface ISourceResponse {
  status?: string;
  sources: ISource[];
  code?: string;
  message?: string;
}
