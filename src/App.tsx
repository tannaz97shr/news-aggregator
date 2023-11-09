import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getEverything } from "./APIs/newsAPI";
import ArticlesSection from "./components/ArticlesSection";
import { IArticles } from "./models/news";

function App() {
  const [articles, setArticles] = useState<IArticles[]>([]);
  let [searchParams] = useSearchParams();
  useEffect(() => {
    const keyword = searchParams.get("keyword") || undefined;
    const from = searchParams.get("from") || undefined;
    const to = searchParams.get("to") || undefined;
    const sources = searchParams.get("sources") || undefined;
    const fetchData = async () => {
      const result = await getEverything(keyword, from, to, sources);
      setArticles(result.articles);
    };
    fetchData();
  }, [searchParams]);

  return <ArticlesSection articles={articles} />;
}

export default App;
