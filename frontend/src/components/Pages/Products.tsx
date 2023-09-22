import { FC, useEffect, useMemo, useRef, useState } from "react";
import { useGetProductsQuery } from "../../services/productsApi";
import { sortOptions } from "../../utils/types";
import { Pagination } from "../Products/Pagination";
import { SortBy } from "../Products/SortBy";
import { Filters } from "./../Products/Filters";
import { ProductCard } from "../Products/ProductCard";
import { useSearchParams } from "react-router-dom";
import { SpinningAnimDark } from "../Loaders/SpinningAnimDark";
import { ButtonClose } from "../Buttons/ButtonClose";

export const Products: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const price = useMemo(() => {
    return [0, 1000000];
  }, []);

  const keyword = searchParams.get("keyword") || "";
  const currentPage = Number(searchParams.get("page")) || 1;
  const category = searchParams.get("category") || "";
  const ratings = Number(searchParams.get("ratings")) || 0;
  const sort = (searchParams.get("sort") as sortOptions) || "relevance";

  const [showFilter, setShowFilter] = useState<boolean>(false);
  const filterContainerRef = useRef<HTMLDivElement>(null);

  const {
    data: productsList,
    isLoading,
    isFetching,
  } = useGetProductsQuery({
    keyword,
    currentPage,
    price,
    category,
    ratings,
    sort,
  });

  if (showFilter) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }

  const products = productsList?.products.map((product) => (
    <ProductCard key={product._id} product={product} isLoading={isLoading} />
  ));

  useEffect(() => {
    setSearchParams(
      `?keyword=${keyword}&category=${category}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings=${ratings}&sort=${sort}&page=${currentPage}`,
      history.state
    );
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
  }, [category, currentPage, keyword, price, ratings, setSearchParams, sort]);

  return (
    <div className="relative m-auto flex h-full min-h-[700px] pb-4">
      {showFilter && (
        <div className="fixed z-30 min-h-screen w-screen bg-black/40 xs:hidden"></div>
      )}
      {(isFetching || isLoading) && (
        <div className="fixed z-[51] flex h-full w-full items-center justify-center bg-white/40">
          <SpinningAnimDark size="5rem" width="8px" />
        </div>
      )}
      <div
        className={`absolute z-50 h-full w-3/5 bg-background xs:static xs:block xs:h-auto xs:w-60 xs:bg-transparent md:w-80 ${
          !showFilter && "hidden"
        }`}
        ref={filterContainerRef}
      >
        <ButtonClose
          className="m-2 ml-auto xs:hidden"
          onClick={() => setShowFilter(false)}
        />
        <Filters
          queryPara={{
            keyword,
            currentPage,
            price,
            category,
            ratings,
            sort,
          }}
        />
      </div>
      <div className="w-full xs:max-w-[90%] xs:px-4">
        {(productsList && productsList.pages) || isLoading || isFetching ? (
          <>
            <section className="flex items-end gap-2 p-2 xs:pl-0">
              <div>
                <SortBy
                  queryPara={{
                    keyword,
                    currentPage,
                    price,
                    category,
                    ratings,
                    sort,
                  }}
                />
              </div>
              <button
                className="flex w-fit select-none items-center justify-center rounded-lg bg-primary-200 px-2.5 py-1.5 text-sm font-semibold text-primary-900 duration-300 hover:cursor-pointer hover:ring-2 hover:ring-primary-500 active:ring-2 active:ring-primary-500 xs:hidden"
                onClick={() => setShowFilter(true)}
              >
                Filters
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
                  currentPage={currentPage}
                  numOfPages={productsList?.pages}
                  queryPara={{
                    keyword,
                    currentPage,
                    price,
                    category,
                    ratings,
                    sort,
                  }}
                />
              </section>
            )}
          </>
        ) : (
          <>
            <div className="flex h-full w-full items-center justify-center text-3xl text-primary-900">
              No Products Found
            </div>
          </>
        )}
      </div>
    </div>
  );
};
