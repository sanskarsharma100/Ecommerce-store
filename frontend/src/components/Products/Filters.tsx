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
        className={`p-1 hover:cursor-pointer ${
          queryPara.ratings == ind + 1 && "border border-accent"
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
    <aside className="h-full p-2">
      <section className="m-auto w-full max-w-[8rem]">
        <div className="m-auto">
          <p className="mb-1 font-semibold xs:text-lg">Reviews</p>
          <div className="flex flex-col-reverse gap-1">{ratings}</div>
        </div>
        <div className="m-auto mt-2">
          <p className="mb-1 font-semibold xs:text-lg">Categories</p>
          <ul className="text-sm xs:text-base">{categories}</ul>
        </div>
      </section>
    </aside>
  );
};
