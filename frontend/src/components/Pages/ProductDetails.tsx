import { FC, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetProductDetailsQuery } from "../../services/productsApi";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import { RatingStar } from "./../RatingStar";
import { convertToINR } from "./../../utils/utils";
import ImagesPreview from "../Products/ImagesPreview";

export const ProductDetails: FC = () => {
  const { id: productId } = useParams();
  const [quantity, setQuantity] = useState<number>(1);
  const { data, isLoading } = useGetProductDetailsQuery(productId ?? skipToken);
  const product = data && data.product && data.product;

  if (quantity <= 0) {
    setQuantity(1);
  }

  if (quantity > 10) {
    setQuantity(10);
  }

  console.log("product", product);

  return product ? (
    <div className="mb-10 mt-6 min-h-[500px] p-2">
      <div className="m-auto flex h-full flex-col items-stretch gap-5 sm:flex-row lg:w-4/5">
        <section className="min-w-full xs:min-w-[80%] sm:min-w-[50%]">
          <ImagesPreview pictures={product.images} />
        </section>
        <section className="mx-auto flex w-full max-w-[30rem] flex-col justify-between sm:max-w-[25rem]">
          <div className="mb-auto">
            <p className="text-xs text-grayDarker ss:text-sm">
              {product.category}
            </p>
            <h1 className="text-lg font-bold ss:text-4xl ss:font-extrabold">
              {product.name}
            </h1>
            <h3 className="text-grayDarker ss:text-lg">
              {product.description}
            </h3>
            <div className="flex max-w-[8rem] items-center gap-1 ss:hidden ss:max-w-[9rem]">
              <RatingStar rating={product.ratings} />
              <span>
                {product.ratings}
                <span>{"(" + product.reviews.length + ")"}</span>
              </span>
            </div>
            <div className="hidden max-w-[8rem] items-center gap-1 ss:flex ss:max-w-[9rem]">
              <RatingStar rating={product.ratings} starSize="20px" />
              <span>
                {product.ratings}
                <span>{"(" + product.reviews.length + ")"}</span>
              </span>
            </div>
          </div>
          <div className="mt-8 sm:mt-auto">
            <div className="flex w-fit border border-secondary">
              <button
                className={`border-r border-secondary px-2 text-xl font-extrabold ${
                  quantity <= 1 && "text-grayDarker"
                }`}
                onClick={() => setQuantity(quantity - 1)}
              >
                -
              </button>
              <div className="h-full w-10 text-center text-lg font-bold">
                {quantity}
              </div>
              <button
                className={`border-l border-secondary px-2 text-xl font-bold ${
                  quantity >= 10 && "text-grayDarker"
                }`}
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
            </div>
            <div className="mt-2 sm:mt-6">
              <div className="text-lg font-extrabold ss:text-3xl sm:mb-2">
                {convertToINR(product.price)}
              </div>
              <button className="inline-block w-full max-w-xl overflow-hidden border-2 bg-accent p-2 text-center text-base font-bold tracking-wider text-textColor duration-300 hover:border-secondary hover:text-secondary">
                Add to Cart
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  ) : (
    <div>
      <div>Error Occurred</div>
    </div>
  );
};
