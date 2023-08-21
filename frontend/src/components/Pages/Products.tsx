import { FC, useEffect, useState } from "react";
import { useLazyGetProductsQuery } from "../../services/productsApi";
import { SpinningAnim } from "../Loaders/SpinningAnim";
import { convertToINR } from "../../utils/utils";
import { getProductPara } from "../../utils/types";

export const Products: FC = () => {
  const [queryPara, setQueryPara] = useState<getProductPara>({
    keyword: "",
    currentPage: 1,
    price: [0, 100000000],
    category: "",
    ratings: 0,
  });

  const [getProducts, { data: productsList, isLoading, isFetching }] =
    useLazyGetProductsQuery();

  console.log("useGetProductsQuery", productsList);

  const changePage = (pageNum: number) => {
    setQueryPara((para) => ({ ...para, currentPage: pageNum }));
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

  const pageBtns = Array(productsList?.pages)
    .fill(0)
    .map((_item, ind) => (
      <button
        key={ind + 1}
        className={`border border-gray-500 px-3 py-1 font-semibold hover:bg-hoverColor hover:font-bold ${
          queryPara.currentPage == ind + 1 && "bg-accent hover:!bg-accent"
        }`}
        onClick={() => changePage(ind + 1)}
      >
        {ind + 1}
      </button>
    ));

  return (
    <div className="relative h-full pb-4">
      {isFetching && (
        <div className="absolute flex h-full w-full items-center justify-center bg-semiDarkOverlay">
          <SpinningAnim />
        </div>
      )}
      <section>
        <div className="grid grid-cols-2">{products}</div>
      </section>
      <section className="mt-2 w-full">
        <div className="m-auto w-fit">
          <button
            className={`border border-gray-500 px-2 py-1 font-medium ${
              queryPara.currentPage <= 1
                ? "bg-gray-300 text-gray-500 hover:cursor-not-allowed"
                : "hover:bg-hoverColor"
            }`}
            onClick={() => changePage(queryPara.currentPage - 1)}
            disabled={queryPara.currentPage <= 1}
          >
            {"<<"}
          </button>
          {pageBtns}
          <button
            className={`border border-gray-500 px-2 py-1 font-medium ${
              queryPara.currentPage == productsList?.pages
                ? "bg-gray-300 text-gray-500 hover:cursor-not-allowed"
                : "hover:bg-hoverColor"
            }`}
            onClick={() => changePage(queryPara.currentPage + 1)}
            disabled={queryPara.currentPage == productsList?.pages}
          >
            {">>"}
          </button>
        </div>
      </section>
    </div>
  );
};
