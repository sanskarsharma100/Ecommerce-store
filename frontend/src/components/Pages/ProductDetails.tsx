import { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetProductDetailsQuery } from "../../services/productsApi";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import { RatingStar } from "./../RatingStar";
import { convertToINR } from "./../../utils/utils";
import ImagesPreview from "../Products/ImagesPreview";
import { SpinningAnim } from "../Loaders/SpinningAnim";
import {
  useAddProductToCartMutation,
  useGetCartProductsQuery,
} from "../../services/cartApi";
import { useAppSelector } from "../../app/hooks";
import { selectCurrentUser } from "../../features/User/userSlice";
import { ButtonPrimary } from "../Buttons/ButtonPrimary";
import { ButtonWarning } from "../Buttons/ButtonWarning";
import { SpinningAnimDark } from "../Loaders/SpinningAnimDark";

export const ProductDetails: FC = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAppSelector(selectCurrentUser);
  const [isProductInCart, setIsProductInCart] = useState<boolean>(false);
  const { data: productData, isLoading: isProductLoading } =
    useGetProductDetailsQuery(productId ?? skipToken);
  const [addProductToCart, { isLoading: isAddToCartLoading, isSuccess }] =
    useAddProductToCartMutation();
  const { data: cartData, isLoading: isCartLoading } =
    useGetCartProductsQuery();
  const product = productData && productData.product;
  const cart = cartData && cartData.cart;

  const isOutOfStock = product?.stock == 0;

  const addToCart = () => {
    addProductToCart({ productId: productId });
  };

  useEffect(() => {
    const cartProduct = cart?.products.some(
      (product) => product.productId === productId
    );
    if (cartProduct) {
      setIsProductInCart(true);
    }
  }, [cart, productId]);

  return isProductLoading ? (
    <div className="flex min-h-[500px] items-center justify-center">
      <SpinningAnimDark size="2.5rem" />
    </div>
  ) : product ? (
    <div className="mb-10 mt-6 min-h-[500px] p-2">
      <div className="m-auto flex h-full flex-col items-stretch gap-5 sm:flex-row lg:w-4/5">
        <section className="min-w-full xs:m-auto xs:min-w-[80%] xs:max-w-[40%] ss:max-w-[50%] sm:min-w-[50%]">
          <ImagesPreview pictures={product.images} />
        </section>
        <section className="mx-auto flex w-full max-w-[30rem] flex-col justify-between sm:max-w-[25rem]">
          <div className="mb-auto">
            <p className="text-xs font-medium text-primary-800 ss:text-sm">
              {product.category}
            </p>
            <h1 className="text-lg font-bold capitalize text-primary-900 ss:text-3xl ss:font-bold">
              {product.name}
            </h1>
            <h3 className="text-sm font-medium text-primary-500 ss:text-base">
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
            <div className="mt-2 sm:mt-6">
              <div className="text-lg font-extrabold text-primary-900 ss:text-2xl sm:mb-2 sm:text-3xl">
                {convertToINR(product.price)}
              </div>
              {isOutOfStock ? (
                <ButtonWarning className="hover:!cursor-not-allowed" disabled>
                  Out of stock
                </ButtonWarning>
              ) : isCartLoading ? (
                <ButtonPrimary>
                  <SpinningAnim />
                </ButtonPrimary>
              ) : isAddToCartLoading ? (
                <ButtonPrimary>
                  <SpinningAnim />
                </ButtonPrimary>
              ) : isSuccess || isProductInCart ? (
                <ButtonPrimary to="/cart">Go to Cart</ButtonPrimary>
              ) : (
                <ButtonPrimary
                  onClick={
                    isAuthenticated ? addToCart : () => navigate("/login")
                  }
                >
                  {isAuthenticated ? "Add to Cart" : "Login to Continue"}
                </ButtonPrimary>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  ) : (
    <div className="flex min-h-[500px] items-center justify-center text-3xl text-red-vivid-600">
      <div>Error Occurred</div>
    </div>
  );
};
