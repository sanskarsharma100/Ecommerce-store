import { FC, useEffect, useMemo, useRef, useState } from "react";
import { useGetProductsQuery } from "../../services/productsApi";
import { getProductPara, sortOptions } from "../../utils/types";
import { Pagination } from "../Products/Pagination";
import { SortBy } from "../Products/SortBy";
import { Filters } from "./../Products/Filters";
import { ProductCard } from "../Products/ProductCard";
import { useLocation } from "react-router-dom";
import { SpinningAnimDark } from "../Loaders/SpinningAnimDark";
import { ButtonClose } from "../Buttons/ButtonClose";

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
  const filterContainerRef = useRef<HTMLDivElement>(null);

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
    const handleOutsideClick = (e: Event) => {
      const target = e.target as HTMLElement;
      if (
        filterContainerRef.current &&
        !filterContainerRef.current.contains(target)
      ) {
        setShowFilter(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [queryPara.keyword, urlParams]);

  return (
    <div className="relative m-auto flex h-full min-h-[700px] pb-4">
      {showFilter && (
        <div className="fixed z-30 min-h-screen w-screen bg-semiDarkOverlay xs:hidden"></div>
      )}
      {(isFetching || isLoading) && (
        <div className="fixed z-[51] flex h-full w-full items-center justify-center bg-semiLightOverlay">
          <SpinningAnimDark size="5rem" width="8px" />
        </div>
      )}
      <div
        className={`absolute z-50 h-full w-3/5 bg-primary-050 xs:static xs:block xs:h-auto xs:w-60 xs:bg-background xs:bg-transparent md:w-80 ${
          !showFilter && "hidden"
        }`}
        ref={filterContainerRef}
      >
        <ButtonClose
          className="m-2 ml-auto xs:hidden"
          onClick={() => setShowFilter(false)}
        />
        <Filters
          updateCategoryPara={updateCategoryPara}
          updateRatingsPara={updateRatingsPara}
          queryPara={queryPara}
        />
      </div>
      <div className="w-full xs:max-w-[90%] xs:px-4">
        {(productsList && productsList.pages) || isLoading || isFetching ? (
          <>
            <section className="flex items-end gap-2 p-2 xs:pl-0">
              <div>
                <SortBy
                  selectedSort={selectedSort}
                  sortProducts={sortProducts}
                />
              </div>
              <button
                className="-m-0.5 w-fit select-none rounded-lg border-2 border-primary-900 px-2 py-0.5 text-sm font-semibold text-primary-900 duration-300 hover:cursor-pointer hover:ring-2 hover:ring-primary-500 active:ring-2 active:ring-primary-500 xs:hidden"
                onClick={() => setShowFilter(true)}
              >
                Filters
                {/* <img src={iconSettings} alt="Open Filters" className="w-8" /> */}
              </button>
            </section>
            <section className="m-auto">
              <div className="mt-2 grid grid-cols-2 xs:justify-between xs:gap-2 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 md:gap-4 lg:gap-6">
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
