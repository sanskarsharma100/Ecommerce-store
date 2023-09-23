import { FC, useState } from "react";
import { useGetProductDetailsQuery } from "../../services/productsApi";
import { GoTrash } from "react-icons/go";
import { Link } from "react-router-dom";
import {
  useDecreaseQuantityMutation,
  useIncreaseQuantityMutation,
  useRemoveProductFromCartMutation,
} from "../../services/cartApi";
import { convertToINR } from "../../utils/utils";
import { SpinningAnim } from "./../Loaders/SpinningAnim";
import { ButtonClose } from "./../Buttons/ButtonClose";
import { SpinningAnimDark } from "../Loaders/SpinningAnimDark";

type Product = {
  productId: string;
  quantity: number;
  totalPrice: number;
  _id: string;
};

type Props = {
  product: Product;
  isCartFetching: boolean;
};

export const CartProductCard: FC<Props> = ({ product, isCartFetching }) => {
  const { productId, quantity, totalPrice } = product;
  const [isImgLoaded, setIsImageLoaded] = useState<boolean>(false);
  const { data } = useGetProductDetailsQuery(product.productId);

  const [increaseQuantity, { isLoading: isIncreaseQuantityLoading }] =
    useIncreaseQuantityMutation();
  const [decreaseQuantity, { isLoading: isDecreaseQuantityLoading }] =
    useDecreaseQuantityMutation();
  const [removeProductFromCart, { isLoading: isRemoveProductLoading }] =
    useRemoveProductFromCartMutation();

  const addQuantity = () => {
    increaseQuantity(productId);
  };

  const reduceQuantity = () => {
    decreaseQuantity(productId);
  };

  const removeProduct = () => {
    removeProductFromCart(productId);
  };

  return data ? (
    <div
      className={`relative left-0 rounded-lg bg-primary-200 p-2 ${
        (isCartFetching ||
          isIncreaseQuantityLoading ||
          isDecreaseQuantityLoading ||
          isRemoveProductLoading) &&
        "before:absolute before:bottom-0 before:right-0 before:top-0 before:z-[1] before:h-full before:w-full before:bg-white/40 before:content-['']"
      }`}
    >
      {(isCartFetching ||
        isIncreaseQuantityLoading ||
        isDecreaseQuantityLoading ||
        isRemoveProductLoading) && (
        <div className="absolute m-auto flex h-full w-full items-center justify-center">
          <SpinningAnim />
        </div>
      )}
      <ButtonClose
        className="absolute right-0 top-0 m-2 !bg-primary-400 !p-0.5"
        onClick={removeProduct}
      />
      <div className="flex">
        <div className="max-w-[30%] xs:max-w-[20%] sm:w-[20%] sm:max-w-[15rem] lg:max-w-[12%]">
          <img
            className={isImgLoaded ? "" : "hidden"}
            src={data.product.images[0].url}
            alt={data.product.name}
            onLoad={() => setIsImageLoaded(true)}
          />
          {!isImgLoaded && (
            <div className="flex h-[150px] items-center justify-center">
              <SpinningAnimDark />
            </div>
          )}
        </div>
        <div className="ml-2 flex w-full flex-col justify-between">
          <div>
            <div className="pr-10 ss:pr-0">
              <Link
                to={`/products/${productId}`}
                className="line-clamp-2 text-ellipsis text-sm font-medium capitalize text-primary-900 xs:text-base sm:text-lg"
              >
                {data.product.name}
              </Link>
            </div>
            <div>
              <span className="text-sm font-semibold text-primary-900">
                {convertToINR(data.product.price)}
              </span>
            </div>
          </div>
          <div className="flex w-fit items-center border border-primary-900">
            <button
              className="group h-full border-r border-primary-900 px-2 text-sm xs:text-xl"
              onClick={quantity <= 1 ? removeProduct : reduceQuantity}
            >
              {quantity <= 1 ? (
                <GoTrash className="text-xs text-red-vivid-800 xs:text-base" />
              ) : (
                "-"
              )}
            </button>
            <span className="h-fit w-5 text-center text-sm font-bold leading-none text-primary-900 xs:w-8 xs:text-base sm:w-10 sm:text-lg">
              {quantity}
            </span>
            <button
              className={`border-l border-primary-900 px-2 text-sm text-primary-900 xs:text-xl ${
                (quantity >= 10 || quantity >= data.product.stock) &&
                "text-primary-500 hover:cursor-not-allowed"
              }`}
              onClick={addQuantity}
              disabled={quantity >= 10 || quantity >= data.product.stock}
            >
              +
            </button>
          </div>
        </div>
        <div className="hidden self-center ss:block">
          <span className="text-sm font-medium text-primary-900">
            {convertToINR(totalPrice)}
          </span>
        </div>
      </div>
    </div>
  ) : (
    <div>Error Occurred</div>
  );
};
