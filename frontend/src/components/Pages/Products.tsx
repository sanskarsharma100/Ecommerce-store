import { FC, useEffect, useState } from "react";
import { useLazyGetProductsQuery } from "../../services/productsApi";
import { SpinningAnim } from "../Loaders/SpinningAnim";
import { convertToINR } from "../../utils/utils";
import { getProductPara } from "../../utils/types";
import { Pagination } from "../Products/Pagination";
import { SortBy } from "../Products/SortBy";
import { Filters } from "./../Products/Filters";
import iconCross from "../../assets/icons/iconCross.svg";
import iconSettings from "../../assets/icons/iconSettings.svg";

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

  const updateCategories = (categories: string) => {
    setQueryPara((para) => ({ ...para, category: categories }));
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
    <div
      key={product._id}
      className="flex w-full flex-col bg-background outline outline-1 -outline-offset-1 outline-gray-700 hover:cursor-pointer hover:border-gray-600 hover:drop-shadow-3xl xs:max-w-[15rem] xs:outline-2 ss:max-w-[15rem]"
    >
      {isLoading ? (
        <div className="m-auto flex items-center justify-center">
          <SpinningAnim />
        </div>
      ) : (
        <>
          <div className="flex h-full items-center justify-center p-1 xs:p-0">
            <img src={product.images[0].url} alt={product.name} />
          </div>
          <div className="p-1 text-xs">
            <p className="line-clamp-2 w-full overflow-hidden text-ellipsis font-semibold text-gray-800">
              {product.name}
            </p>
            <p className="font-bold">{convertToINR(product.price)}</p>
          </div>
        </>
      )}
    </div>
  ));

  useEffect(() => {
    getProducts(queryPara);
  }, [getProducts, queryPara]);

  return (
    <div className="relative m-auto flex h-full pb-4">
      {showFilter && (
        <div className="fixed z-30 min-h-screen w-screen bg-semiDarkOverlay xs:hidden"></div>
      )}
      {isFetching && (
        <div className="absolute flex h-full w-full items-center justify-center bg-semiDarkOverlay">
          <SpinningAnim />
        </div>
      )}
      <div
        className={`absolute z-50 h-full w-3/5 bg-[rgba(255,255,255,0.95)] xs:static xs:block xs:w-80 xs:bg-transparent ${
          !showFilter && "hidden"
        }`}
      >
        <img
          src={iconCross}
          alt="close filter menu"
          className="m-2 ml-auto w-6 p-0.5 duration-200 hover:cursor-pointer hover:border-[1px] hover:border-secondary xs:hidden"
          onClick={() => setShowFilter(false)}
        />
        <Filters updateCategories={updateCategories} showFilter={showFilter} />
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
          <div className="mt-2 grid grid-cols-2 xs:justify-between xs:gap-4 ss:grid-cols-3 sm:grid-cols-4 sm:gap-8">
            {products}
          </div>
        </section>
        <section className="mt-2 w-full">
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
