import { FC, useEffect, useState } from "react";
import { useLazyGetProductsQuery } from "../../services/productsApi";
import { SpinningAnim } from "../Loaders/SpinningAnim";
import { getProductPara } from "../../utils/types";
import { Pagination } from "../Products/Pagination";
import { SortBy } from "../Products/SortBy";
import { Filters } from "./../Products/Filters";
import iconCross from "../../assets/icons/iconCross.svg";
import iconSettings from "../../assets/icons/iconSettings.svg";
import { ProductCard } from "../Products/ProductCard";

export const Products: FC = () => {
  const [queryPara, setQueryPara] = useState<getProductPara>({
    keyword: "",
    currentPage: 1,
    price: [0, 100000000],
    category: "",
    ratings: 0,
    sort: "relevance",
  });

  const [selectedSort, setSelectedSort] = useState<string>("Relevance");
  const [showFilter, setShowFilter] = useState<boolean>(false);

  const [getProducts, { data: productsList, isLoading, isFetching }] =
    useLazyGetProductsQuery();

  console.log("useGetProductsQuery", productsList);

  if (showFilter) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }

  const changePage = (pageNum: number) => {
    setQueryPara((para) => ({ ...para, currentPage: pageNum }));
  };

  const updateCategoryPara = (categories: string) => {
    console.log("categories", categories);
    setQueryPara((para) => ({ ...para, category: categories }));
  };

  const updateRatingsPara = (ratings: number) => {
    setQueryPara((para) => ({
      ...para,
      ratings: queryPara.ratings == ratings ? 0 : ratings,
    }));
  };

  const sortProducts = (sortBy: { label: string; value: string }) => {
    setSelectedSort(sortBy.label);
    setQueryPara((para) => ({
      ...para,
      sort: sortBy.value as
        | "increasing"
        | "decreasing"
        | "ratings"
        | "relevance",
    }));
  };

  const products = productsList?.products.map((product) => (
    <ProductCard product={product} isLoading={isLoading} />
  ));

  useEffect(() => {
    getProducts(queryPara);
  }, [getProducts, queryPara]);

  return (
    <div className="m-auto flex h-full min-h-[500px] pb-4">
      {showFilter && (
        <div className="fixed z-30 min-h-screen w-screen bg-semiDarkOverlay xs:hidden"></div>
      )}
      {isFetching && (
        <div className="absolute flex h-full w-full items-center justify-center bg-[rgba(0,0,0,0.1)]">
          <SpinningAnim height="5rem" width="5rem" />
        </div>
      )}
      <div
        className={`absolute z-50 h-full w-3/5 bg-[rgba(255,255,255,0.95)] xs:static xs:block xs:w-60 xs:bg-transparent md:w-80 ${
          !showFilter && "hidden"
        }`}
      >
        <img
          src={iconCross}
          alt="close filter menu"
          className="m-2 ml-auto w-6 p-0.5 duration-200 hover:cursor-pointer hover:border-[1px] hover:border-secondary xs:hidden"
          onClick={() => setShowFilter(false)}
        />
        <Filters
          updateCategoryPara={updateCategoryPara}
          updateRatingsPara={updateRatingsPara}
          queryPara={queryPara}
        />
      </div>
      <div className="xs:max-w-[90%] xs:px-4">
        <section className="flex w-fit items-end p-2">
          <button
            className="mr-2 h-fit border border-secondary p-1 text-sm font-semibold duration-300 hover:cursor-pointer hover:bg-accent xs:hidden"
            onClick={() => setShowFilter(!showFilter)}
          >
            <img src={iconSettings} alt="Open Filters" className="w-8" />
          </button>
          <div>
            <SortBy selectedSort={selectedSort} sortProducts={sortProducts} />
          </div>
        </section>
        <section className="m-auto">
          <div className="mt-2 grid grid-cols-2 xs:justify-between xs:gap-2 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 md:gap-8">
            {products}
          </div>
        </section>
        <section className="mt-4 w-full">
          <Pagination
            currentPage={queryPara.currentPage}
            numOfPages={productsList?.pages}
            changePage={changePage}
          />
        </section>
      </div>
    </div>
  );
};
