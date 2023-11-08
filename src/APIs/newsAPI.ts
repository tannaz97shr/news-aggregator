import { INewsResponse } from "../models/news";

const apiKey: string = process.env.REACT_APP_NEWS_API_KEY as string;

export const getEverything = async (): Promise<INewsResponse> => {
  try {
    const response = await fetch(
      "https://newsapi.org/v2/everything?sources=business-insider,abc-news,google-news&pageSize=27&page=1",
      {
        headers: { Authorization: apiKey },
      }
    );
    const news: INewsResponse = await response.json();
    if (news.status !== "ok") {
      throw new Error(news.message && news.message);
    }
    return news;
  } catch (e) {
    console.error("fetching error", e);
    return {
      message: "fetching error",
      articles: [],
    };
  }
};

export const getArticleByTitle = async (title: string) => {
  try {
    const response = await fetch(
      `https://newsapi.org/v2/everything?q="${title}"&sources=business-insider,abc-news,google-news`,
      {
        headers: { Authorization: apiKey },
      }
    );
    const news: INewsResponse = await response.json();
    if (news.status !== "ok") {
      throw new Error(news.message && news.message);
    }
    return news;
  } catch (e) {
    console.error("fetching error", e);
    return {
      message: "fetching error",
      articles: [],
    };
  }
};
