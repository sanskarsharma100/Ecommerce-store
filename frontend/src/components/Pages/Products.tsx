import { FC, useEffect, useState } from "react";
import { useLazyGetProductsQuery } from "../../services/productsApi";
import { SpinningAnim } from "../Loaders/SpinningAnim";
import { convertToINR } from "../../utils/utils";
import { getProductPara } from "../../utils/types";
import { Pagination } from "../Pagination/Pagination";
import { SortBy } from "../Products/SortBy";

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

  const [getProducts, { data: productsList, isLoading, isFetching }] =
    useLazyGetProductsQuery();

  console.log("useGetProductsQuery", productsList);

  const changePage = (pageNum: number) => {
    setQueryPara((para) => ({ ...para, currentPage: pageNum }));
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
      className="flex w-full flex-col bg-primary outline outline-1 -outline-offset-1 outline-gray-700 hover:cursor-pointer hover:border-gray-600 hover:drop-shadow-3xl xs:min-w-[10rem]"
    >
      {isLoading ? (
        <div className="m-auto flex items-center justify-center">
          <SpinningAnim />
        </div>
      ) : (
        <>
          <div className="flex h-full items-center justify-center p-1">
            <img src={product.images[0].url} alt={product.name} />
          </div>
          <div className=" p-1 text-xs">
            <p className="w-full overflow-clip text-ellipsis font-semibold text-gray-800">
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
    <div className="relative mt-4 h-full pb-4">
      {isFetching && (
        <div className="absolute flex h-full w-full items-center justify-center bg-semiDarkOverlay">
          <SpinningAnim />
        </div>
      )}
      <section className="w-fit p-2">
        <SortBy selectedSort={selectedSort} sortProducts={sortProducts} />
      </section>
      <section>
        <div className="mt-2 grid grid-cols-2">{products}</div>
      </section>
      <section className="mt-2 w-full">
        <Pagination
          currentPage={queryPara.currentPage}
          numOfPages={productsList?.pages}
          changePage={changePage}
        />
      </section>
    </div>
  );
};
