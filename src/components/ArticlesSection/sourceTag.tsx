import { ISource } from "../../models/news";
import Button from "../UI/Button";

interface SourceTagProps {
  name: string;
  source?: ISource;
  onClick?: () => void;
}

const SourceTag = ({ name, source, onClick }: SourceTagProps) => {
  return (
    <>
      {source ? (
        <Button
          onClick={() => {
            onClick && onClick();
          }}
          className="w-fitz-20 hover:font-bold hover:border-2 hoverborder-teal 
        hover:shadow-xl shadow-teal"
        >
          {source.name}
        </Button>
      ) : (
        <span className="w-fit text-sm h-fit rounded-lg border border-grey bg-teal text-black px-2 py-1.5">
          {name}
        </span>
      )}
    </>
  );
};

export default SourceTag;
