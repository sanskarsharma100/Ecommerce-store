import { FC } from "react";
import { RatingStar } from "../RatingStar";
import { useGetCategoriesQuery } from "../../services/productsApi";
import { getProductPara } from "../../utils/types";
import { Link, createSearchParams, useSearchParams } from "react-router-dom";

type Props = {
  queryPara: getProductPara;
};

export const Filters: FC<Props> = ({ queryPara }) => {
  const { data: categoriesData } = useGetCategoriesQuery();

  const [searchParams] = useSearchParams();

  const filterCategories = (category: string) => {
    const categoryQuery = searchParams.get("category");

    if (categoryQuery && categoryQuery.split(" ").includes(category)) {
      return categoryQuery
        .split(" ")
        .filter((item) => item != category)
        .join("+");
    } else if (categoryQuery) {
      return categoryQuery + "+" + category;
    } else {
      return category;
    }
  };

  const ratings = Array(4)
    .fill(0)
    .map((_, ind) => (
      <Link
        to={`?${createSearchParams({
          keyword: queryPara.keyword,
          category: queryPara.category,
          "price[gte]": String(queryPara.price[0]),
          "price[lte]": String(queryPara.price[1]),
          ratings: queryPara.ratings == ind + 1 ? "0" : String(ind + 1),
          sort: queryPara.sort,
          page: String(queryPara.currentPage),
        })}`}
        key={ind * ind}
        className={`rounded-lg px-1 py-1.5 duration-300 hover:cursor-pointer ${
          queryPara.ratings == ind + 1 && "bg-primary-300"
        }`}
      >
        <RatingStar rating={ind + 1} starSize="20px" />
      </Link>
    ));

  const categories = categoriesData?.categories.map((category) => (
    <Link
      to={`?${createSearchParams({
        keyword: queryPara.keyword,
        category: filterCategories(category.name),
        "price[gte]": String(queryPara.price[0]),
        "price[lte]": String(queryPara.price[1]),
        ratings: String(queryPara.ratings),
        sort: queryPara.sort,
        page: String(queryPara.currentPage),
      })}`}
      key={category._id}
    >
      <div className="flex items-center">
        <input
          id={category._id}
          type="checkbox"
          className="peer rounded-md border-2 text-primary-800 shadow-sm hover:cursor-pointer focus:ring-2 focus:ring-primary-700 focus:ring-offset-1"
          readOnly
          name={category.name}
          checked={
            searchParams.get("category")?.split(" ").includes(category.name) ||
            false
          }
        />
        <label
          htmlFor={category._id}
          className="select-none pl-1.5 font-medium text-primary-900 hover:cursor-pointer"
        >
          {category.name}
        </label>
      </div>
    </Link>
  ));

  return (
    <aside className="h-full p-2">
      <section className="m-auto w-full max-w-[8rem]">
        <div className="m-auto">
          <p className="font-semibold text-primary-900 xs:text-lg">Reviews</p>
          <div className="flex flex-col-reverse gap-1">{ratings}</div>
        </div>
        <div className="m-auto mt-2">
          <p className="font-semibold text-primary-900 xs:text-lg">
            Categories
          </p>
          <div className="p-1 text-sm xs:text-base">{categories}</div>
        </div>
      </section>
    </aside>
  );
};
