import { FC, useEffect, useRef } from "react";

type Props = {
  selectedSort: string;
  sortProducts: (_sortBy: { label: string; value: string }) => void;
};

export const SortBy: FC<Props> = ({ selectedSort, sortProducts }) => {
  const dropDownRef = useRef<HTMLDivElement>(null);
  const checkboxRef = useRef<HTMLInputElement>(null);

  const sortValues = [
    { label: "Relevance", value: "relevance" },
    { label: "Price: Low to High", value: "increasing" },
    { label: "Price: High to Low", value: "decreasing" },
    { label: "Ratings", value: "ratings" },
  ];

  const sortByOptions = sortValues.map((item, i) => (
    <li
      key={i}
      className="w-full border-b border-primary-400 px-2 py-1 text-sm duration-300 last:border-none hover:cursor-pointer hover:bg-primary-400 active:bg-primary-400"
      onClick={() => sortProducts(item)}
    >
      {item.label}
    </li>
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
          className="w-full select-none rounded-lg border-2 border-primary-900 px-2 py-1 text-sm font-semibold text-primary-900 duration-300 focus-within:hidden hover:cursor-pointer hover:ring-2 hover:ring-primary-500 active:ring-2 active:ring-primary-500 peer-checked:ring-2 peer-checked:ring-primary-500"
        >
          {selectedSort}
        </label>
        <label
          htmlFor="sortByCheckbox"
          className="absolute z-[999] mt-1 hidden overflow-hidden rounded-lg border-2 border-primary-400 bg-primary-100 font-medium peer-checked:block"
        >
          <ul className="">{sortByOptions}</ul>
        </label>
      </div>
    </>
  );
};
