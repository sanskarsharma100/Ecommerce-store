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
        className={`hover:bg-grayLighter border border-gray-500 px-1.5 py-0.5 text-xs font-semibold hover:font-bold xs:text-sm ss:px-3 ss:py-1 ss:text-base ${
          currentPage == ind + 1 && "bg-accent hover:!bg-accent"
        }`}
        onClick={() => changePage(ind + 1)}
      >
        {ind + 1}
      </button>
    ));

  return (
    <div className="m-auto w-fit">
      <button
        className={`border border-gray-500 px-1 py-0.5 text-xs font-medium xs:text-sm ss:px-2 ss:py-1 ss:text-base ${
          currentPage <= 1
            ? "bg-gray-300 text-gray-500 hover:cursor-not-allowed"
            : "hover:bg-grayLighter"
        }`}
        onClick={() => changePage(currentPage - 1)}
        disabled={currentPage <= 1}
      >
        {"<<"}
      </button>
      {pageBtns}
      <button
        className={`border border-gray-500 px-1 py-0.5 text-xs font-medium xs:text-sm ss:px-2 ss:py-1 ss:text-base ${
          currentPage == numOfPages
            ? "bg-gray-300 text-gray-500 hover:cursor-not-allowed"
            : "hover:bg-grayLighter"
        }`}
        onClick={() => changePage(currentPage + 1)}
        disabled={currentPage == numOfPages}
      >
        {">>"}
      </button>
    </div>
  );
};
