import { ChangeEvent, FC, useEffect, useState } from "react";
import { RatingStar } from "../RatingStar";
import { useGetCategoriesQuery } from "../../services/productsApi";
import { getProductPara } from "../../utils/types";

type Props = {
  updateCategoryPara: (_categories: string) => void;
  updateRatingsPara: (_ratings: number) => void;
  queryPara: getProductPara;
};

export const Filters: FC<Props> = ({
  updateCategoryPara,
  updateRatingsPara,
  queryPara,
}) => {
  const { data: categoriesData } = useGetCategoriesQuery();
  const [selectedCategories, setSelectedCategories] = useState<Array<string>>(
    []
  );

  const filterCategories = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;

    if (target.checked) {
      setSelectedCategories((prevData) => [...prevData, target.name]);
    } else {
      setSelectedCategories((prevCategories) =>
        prevCategories.filter((category) => category !== target.name)
      );
    }
  };

  useEffect(() => {
    updateCategoryPara(selectedCategories.join("%20"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategories]);

  const ratings = Array(4)
    .fill(0)
    .map((_, ind) => (
      <div
        key={ind * ind}
        className={`rounded-lg px-1 py-1.5 duration-300 hover:cursor-pointer ${
          queryPara.ratings == ind + 1 && "bg-primary-300"
        }`}
        onClick={() => updateRatingsPara(ind + 1)}
      >
        <RatingStar rating={ind + 1} starSize="20px" />
      </div>
    ));

  const categories = categoriesData?.categories.map((category) => (
    <li key={category._id} className="flex items-center gap-1">
      <input
        id={category._id}
        type="checkbox"
        className="peer rounded-md border-2 bg-primary-050 text-primary-800 shadow-sm hover:cursor-pointer focus:ring-2 focus:ring-primary-700 focus:ring-offset-1"
        onChange={filterCategories}
        name={category.name}
      />
      <label
        htmlFor={category._id}
        className="ml-1 select-none font-medium text-primary-900 hover:cursor-pointer"
      >
        {category.name}
      </label>
    </li>
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
          <ul className="p-1 text-sm xs:text-base">{categories}</ul>
        </div>
      </section>
    </aside>
  );
};
