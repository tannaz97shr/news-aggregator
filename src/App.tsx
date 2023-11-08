import { useEffect, useState } from "react";
import { getEverything } from "./APIs/newsAPI";
import ArticlesSection from "./components/ArticlesSection";
import { IArticles } from "./models/news";

function App() {
  const [articles, setArticles] = useState<IArticles[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getEverything();
      setArticles(result.articles);
    };
    fetchData();
  }, []);

  return <ArticlesSection articles={articles} />;
}

export default App;
