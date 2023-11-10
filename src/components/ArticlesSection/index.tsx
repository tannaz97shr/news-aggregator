import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { TESelect } from "tw-elements-react";
import { SelectData } from "tw-elements-react/dist/types/forms/Select/types";
import { getSources } from "../../APIs/newsAPI";
import { IArticles, ISource } from "../../models/news";
import Button from "../UI/Button";
import ArticleCard from "./articleCard";
import Pagination from "./pagination";

interface ArticlesSectionProps {
  articles: IArticles[];
  totalResult: number;
  pageSize: number;
  errorMessage?: string;
}

const ArticlesSection = ({
  articles,
  totalResult,
  pageSize,
  errorMessage,
}: ArticlesSectionProps) => {
  let [searchParams, setSearchParams] = useSearchParams();
  const [sources, setSources] = useState<ISource[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(
    Number(searchParams.get("page")) > Math.ceil(totalResult / pageSize)
      ? 1
      : Number(searchParams.get("page"))
  );
  //pageNumber > Math.ceil(totalResult / pageSize)
  const [searchValue, setSearchValue] = useState(
    (searchParams.get("keyword") as string) || ""
  );
  const [fromValue, setFromValue] = useState(
    (searchParams.get("from") as string) || ""
  );
  const [toValue, setToValue] = useState(
    (searchParams.get("to") as string) || ""
  );
  const [selectedSources, setSelectedSources] = useState<string[]>([
    "business-insider",
    "abc-news",
    "google-news",
  ]);

  useEffect(() => {
    if (pageNumber > Math.ceil(totalResult / pageSize))
      setSearchParams({
        ...searchParams,
        sources: `${selectedSources}`,
        page: pageNumber.toString(),
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumber, selectedSources]);

  useEffect(() => {
    const fetchSources = async () => {
      const result = await getSources();
      setSources(result.sources);
    };
    fetchSources();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const resetFiltersHandler = () => {
    setSearchValue("");
    setFromValue("");
    setToValue("");
    setSelectedSources(["business-insider", "abc-news", "google-news"]);
    setSearchParams({
      sources: `${selectedSources}`,
    });
  };

  const handlSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    let newParams = {};
    if (searchValue) newParams = { ...newParams, keyword: searchValue };
    if (fromValue) newParams = { ...newParams, from: fromValue };
    if (toValue) newParams = { ...newParams, to: toValue };
    if (selectedSources.length)
      newParams = { ...newParams, sources: `${selectedSources}` };
    setSearchParams(newParams);
  };

  return (
    <>
      <div className="text-xl text-teal md:text-3xl font-bold mb-4 drop-shadow">
        News API Articles
      </div>
      <form
        onSubmit={handlSubmit}
        className="w-full flex flex-col md:flex-row items-center mb-6 flex-wrap"
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
            value={fromValue}
            onChange={(e) => setFromValue(e.target.value)}
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
            value={toValue}
            onChange={(e) => setToValue(e.target.value)}
            autoComplete="off"
            id="to"
            type="date"
            className="text-dark bg-grey md:mx-2 rounded px-2 py-1.5 w-1/2 ml-auto md:ml-2 md:w-fit"
          />
        </label>
        <label
          htmlFor="multiselect"
          className="relative flex font-semibold w-full md:w-fit items-center my-2"
        >
          Sources
          <TESelect
            value={selectedSources}
            className="text-dark bg-grey md:mx-2 rounded px-2 py-1.5 w-1/2 ml-auto md:ml-2 md:w-fit"
            data={sources.map((source: ISource) => {
              return { text: source.name, value: source.id };
            })}
            multiple
            selectAll={false}
            id="multiselect"
            theme={{
              dropdown: "text-dark bg-grey",
              selectArrow: "hidden",
            }}
            onValueChange={(data: SelectData | SelectData[]) => {
              if (Array.isArray(data)) {
                let newSources: string[] = [];
                data.forEach((data) => {
                  newSources = [...newSources, data.value as string];
                });
                setSelectedSources(newSources);
              }
            }}
          />
          {!(selectedSources.length || searchValue) && (
            <span className="absolute text-danger-600 top-8">
              please enter a keyword or select at least one source please.
            </span>
          )}
        </label>
        <input
          disabled={!(selectedSources.length || searchValue)}
          type="submit"
          value="Search"
          className={`flex h-fit bg-black ${
            selectedSources.length || searchValue
              ? "text-teal border-teal"
              : "text-grey border-grey cursor-not-allowed"
          } font-semibold rounded mt-2 md:mt-0 justify-center
         border w-full md:w-fit px-4 py-2 items-center cursor-pointer`}
        />
      </form>
      {articles.length ? (
        errorMessage ? (
          <div className="flex flex-wrap font-bold text-danger-600 text-lg">
            Error: {errorMessage}
          </div>
        ) : (
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
        )
      ) : (
        <>
          <div className="flex flex-col items-center w-fit mx-auto font-medium mt-16 lg:mt-24 mb-8 text-color-grey text-center">
            <div className="text-[40px] mb-6">
              We couldn’t find any Articles
            </div>
            <div className="text-[30px] ">Try to reset filters</div>
          </div>
          <div className="flex w-full">
            <Button
              onClick={() => resetFiltersHandler()}
              variant="secondary"
              className="mx-auto"
            >
              Reset Filters
            </Button>
          </div>
        </>
      )}

      {articles.length ? (
        <Pagination
          totalCount={totalResult}
          currentPage={pageNumber}
          goToNextPage={() => {
            setPageNumber(pageNumber + 1);
          }}
          goToPreviousPage={() => {
            setPageNumber(pageNumber - 1);
          }}
          pageSize={pageSize}
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default ArticlesSection;
