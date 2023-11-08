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
      console.log("fetch resault ", result);
    };
    fetchData();
  }, []);

  return (
    <main className="flex min-h-screen flex-col">
      <div>hero section</div>
      <div
        className="flex flex-col
      xl:w-[1200px] lg:w-[1000px] lg:mx-auto w-full px-4"
      >
        main section
        <ArticlesSection articles={articles} />
      </div>
    </main>
  );
}

export default App;
