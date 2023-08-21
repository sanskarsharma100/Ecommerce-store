import { FC } from "react";

type Props = {
  selectedSort: string;
  sortProducts: (_sortBy: { label: string; value: string }) => void;
};

export const SortBy: FC<Props> = ({ selectedSort, sortProducts }) => {
  const sortValues = [
    { label: "Relevance", value: "relevance" },
    { label: "Price: Low to High", value: "increasing" },
    { label: "Price: High to Low", value: "decreasing" },
    { label: "Ratings", value: "ratings" },
  ];

  const sortByOptions = sortValues.map((item, i) => (
    <li
      key={i}
      className="w-full border border-secondary px-2 py-1 text-sm hover:cursor-pointer"
      onClick={() => sortProducts(item)}
    >
      {item.label}
    </li>
  ));

  return (
    <>
      <p className="text-sm font-medium">Sort By:</p>
      <label
        htmlFor="sortByCheckbox"
        className="w-full select-none border border-secondary px-2 py-1 text-sm hover:cursor-pointer"
      >
        {selectedSort}
      </label>
      <input type="checkbox" id="sortByCheckbox" className="peer hidden" />
      <ul className="absolute z-[999] hidden bg-hoverColor peer-checked:block">
        {sortByOptions}
      </ul>
    </>
  );
};
