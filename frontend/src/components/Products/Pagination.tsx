import { FC } from "react";
import { Link, createSearchParams } from "react-router-dom";
import { getProductPara } from "../../utils/types";

type Props = {
  currentPage: number;
  numOfPages: number | undefined;
  queryPara: getProductPara;
};

export const Pagination: FC<Props> = ({
  currentPage,
  numOfPages = 1,
  queryPara,
}) => {
  const pageBtns = Array(numOfPages)
    .fill(0)
    .map((_item, ind) => (
      <Link
        key={ind + 1}
        to={`?${createSearchParams({
          keyword: queryPara.keyword,
          category: queryPara.category,
          "price[gte]": String(queryPara.price[0]),
          "price[lte]": String(queryPara.price[1]),
          ratings: String(queryPara.ratings),
          sort: queryPara.sort,
          page: String(ind + 1),
        })}`}
        className={`inline-block border-r-2 border-primary-400 px-2.5 py-0.5 text-base font-semibold text-primary-900 hover:bg-primary-100 hover:font-bold xs:text-sm ss:px-3 ss:py-1 ${
          currentPage == ind + 1 && "bg-primary-400 hover:!bg-primary-400"
        }`}
      >
        {ind + 1}
      </Link>
    ));

  return (
    <div className="m-auto w-fit border-2 border-primary-400">
      <Link
        to={`?${createSearchParams({
          keyword: queryPara.keyword,
          category: queryPara.category,
          "price[gte]": String(queryPara.price[0]),
          "price[lte]": String(queryPara.price[1]),
          ratings: String(queryPara.ratings),
          sort: queryPara.sort,
          page: String(queryPara.currentPage - 1),
        })}`}
        className={`inline-block border-r-2 border-primary-400 px-1 py-0.5 text-base font-medium text-primary-900 hover:bg-primary-100 xs:text-sm ss:px-2 ss:py-1  ${
          currentPage <= 1 && "hidden"
        }`}
      >
        {"<<"}
      </Link>
      {pageBtns}
      <Link
        to={`?${createSearchParams({
          keyword: queryPara.keyword,
          category: queryPara.category,
          "price[gte]": String(queryPara.price[0]),
          "price[lte]": String(queryPara.price[1]),
          ratings: String(queryPara.ratings),
          sort: queryPara.sort,
          page: String(queryPara.currentPage + 1),
        })}`}
        className={`inline-block px-1 py-0.5 text-base font-medium text-primary-900 hover:bg-primary-100 xs:text-sm ss:px-2 ss:py-1 ${
          currentPage == numOfPages && "hidden"
        }`}
      >
        {">>"}
      </Link>
    </div>
  );
};
