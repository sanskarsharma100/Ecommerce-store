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
import { SpinningAnim } from "../Loaders/SpinningAnim";

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
      image:
        "https://images.pexels.com/photos/6800327/pexels-photo-6800327.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      link: "/products",
    },
    {
      image:
        "https://images.pexels.com/photos/5709665/pexels-photo-5709665.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      link: "/products",
    },
    {
      image:
        "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      link: "/products",
    },
  ];

  const products = productsList?.products.map((product) => (
    <ProductCard key={product._id} product={product} isLoading={isLoading} />
  ));

  return (
    <div className="min-h-[400px] pb-2">
      <BannerSlider pictures={banner} />
      <div className="scroll-mt-16 p-2 ss:p-4" id="featured-products">
        <section className="mt-4 flex w-full flex-col items-center overflow-hidden xs:items-start">
          <div className="relative mb-4 w-full">
            <h2 className="m-auto w-6/12 whitespace-nowrap border-b border-primary-900 pb-1 text-center text-2xl font-light text-primary-900 xs:text-3xl sm:text-4xl md:text-5xl">
              New Arrivals
            </h2>
            <Link
              to="/products"
              className="absolute bottom-0 right-0 ml-auto w-fit text-xs font-semibold text-light-blue-vivid-900 underline hover:text-accent hover:underline xs:block ss:text-sm ss:no-underline"
            >
              View More
            </Link>
          </div>
          <div
            className="w-full overflow-x-auto"
            ref={containerRef}
            {...swipeHandlers}
          >
            {isLoading ? (
              <div className="flex h-48 w-full items-center justify-center overflow-hidden xs:h-96">
                <SpinningAnim size="40px" width="6px" />
              </div>
            ) : (
              <div className="flex justify-start gap-2 p-0.5 xs:my-1 xs:w-[3000px] xs:gap-6">
                {products}
              </div>
            )}
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
