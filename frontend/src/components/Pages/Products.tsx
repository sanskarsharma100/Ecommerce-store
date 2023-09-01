import { FC, useEffect, useMemo, useState } from "react";
import { useGetProductsQuery } from "../../services/productsApi";
import { SpinningAnim } from "../Loaders/SpinningAnim";
import { getProductPara, sortOptions } from "../../utils/types";
import { Pagination } from "../Products/Pagination";
import { SortBy } from "../Products/SortBy";
import { Filters } from "./../Products/Filters";
import iconCross from "../../assets/icons/iconCross.svg";
import iconSettings from "../../assets/icons/iconSettings.svg";
import { ProductCard } from "../Products/ProductCard";
import { useLocation } from "react-router-dom";

export const Products: FC = () => {
  const location = useLocation();

  const searchParams = useMemo(() => {
    const searchParams = new URLSearchParams(location.search);
    return { searchParams };
  }, [location.search]);

  const urlParams = searchParams.searchParams;

  const [queryPara, setQueryPara] = useState<getProductPara>({
    keyword: urlParams.get("keyword") || "",
    currentPage: Number(urlParams.get("currentPage")) || 1,
    price: [0, 100000000],
    category: urlParams.get("category") || "",
    ratings: Number(urlParams.get("ratings")) || 0,
    sort: (urlParams.get("sort") as sortOptions) || "relevance",
  });

  const [selectedSort, setSelectedSort] = useState<string>("Relevance");
  const [showFilter, setShowFilter] = useState<boolean>(false);

  const {
    data: productsList,
    isLoading,
    isFetching,
  } = useGetProductsQuery(queryPara);

  if (showFilter) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }

  const changePage = (pageNum: number) => {
    setQueryPara((para) => ({ ...para, currentPage: pageNum }));
  };

  const updateCategoryPara = (categories: string) => {
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
    <ProductCard key={product._id} product={product} isLoading={isLoading} />
  ));

  useEffect(() => {
    if (urlParams.get("keyword") != queryPara.keyword) {
      setQueryPara((para) => ({
        ...para,
        keyword: urlParams.get("keyword") || "",
      }));
    }
  }, [queryPara.keyword, urlParams]);

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
      <div className="w-full xs:max-w-[90%] xs:px-4">
        {(productsList && productsList.currentProductCount) ||
        isLoading ||
        isFetching ? (
          <>
            <section className="flex w-fit items-end p-2">
              <button
                className="mr-2 h-fit border border-secondary p-1 text-sm font-semibold duration-300 hover:cursor-pointer hover:bg-accent xs:hidden"
                onClick={() => setShowFilter(!showFilter)}
              >
                <img src={iconSettings} alt="Open Filters" className="w-8" />
              </button>
              <div>
                <SortBy
                  selectedSort={selectedSort}
                  sortProducts={sortProducts}
                />
              </div>
            </section>
            <section className="m-auto">
              <div className="mt-2 grid grid-cols-2 xs:justify-between xs:gap-2 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 md:gap-8">
                {products}
              </div>
            </section>
            {productsList && productsList?.pages > 1 && (
              <section className="mt-4 w-full">
                <Pagination
                  currentPage={queryPara.currentPage}
                  numOfPages={productsList?.pages}
                  changePage={changePage}
                />
              </section>
            )}
          </>
        ) : (
          <>
            <div className="flex h-full w-full items-center justify-center text-3xl">
              No Products Found
            </div>
          </>
        )}
      </div>
    </div>
  );
};
