import { useEffect, useState } from "react";

const NumbersSize = 3;

interface IPaginationProps {
  currentPage: number;
  setCurrentPage: Function;
  pages: number;
  // onNextPage: Function;
  // onBackPage: Function;
}

const Pagination = ({
  currentPage,
  setCurrentPage,
  pages,
}: // onNextPage,
// onBackPage,
IPaginationProps) => {
  const [pageNumbers, setPageNumbers] = useState<number[]>([]);
  const range = (start: number, end: number) => {
    if (currentPage > end) end = currentPage;
    if (end - start > NumbersSize) start = end - NumbersSize;
    let length = end - start + 1;
    /*
      Create an array of certain length and set the elements within it from
      start value to end value.
    */
    return Array.from({ length }, (_, idx) => idx + start);
  };

  useEffect(() => {
    if (pageNumbers.indexOf(currentPage) === -1) {
      let dataPages = range(1, NumbersSize);
      setPageNumbers(dataPages);
    }
  }, [pageNumbers, currentPage]);

  const arrowMinus = () => {
    return (
      <button
        onClick={(e) => {
          e.preventDefault();
          if (currentPage !== 1) setCurrentPage(currentPage - 1);
        }}
        // disabled={currentPage === 1}
        className="h-12 px-4 border-2 border-r-0 border-red-600 hover:bg-red-600 hover:text-white"
      >
        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
          <path
            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
            clipRule="evenodd"
            fillRule="evenodd"
          ></path>
        </svg>
      </button>
    );
  };

  const arrowPlus = () => {
    return (
      <button
        onClick={(e) => {
          if (currentPage !== pages) setCurrentPage(currentPage + 1);
        }}
        // disabled={currentPage === pages}
        className="h-12 px-4 border-2 border-r-0 border-red-600 hover:bg-red-600 hover:text-white"
      >
        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
          <path
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clipRule="evenodd"
            fillRule="evenodd"
          ></path>
        </svg>
      </button>
    );
  };

  return (
    <div className="flex bg-white rounded-lg font-[Poppins] ">
      <button
        onClick={() => setCurrentPage(1)}
        className="h-12 px-4 border-2 border-r-0 border-red-600 rounded-l-lg hover:bg-red-600 hover:text-white"
        disabled={currentPage === 1}
      >
        <svg
          stroke="currentColor"
          className="w-4 h-4 fill-current"
          viewBox="0 0 20 20"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5"
          />
        </svg>
      </button>

      {arrowMinus()}

      {pageNumbers.map((pg, i) => (
        <button
          key={"@" + i + pg}
          onClick={(e) => {
            e.preventDefault();
            setCurrentPage(pg);
          }}
          className={`h-12 border-2 border-r-0 border-red-600
               w-12 ${currentPage === pg && "bg-red-600 text-white"}`}
        >
          {pg}
        </button>
      ))}
      {arrowPlus()}
      <button
        onClick={() => setCurrentPage(pages)}
        className="h-12 px-4 border-2 border-red-600 rounded-r-lg hover:bg-red-600 hover:text-white"
        disabled={currentPage === pages}
      >
        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
          />
        </svg>
      </button>
    </div>
  );
};

export default Pagination;
