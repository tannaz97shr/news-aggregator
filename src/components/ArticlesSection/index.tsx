import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { TESelect } from "tw-elements-react";
// import "tw-elements-react/dist/css/tw-elements-react.min.css";
import { getSources } from "../../APIs/newsAPI";
import { IArticles, ISource } from "../../models/news";
import ArticleCard from "./articleCard";

interface ArticlesSectionProps {
  articles: IArticles[];
}

const ArticlesSection = ({ articles }: ArticlesSectionProps) => {
  let [searchParams, setSearchParams] = useSearchParams();
  const [sources, setSources] = useState<ISource[]>([]);
  const [searchValue, setSearchValue] = useState(
    searchParams.get("keyword") as string
  );
  console.log("initial searchParams", searchParams.get("keyword"));

  useEffect(() => {
    const fetchSources = async () => {
      const result = await getSources();
      setSources(result.sources);
      console.log("fetched sources : ", result);
    };
    fetchSources();
  }, []);

  const handlSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      keyword: { value: string };
    };
    const keyword = target.keyword.value;
    setSearchParams({ keyword: keyword });
    if (keyword === "") {
      searchParams.delete("keyword");
      setSearchParams(searchParams);
    }
  };
  return (
    <>
      <div className="text-xl text-teal md:text-3xl font-bold mb-4 drop-shadow">
        News API Articles
      </div>
      <form
        onSubmit={handlSubmit}
        className="w-full flex flex-col md:flex-row items-center mb-4 flex-wrap"
      >
        <label
          htmlFor="keyword"
          className="flex font-semibold w-full md:w-fit items-center my-2"
        >
          Search for
          <input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            autoComplete="off"
            id="keyword"
            className="text-dark bg-grey md:mx-2 rounded px-2 py-1.5 w-1/2 ml-auto md:ml-2 md:w-fit"
          />
        </label>
        <label
          htmlFor="from"
          className="flex font-semibold w-full md:w-fit items-center my-2"
        >
          From
          <input
            // value={searchValue}
            // onChange={(e) => setSearchValue(e.target.value)}
            autoComplete="off"
            id="from"
            type="date"
            className="text-dark bg-grey md:mx-2 rounded px-2 py-1.5 w-1/2 ml-auto md:ml-2 md:w-fit"
          />
        </label>

        <label
          htmlFor="to"
          className="flex font-semibold w-full md:w-fit items-center my-2"
        >
          To
          <input
            // value={searchValue}
            // onChange={(e) => setSearchValue(e.target.value)}
            autoComplete="off"
            id="to"
            type="date"
            className="text-dark bg-grey md:mx-2 rounded px-2 py-1.5 w-1/2 ml-auto md:ml-2 md:w-fit"
          />
        </label>
        <label
          htmlFor="multiselect"
          className="flex font-semibold w-full md:w-fit items-center my-2"
        >
          Sources
          <TESelect
            className="text-dark bg-grey md:mx-2 rounded px-2 py-1.5 w-1/2 ml-auto md:ml-2 md:w-fit"
            data={sources.map((source: ISource) => {
              return { text: source.name, value: source.id };
            })}
            multiple
            selectAll={false}
            id="multiselect"
            theme={{
              dropdown: "text-dark bg-grey",
            }}
          />
        </label>
        <input
          type="submit"
          value="Search"
          className="flex h-fit bg-black text-teal font-semibold rounded mt-2 md:mt-0 justify-center
         border border-teal w-full md:w-fit px-4 py-2 items-center cursor-pointer"
        />
      </form>

      <div className="flex flex-wrap">
        {articles.map((article: IArticles) => (
          <ArticleCard
            key={article.url}
            imgSrc={article.urlToImage}
            title={article.title}
            sourceName={article.source.name}
            publishedDate={article.publishedAt}
            url={article.url}
          />
        ))}
      </div>
    </>
  );
};

export default ArticlesSection;
