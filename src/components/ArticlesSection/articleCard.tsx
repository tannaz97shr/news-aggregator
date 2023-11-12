import { useState } from "react";
import { Link } from "react-router-dom";
import { ISource } from "../../models/news";
import Modal from "../UI/Modal";
import SourceDetails from "./sourceDetails";
import SourceTag from "./sourceTag";

interface ArticleCardProps {
  imgSrc?: string;
  sourceName: string;
  title: string;
  publishedDate: string;
  url: string;
  source?: ISource;
}

const ArticleCard = ({
  imgSrc,
  url,
  title,
  sourceName,
  publishedDate,
  source,
}: ArticleCardProps) => {
  const date = new Date(publishedDate);
  const [displaySource, setDisplaySource] = useState<ISource | undefined>();
  return (
    <>
      {displaySource && (
        <Modal closeHandler={() => setDisplaySource(undefined)}>
          <SourceDetails displaySource={displaySource} />
        </Modal>
      )}
      <div
        className="flex flex-col w-full pb-2 md:w-[49%] 
        xl:w-[32%] aspect-square
         max-w-[30rem] my-3 overflow-hidden
    bg-black shadow shadow-grey hover:shadow-teal mx-auto"
      >
        {imgSrc ? (
          <img src={imgSrc} alt={title} className="w-full aspect-video" />
        ) : (
          <></>
        )}
        <div className="text-semibold m-2 text-lg line-clamp-2">{title}</div>
        <Link
          to={`articles/${title}`}
          className="ml-2 mt-auto text-teal underline"
        >
          Open this article
        </Link>
        <div className="flex mx-2 mt-2 mb-2 items-center justify-between">
          <SourceTag
            name={sourceName}
            source={source}
            onClick={() => setDisplaySource(source)}
          />
          <div>
            {date.getMonth() + 1}/{date.getDate()}/{date.getFullYear()}
          </div>
        </div>
      </div>
    </>
  );
};

export default ArticleCard;
