import { IArticles } from "../../models/news";
import ArticleCard from "./articleCard";

interface ArticlesSectionProps {
  articles: IArticles[];
}

const ArticlesSection = ({ articles }: ArticlesSectionProps) => {
  return (
    <div className="flex flex-wrap justify-around">
      {articles.map((article: IArticles) => (
        <ArticleCard
          key={article.url}
          imgSrc={article.urlToImage}
          title={article.title}
          sourceName={article.source.name}
          publishedDate={article.publishedAt}
        />
      ))}
    </div>
  );
};

export default ArticlesSection;
