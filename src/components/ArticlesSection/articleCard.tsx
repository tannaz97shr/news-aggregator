import SourceTag from "./sourceTag";

interface ArticleCardProps {
  imgSrc?: string;
  sourceName: string;
  title: string;
  publishedDate: string;
}

const ArticleCard = ({
  imgSrc,
  title,
  sourceName,
  publishedDate,
}: ArticleCardProps) => {
  const date = new Date(publishedDate);
  return (
    <div
      className="flex flex-col w-full md:w-[49%] xl:w-[32%] h-[24rem] my-3
    bg-black shadow shadow-grey"
    >
      {imgSrc ? (
        <img src={imgSrc} alt={title} className="w-full h-1/2" />
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
    </div>
  );
};

export default ArticleCard;
