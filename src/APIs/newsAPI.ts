import { INewsResponse, ISourceResponse } from "../models/news";

const apiKey: string = process.env.REACT_APP_NEWS_API_KEY as string;

export const getEverything = async (
  keyword?: string,
  from?: string,
  to?: string,
  sources?: string,
  page?: string,
  pageSize?: number
): Promise<INewsResponse> => {
  try {
    const response = await fetch(
      `https://newsapi.org/v2/everything?language=en&${
        sources ? `sources=${sources}&` : ""
      }${keyword ? `q=${keyword}&` : ""}${from ? `from=${from}&` : ""}${
        to ? `to=${to}&` : ""
      }pageSize=${pageSize ? pageSize : 10}&page=${page ? page : 1}`,
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

export const getSources = async (): Promise<ISourceResponse> => {
  try {
    const response = await fetch(
      "https://newsapi.org/v2/top-headlines/sources?language=en",
      {
        headers: { Authorization: apiKey },
      }
    );
    const sources: ISourceResponse = await response.json();
    if (sources.status !== "ok") {
      throw new Error(sources.message && sources.message);
    }
    return sources;
  } catch (e) {
    console.error("fetching error", e);
    return {
      message: "fetching error",
      sources: [],
    };
  }
};
