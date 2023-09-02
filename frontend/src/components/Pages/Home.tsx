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
  const banner = [
    {
      image: oneplus10R,
      link: "/products/64da4240194d64167456e8ee",
    },
    {
      image: s23Ultra,
      link: "/products/64d7ac91c5171c84f9a0dfa1",
    },
    {
      image: iphone14,
      link: "/products/64d7ad71c5171c84f9a0dfa9",
    },
  ];

  const products = productsList?.products.map((product) => (
    <ProductCard key={product._id} product={product} isLoading={isLoading} />
  ));

  return (
    <div className="mb-2 min-h-[400px]">
      <BannerSlider pictures={banner} />
      <div className="p-2 ss:p-4">
        <section className="mt-4 flex w-full flex-col items-center overflow-hidden xs:items-start">
          <div className="mb-2 flex w-full items-center bg-gradient-to-r from-accent to-background to-[99%] py-1">
            <h2 className="pl-2 text-sm font-extrabold xs:text-base sm:text-xl">
              New Arrivals
            </h2>
            <Link
              to="/products"
              className="ml-auto mr-1 text-xs font-semibold text-gray-900 underline hover:text-accent hover:underline xs:block ss:text-sm ss:no-underline"
            >
              See All
            </Link>
          </div>
          <div
            className="w-full overflow-x-auto"
            ref={containerRef}
            {...swipeHandlers}
          >
            <div className="flex justify-start gap-2 p-0.5 xs:my-1 xs:w-[3000px] xs:gap-6">
              {products}
            </div>
          </div>
        </section>
        <section className="mt-4">
          <Link to={"/products/64d7a834c5171c84f9a0df8d"}>
            <img
              src={appleMacbookPro}
              alt="Macbook Pro Poster"
              className="m-auto"
            />
          </Link>
        </section>
      </div>
    </div>
  );
};
