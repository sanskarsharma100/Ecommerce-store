import { ChangeEvent, FC, useEffect, useState } from "react";
import { RatingStar } from "../RatingStar";
import { useGetCategoriesQuery } from "../../services/productsApi";

type Props = {
  updateCategories: (_categories: string) => void;
  showFilter: boolean;
};

export const Filters: FC<Props> = ({ updateCategories, showFilter }) => {
  const { data: categoriesData } = useGetCategoriesQuery();
  const [selectedCategories, setSelectedCategories] = useState<Array<string>>(
    []
  );

  const filterCategories = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    if (target.checked) {
      setSelectedCategories((prevData) => [...prevData, target.name]);
    } else {
      setSelectedCategories((prevData) => {
        return prevData.splice(prevData.indexOf(target.name), 0);
      });
    }
  };

  useEffect(() => {
    updateCategories(selectedCategories.join("%20"));
    console.log("selectedCategories", selectedCategories);
  }, [selectedCategories]);

  const ratings = Array(4)
    .fill(0)
    .map((_, ind) => <RatingStar key={ind * ind} rating={ind + 1} />);

  const categories = categoriesData?.categories.map((category) => (
    <li key={category._id}>
      <input
        id={category._id}
        type="checkbox"
        className="peer text-accent shadow-sm hover:cursor-pointer focus:ring-0 focus:ring-offset-0"
        onChange={filterCategories}
        name={category.name}
      />
      <label
        htmlFor={category._id}
        className="ml-1 select-none font-medium hover:cursor-pointer peer-checked:text-accent peer-hover:text-accent"
      >
        {category.name}
      </label>
    </li>
  ));

  return (
    <aside className="p-2">
      <section className="m-auto w-full max-w-[8rem]">
        <div className="m-auto">
          <p className="mb-1 font-semibold">Reviews</p>
          <div className="flex flex-col-reverse gap-1">{ratings}</div>
        </div>
        <div className="m-auto mt-2">
          <p className="mb-1 font-semibold">Categories</p>
          <ul className="text-sm">{categories}</ul>
        </div>
      </section>
    </aside>
  );
};
