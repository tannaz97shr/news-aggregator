import { useState } from "react";
import { Link } from "react-router-dom";
import { ISource } from "../../models/news";
import Modal from "../UI/Modal";
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
          <div className="font-bold text-xl w-fit m-auto mb-6">
            {displaySource.name}
          </div>
          <div className="capitalize">Category : {source?.category}</div>
          <div className="capitalize">Country : {source?.country}</div>
          <div className="my-6">{source?.description}</div>
          {source?.url ? (
            <Link
              target="_blank"
              className="underline mt-6 text-teal"
              to={source?.url}
            >
              Go to {source.name}'s website
            </Link>
          ) : null}
        </Modal>
      )}
      <div
        className="flex flex-col w-full md:w-[49%] xl:w-[32%] aspect-square max-w-[30rem] my-3 overflow-hidden
    bg-black shadow shadow-grey hover:shadow-teal mx-auto"
      >
        {imgSrc ? (
          <img src={imgSrc} alt={title} className="w-full aspect-video" />
        ) : (
          <></>
        )}
        <div className="text-semibold m-2 text-lg">{title}</div>
        <Link to={`articles/${title}`} className="ml-2 text-teal underline">
          Open this article
        </Link>
        <div className="flex mt-auto mx-2 mb-2 items-center justify-between">
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
