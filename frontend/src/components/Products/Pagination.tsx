import { FC } from "react";

type Props = {
  currentPage: number;
  numOfPages: number | undefined;
  changePage: (_pageNum: number) => void;
};

export const Pagination: FC<Props> = ({
  currentPage,
  numOfPages = 1,
  changePage,
}) => {
  const pageBtns = Array(numOfPages)
    .fill(0)
    .map((_item, ind) => (
      <button
        key={ind + 1}
        className={`border-r-2 border-primary-400 px-1.5 py-0.5 text-xs font-semibold text-primary-900 hover:bg-primary-100 hover:font-bold xs:text-sm ss:px-3 ss:py-1 ss:text-base ${
          currentPage == ind + 1 && "bg-primary-400 hover:!bg-primary-400"
        }`}
        onClick={() => changePage(ind + 1)}
      >
        {ind + 1}
      </button>
    ));

  return (
    <div className="m-auto w-fit border-2 border-primary-400">
      <button
        className={`border-r-2 border-primary-400 px-1 py-0.5 text-xs font-medium text-primary-900 xs:text-sm ss:px-2 ss:py-1 ss:text-base ${
          currentPage <= 1
            ? "bg-primary-050 text-primary-300 hover:cursor-not-allowed"
            : "hover:bg-primary-100"
        }`}
        onClick={() => changePage(currentPage - 1)}
        disabled={currentPage <= 1}
      >
        {"<<"}
      </button>
      {pageBtns}
      <button
        className={`px-1 py-0.5 text-xs font-medium text-primary-900 xs:text-sm ss:px-2 ss:py-1 ss:text-base ${
          currentPage == numOfPages
            ? "bg-primary-050 text-primary-300 hover:cursor-not-allowed"
            : "hover:bg-primary-100"
        }`}
        onClick={() => changePage(currentPage + 1)}
        disabled={currentPage == numOfPages}
      >
        {">>"}
      </button>
    </div>
  );
};
