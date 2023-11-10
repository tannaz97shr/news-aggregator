import Button from "../UI/Button";

interface PaginationProps {
  totalCount: number;
  currentPage: number;
  pageSize: number;
  goToNextPage: () => void;
  goToPreviousPage: () => void;
}

const Pagination = ({
  totalCount,
  currentPage,
  pageSize,
  goToNextPage,
  goToPreviousPage,
}: PaginationProps) => {
  const totalPages = Math.ceil(totalCount / pageSize);
  return (
    <div className="flex justify-between mt-6">
      <Button
        disabled={currentPage === 1}
        variant={currentPage === 1 ? "secondary" : "primary"}
        onClick={goToPreviousPage}
      >
        Previous
      </Button>
      <div>
        {currentPage}/{totalPages}
      </div>
      <Button
        onClick={() => goToNextPage()}
        disabled={currentPage === totalPages}
        variant={currentPage === totalPages ? "secondary" : "primary"}
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;
