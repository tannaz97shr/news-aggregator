import { INewsResponse } from "../models/news";

export const getEverything = async (): Promise<INewsResponse> => {
  const apiKey: string = process.env.REACT_APP_NEWS_API_KEY as string;
  console.log("apiKey", apiKey);
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
