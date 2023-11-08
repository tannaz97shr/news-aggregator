interface SourceTagProps {
  name: string;
}

const SourceTag = ({ name }: SourceTagProps) => {
  return (
    <span className="text-sm h-fit rounded-lg border border-grey bg-teal text-black px-2 py-1.5">
      {name}
    </span>
  );
};

export default SourceTag;
