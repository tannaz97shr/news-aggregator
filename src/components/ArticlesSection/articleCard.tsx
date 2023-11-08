import { Link } from "react-router-dom";
import SourceTag from "./sourceTag";

interface ArticleCardProps {
  imgSrc?: string;
  sourceName: string;
  title: string;
  publishedDate: string;
  url: string;
}

const ArticleCard = ({
  imgSrc,
  url,
  title,
  sourceName,
  publishedDate,
}: ArticleCardProps) => {
  const date = new Date(publishedDate);
  return (
    <Link
      className="flex flex-col w-full md:w-[49%] xl:w-[32%] aspect-square max-w-[25rem] my-3 overflow-hidden
    bg-black shadow shadow-grey hover:shadow-teal"
      to={`articles/${title}`}
    >
      {imgSrc ? (
        <img src={imgSrc} alt={title} className="w-full aspect-video" />
      ) : (
        <></>
      )}
      <div className="text-semibold m-2 text-lg">{title}</div>
      <div className="flex mt-auto mx-2 mb-2 items-center justify-between">
        <SourceTag name={sourceName} />
        <div>
          {date.getMonth() + 1}/{date.getDate()}/{date.getFullYear()}
        </div>
      </div>
    </Link>
  );
};

export default ArticleCard;
