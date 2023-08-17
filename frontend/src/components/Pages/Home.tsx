import { FC } from "react";
import { useGetProductsQuery } from "../../services/productsApi";
import { convertToINR } from "../../utils/utils";
import { SpinningAnim } from "./../Loaders/SpinningAnim";
import BannerSlider from "./../Slider/BannerSlider";
import oneplus10R from "../../assets/Banner/onplus10R.png";
import s23Ultra from "../../assets/Banner/s23Ultra.jpg";
import iphone14 from "../../assets/Banner/iphone14.jpg";
import iphone14Poster from "../../assets/images/iphone14Poster.webp";
import { Footer } from "./../Footer/Footer";
import { Link } from "react-router-dom";

export const Home: FC = () => {
  const { data, isLoading } = useGetProductsQuery();
  const banner = [oneplus10R, s23Ultra, iphone14];

  console.log("useGetProductsQuery", data);

  const products = data?.products.map((product) => (
    <div
      key={product._id}
      className="flex w-full min-w-[8rem] flex-col border-2 border-gray-400 hover:cursor-pointer hover:border-gray-600 hover:drop-shadow-3xl"
    >
      {isLoading ? (
        <div className="m-auto flex items-center justify-center">
          <SpinningAnim />
        </div>
      ) : (
        <>
          <div className="flex h-full items-center justify-center">
            <img src={product.images[0].url} alt={product.name} />
          </div>
          <div className="bg-background p-1 text-xs">
            <p className="w-full overflow-clip text-ellipsis font-semibold text-gray-800">
              {product.name}
            </p>
            <p className="font-bold">{convertToINR(product.price)}</p>
          </div>
        </>
      )}
    </div>
  ));

  return (
    <div className="min-h-screen">
      <div className="p-2">
        <BannerSlider pictures={banner} />
        <section className="mt-4 flex w-full flex-col items-center xs:items-start">
          <div className="mb-2 flex w-full items-center bg-gradient-to-r from-accent to-background to-90%">
            <h2 className="pl-2 text-lg font-extrabold">New Arrivals</h2>
            <Link
              to="/"
              className="ml-auto mr-1 hidden text-xs font-semibold text-gray-900 hover:underline xs:block"
            >
              See All
            </Link>
          </div>
          <div className="relative h-96 w-full overflow-hidden xs:h-auto xs:overflow-x-auto">
            <div className="grid w-fit grid-cols-3 justify-center xs:flex xs:w-full xs:justify-start xs:gap-2">
              {products}
            </div>
            <button className="absolute bottom-0 h-fit w-full border bg-gray-300 p-1 text-center font-semibold text-textColor shadow-[0px_0px_20px_20px_rgba(0,0,0,0.3)] hover:bg-gray-400 xs:hidden">
              See All
            </button>
          </div>
        </section>
        <section>
          <img src={iphone14Poster} alt="iphone 14 Poster" className="mt-2" />
        </section>
      </div>
      <Footer />
    </div>
  );
};
