import { FC, useEffect, useRef } from "react";
import { getProductPara } from "../../utils/types";
import { Link, createSearchParams, useSearchParams } from "react-router-dom";

type Props = {
  queryPara: getProductPara;
};

export const SortBy: FC<Props> = ({ queryPara }) => {
  const dropDownRef = useRef<HTMLDivElement>(null);
  const checkboxRef = useRef<HTMLInputElement>(null);
  const [searchParams] = useSearchParams();

  const sortValues = [
    { label: "Relevance", value: "relevance" },
    { label: "Price: Low to High", value: "increasing" },
    { label: "Price: High to Low", value: "decreasing" },
    { label: "Ratings", value: "ratings" },
  ];

  const selectedSort =
    sortValues.find((sortValue) => sortValue.value == searchParams.get("sort"))
      ?.label || sortValues[0].label;

  const sortByOptions = sortValues.map((item, i) => (
    <Link
      to={`?${createSearchParams({
        keyword: queryPara.keyword,
        category: queryPara.category,
        "price[gte]": String(queryPara.price[0]),
        "price[lte]": String(queryPara.price[1]),
        ratings: String(queryPara.ratings),
        sort: item.value,
        page: String(queryPara.currentPage),
      })}`}
      key={i}
      className="block w-full border-b border-primary-400 px-2 py-1 text-sm duration-300 last:border-none hover:cursor-pointer hover:bg-primary-400 active:bg-primary-400"
    >
      {item.label}
    </Link>
  ));

  useEffect(() => {
    const handleOutsideClick = (e: Event) => {
      const target = e.target as HTMLElement;
      if (dropDownRef.current && !dropDownRef.current.contains(target)) {
        if (checkboxRef.current) {
          checkboxRef.current.checked = false;
        }
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <>
      <p className="mb-1 text-sm font-semibold text-primary-900">Sort By:</p>
      <div ref={dropDownRef}>
        <input
          type="checkbox"
          id="sortByCheckbox"
          className="peer hidden"
          ref={checkboxRef}
        />
        <label
          htmlFor="sortByCheckbox"
          className="flex w-full select-none items-center justify-center rounded-lg bg-primary-200 px-2.5 py-1.5 text-sm font-semibold text-primary-900 duration-300 focus-within:hidden hover:cursor-pointer hover:ring-2 hover:ring-primary-500 active:ring-2 active:ring-primary-500 peer-checked:ring-2 peer-checked:ring-primary-500"
        >
          {selectedSort}
        </label>
        <label
          htmlFor="sortByCheckbox"
          className="absolute z-[999] mt-1 hidden overflow-hidden rounded-lg border-2 border-primary-400 bg-primary-050 font-medium peer-checked:block"
        >
          <ul className="">{sortByOptions}</ul>
        </label>
      </div>
    </>
  );
};
