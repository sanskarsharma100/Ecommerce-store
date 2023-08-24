import { FC, useState } from "react";
import { useGetProductsQuery } from "../../services/productsApi";
import { convertToINR } from "../../utils/utils";
import { SpinningAnim } from "./../Loaders/SpinningAnim";
import BannerSlider from "./../Slider/BannerSlider";
import oneplus10R from "../../assets/Banner/oneplus10R.png";
import s23Ultra from "../../assets/Banner/s23Ultra.jpg";
import iphone14 from "../../assets/Banner/iphone14.jpg";
import iphone14Poster from "../../assets/images/iphone14Poster.webp";
import appleMacbookPro from "../../assets/images/Macbook.jpg";
import { Link } from "react-router-dom";
import { getProductPara } from "../../utils/types";
import { ProductCard } from "../Products/ProductCard";

export const Home: FC = () => {
  const [queryPara, setQueryPara] = useState<getProductPara>({
    keyword: "",
    currentPage: 1,
    price: [0, 100000000],
    category: "",
    ratings: 0,
    sort: "relevance",
  });
  const { data: productsList, isLoading } = useGetProductsQuery(queryPara);
  const banner = [oneplus10R, s23Ultra, iphone14];

  console.log("useGetProductsQuery", productsList);

  const products = productsList?.products.map((product) => (
    <ProductCard product={product} isLoading={isLoading} />
    // <div
    //   key={product._id}
    //   className="flex w-full min-w-[10rem] flex-col border border-gray-400 hover:cursor-pointer hover:border-gray-600 hover:drop-shadow-3xl xs:min-w-[15rem] xs:border-2"
    // >
    //   {isLoading ? (
    //     <div className="m-auto flex items-center justify-center">
    //       <SpinningAnim />
    //     </div>
    //   ) : (
    //     <>
    //       <div className="flex h-full items-center justify-center">
    //         <img src={product.images[0].url} alt={product.name} />
    //       </div>
    //       <div className="bg-background p-1 text-dynamicText">
    //         <p className="line-clamp-2 w-full overflow-hidden text-ellipsis font-semibold">
    //           {product.name}
    //         </p>
    //         <p className="font-bold text-success">
    //           {convertToINR(product.price)}
    //         </p>
    //       </div>
    //     </>
    //   )}
    // </div>
  ));

  return (
    <div className="min-h-[400px]">
      <div className="mt-2 p-2 ss:p-4">
        <BannerSlider pictures={banner} />
        <section className="mt-4 flex w-full flex-col items-center xs:items-start">
          <div className="mb-2 flex w-full items-center bg-gradient-to-r from-accent to-background to-90%">
            <h2 className="pl-2 text-lg font-extrabold sm:text-xl">
              New Arrivals
            </h2>
            <Link
              to="/products"
              className="ml-auto mr-1 text-sm font-semibold text-gray-900 hover:text-accent hover:underline xs:block"
            >
              See All
            </Link>
          </div>
          <div className="relative w-full overflow-hidden overflow-x-auto">
            <div className="flex w-full justify-start gap-1 xs:gap-2">
              {products}
            </div>
          </div>
        </section>
        <section className="mt-4">
          <img
            src={appleMacbookPro}
            alt="Macbook Pro Poster"
            className="m-auto"
          />
        </section>
      </div>
    </div>
  );
};
