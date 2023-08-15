import { FC } from "react";
import { useGetProductsQuery } from "../../services/productsApi";
import { convertToINR } from "../../utils/utils";
import { SpinningAnim } from "./../Loaders/SpinningAnim";
import BannerSlider from "./../Slider/BannerSlider";
import oneplus10R from "../../assets/Banner/onplus10R.png";
import s23Ultra from "../../assets/Banner/s23Ultra.jpg";
import iphone14 from "../../assets/Banner/iphone14.jpg";

export const Home: FC = () => {
  const { data, isLoading } = useGetProductsQuery();
  const banner = [oneplus10R, s23Ultra, iphone14];

  console.log("useGetProductsQuery", data);

  const products = data?.products.map((product) => (
    <div
      key={product._id}
      className="flex w-full flex-col border-2 border-gray-400 hover:cursor-pointer hover:border-gray-600 hover:drop-shadow-3xl"
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
          <div className="bg-background p-1">
            <p className="font-semibold text-gray-800">{product.name}</p>
            <p className="font-bold">{convertToINR(product.price)}</p>
          </div>
        </>
      )}
    </div>
  ));

  return (
    <div className="h-[100svh] p-2">
      <BannerSlider pictures={banner} />
      <section className="relative mt-5 flex h-96 flex-col items-center overflow-hidden">
        <h2 className="mb-2 w-full bg-gradient-to-r from-accent to-background to-90% pl-2 text-lg font-extrabold">
          New Arrivals
        </h2>
        <div className="grid w-full grid-flow-row grid-cols-fill-8 justify-center gap-1">
          {products}
        </div>
        <button className="absolute bottom-0 h-fit w-full border bg-gray-300 p-1 text-center font-semibold  text-textColor shadow-[0px_0px_20px_20px_rgba(0,0,0,0.3)] hover:bg-gray-400">
          See All
        </button>
      </section>
    </div>
  );
};
