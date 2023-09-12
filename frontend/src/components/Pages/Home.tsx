import { FC, useRef } from "react";
import { useGetProductsQuery } from "../../services/productsApi";
import BannerSlider from "./../Slider/BannerSlider";
import { Link } from "react-router-dom";
import { getProductPara } from "../../utils/types";
import { ProductCard } from "../Products/ProductCard";
import useSwipe from "../../hooks/useSwipe";
import Jackets from "../../assets/categories/Jackets.jpg";
import Pants from "../../assets/categories/Pants.jpg";
import Shirts from "../../assets/categories/Shirts.jpg";
import Tshirts from "../../assets/categories/Tshirts.jpg";
import { SpinningAnimDark } from "../Loaders/SpinningAnimDark";

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

  const categoryData = [
    {
      imgSrc: Tshirts,
      name: "T-shirts",
      link: "/products?keyword=&category=T-Shirts&price%5Bgte%5D=0&price%5Blte%5D=1000000&ratings=0&sort=relevance&page=1",
    },
    {
      imgSrc: Shirts,
      name: "Shirts",
      link: "/products?keyword=&category=Shirts&price%5Bgte%5D=0&price%5Blte%5D=1000000&ratings=0&sort=relevance&page=1",
    },
    {
      imgSrc: Jackets,
      name: "Jackets",
      link: "/products?keyword=&category=Jackets&price%5Bgte%5D=0&price%5Blte%5D=1000000&ratings=0&sort=relevance&page=1",
    },
    {
      imgSrc: Pants,
      name: "Pants",
      link: "/products?keyword=&category=Pants&price%5Bgte%5D=0&price%5Blte%5D=1000000&ratings=0&sort=relevance&page=1",
    },
  ];

  const products = productsList?.products
    .slice(0, 4)
    .map((product) => (
      <ProductCard key={product._id} product={product} isLoading={isLoading} />
    ));

  return (
    <div className="min-h-[400px] pb-20">
      <BannerSlider pictures={banner} />
      <div className="mt-10 scroll-mt-16 p-2 ss:p-4" id="featured-products">
        <section className="mt-4 flex w-full flex-col items-center overflow-hidden xs:items-start">
          <h2 className="m-auto mb-4 w-fit whitespace-nowrap border-b border-primary-900 px-4 pb-2 text-2xl font-light tracking-widest text-primary-900 xs:text-3xl ss:mb-8 sm:text-4xl md:text-5xl">
            New Arrivals
          </h2>
          <div
            className="no-scrollbar w-full overflow-x-auto"
            ref={containerRef}
            {...swipeHandlers}
          >
            {isLoading ? (
              <div className="flex h-48 w-full items-center justify-center overflow-hidden xs:h-96">
                <SpinningAnimDark size="40px" width="6px" />
              </div>
            ) : (
              <div className="grid grid-cols-2 justify-items-center gap-2 p-0.5 xs:my-1 xs:gap-4 xs:gap-y-8 sm:grid-cols-4">
                {products}
              </div>
            )}
          </div>
          <Link
            to="/products"
            className="w-full pt-3 text-center text-lg font-semibold tracking-wider text-light-blue-vivid-900 underline hover:underline xs:block ss:text-xl ss:no-underline"
          >
            View More
          </Link>
        </section>
        <section className="mt-20">
          <h2 className="m-auto mb-4 w-fit whitespace-nowrap border-b border-primary-900 px-4 pb-2 text-2xl font-light tracking-widest text-primary-900 xs:text-3xl ss:mb-8 sm:text-4xl md:text-5xl">
            Categories
          </h2>
          <div className="grid grid-cols-2 gap-2 xs:gap-4 sm:grid-cols-4 sm:gap-2 md:gap-4">
            {categoryData.map((category) => (
              <Link to={category.link} key={category.imgSrc}>
                <div className="group relative overflow-hidden">
                  <img
                    src={category.imgSrc}
                    className="duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 flex items-center justify-center text-center text-lg font-bold uppercase tracking-widest text-white transition duration-500 ease-out group-hover:bg-black/60 xs:text-xl xs:font-extrabold sm:text-lg sm:font-bold md:text-xl md:font-extrabold">
                    <h3>{category.name}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
