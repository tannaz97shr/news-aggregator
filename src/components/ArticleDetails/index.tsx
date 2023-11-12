import { useDispatch } from "react-redux";
import { Link, useLoaderData } from "react-router-dom";
import { getArticleByTitle } from "../../APIs/newsAPI";
import { addAuthor } from "../../features/favorites/favoritesSlice";
import { IArticles, INewsResponse } from "../../models/news";
import SourceTag from "../ArticlesSection/sourceTag";
import { IconExternal, IconFavorite } from "../UI/Icons";

export async function loader({ params }: { params: any }) {
  const news: INewsResponse = await getArticleByTitle(params.title);
  if (news.articles.length) {
    return { article: news.articles[0] };
  }
  return { article: {} };
}

const ArticleDetails = () => {
  const dispatch = useDispatch();
  const { article } = useLoaderData() as { article: IArticles };
  if (!article.title) {
    return <div>No Article found</div>;
  }

  const date = new Date(article.publishedAt);
  return (
    <div className="flex flex-col md:w-[80%] p-2 md:p-8 mx-auto">
      <div className="text-xl text-teal md:text-3xl font-bold mb-4 drop-shadow">
        {article.title}
      </div>
      <div className="flex flex-col md:flex-row mb-2 justify-between">
        <div className="flex flex-col mb-4">
          <div className="flex flex-col md:flex-row">
            <div>
              <span>Author : </span>
              <span className="font-semibold mr-2">{article.author}</span>
            </div>
            <button
              className="flex items-center text-teal underline"
              onClick={() => dispatch(addAuthor(article.author))}
            >
              <span>Add this category to Favorites</span>
              <IconFavorite className="w-4 h-4" />
            </button>
          </div>
          <div>
            <span>published at : </span>
            <span className="font-semibold">
              {date.getMonth() + 1}/{date.getDate()}/{date.getFullYear()}
            </span>
          </div>
        </div>
        <SourceTag name={article.source.name} />
      </div>
      <img
        src={article.urlToImage}
        alt={article.title}
        className="w-full aspect-video rounded-lg"
      />
      <div className="my-6">{article.description}</div>
      {/* <div className="my-6">{article.content}</div> */}
      <div
        dangerouslySetInnerHTML={{
          __html: article.content,
        }}
      />
      <Link
        className="flex bg-black text-teal font-semibold rounded mx-auto mt-6
         border border-teal w-fit px-4 py-2 items-center"
        target="_blank"
        to={article.url}
      >
        <span>Read More</span>
        <IconExternal fill="#00ADB5" className="w-4 h-4 ml-2" />
      </Link>
    </div>
  );
};

export default ArticleDetails;
