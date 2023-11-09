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
    const fetchData = async () => {
      const result = await getEverything(keyword);
      setArticles(result.articles);
    };
    fetchData();
  }, [searchParams]);

  return <ArticlesSection articles={articles} />;
}

export default App;
