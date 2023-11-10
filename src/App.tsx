import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getEverything } from "./APIs/newsAPI";
import ArticlesSection from "./components/ArticlesSection";
import { IArticles } from "./models/news";

function App() {
  const [articles, setArticles] = useState<IArticles[]>([]);
  const [totalResult, setTotalResult] = useState<number>(0);
  let [searchParams] = useSearchParams();
  const { innerWidth: width } = window;
  const pageSize: number = width > 1279 ? 30 : width > 766 ? 20 : 10;
  useEffect(() => {
    const keyword = searchParams.get("keyword") || undefined;
    const from = searchParams.get("from") || undefined;
    const to = searchParams.get("to") || undefined;
    const sources = searchParams.get("sources") || undefined;
    const page = searchParams.get("page") || "1";
    const fetchData = async () => {
      const result = await getEverything(
        keyword,
        from,
        to,
        sources,
        page,
        pageSize
      );
      setArticles(result.articles);
      if (result.totalResults) setTotalResult(result.totalResults);
    };
    fetchData();
  }, [pageSize, searchParams]);

  return (
    <ArticlesSection
      pageSize={pageSize}
      articles={articles}
      totalResult={totalResult}
    />
  );
}

export default App;
