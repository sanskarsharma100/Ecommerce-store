import { FC, useRef } from "react";
import { useGetProductsQuery } from "../../services/productsApi";
import BannerSlider from "./../Slider/BannerSlider";
import oneplus10R from "../../assets/Banner/oneplus10R.png";
import s23Ultra from "../../assets/Banner/s23Ultra.jpg";
import iphone14 from "../../assets/Banner/iphone14.jpg";
import appleMacbookPro from "../../assets/images/Macbook.jpg";
import { Link } from "react-router-dom";
import { getProductPara } from "../../utils/types";
import { ProductCard } from "../Products/ProductCard";
import useSwipe from "../../hooks/useSwipe";

export const Home: FC = () => {
  const queryPara = {
    keyword: "",
    currentPage: 1,
    price: [0, 100000000],
    category: "",
    ratings: 0,
    sort: "relevance",
  } as getProductPara;
  const { data: productsList, isLoading } = useGetProductsQuery(queryPara);
  const containerRef = useRef<HTMLDivElement>(null);
  const swipeHandlers = useSwipe({
    onSwipedLeft: () => {
      containerRef.current?.scrollBy(0, 125);
    },
    onSwipedRight: () => {
      containerRef.current?.scrollBy(0, -125);
    },
  });
  const banner = [oneplus10R, s23Ultra, iphone14];

  console.log("useGetProductsQuery", productsList);

  const products = productsList?.products.map((product) => (
    <ProductCard key={product._id} product={product} isLoading={isLoading} />
  ));

  return (
    <div className="min-h-[400px]">
      <div className="mt-2 p-2 ss:p-4">
        <BannerSlider pictures={banner} />
        <section className="mt-4 flex w-full flex-col items-center overflow-hidden xs:items-start">
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
          <div
            className="w-full overflow-x-auto"
            ref={containerRef}
            {...swipeHandlers}
          >
            <div className="flex justify-start gap-2 xs:w-[2000px] sm:gap-3 ">
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
