import { FC, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
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
      <SpinningAnim size="2.5rem" />
    </div>
  ) : product ? (
    <div className="mb-10 mt-6 min-h-[500px] p-2">
      <div className="m-auto flex h-full flex-col items-stretch gap-5 sm:flex-row lg:w-4/5">
        <section className="min-w-full xs:m-auto xs:min-w-[80%] xs:max-w-[40%] ss:max-w-[50%] sm:min-w-[50%]">
          <ImagesPreview pictures={product.images} />
        </section>
        <section className="mx-auto flex w-full max-w-[30rem] flex-col justify-between sm:max-w-[25rem]">
          <div className="mb-auto">
            <p className="text-xs text-grayCustom ss:text-sm">
              {product.category}
            </p>
            <h1 className="text-lg font-bold text-grayDarker ss:text-3xl ss:font-bold">
              {product.name}
            </h1>
            <h3 className="text-grayCustom ss:text-lg">
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
              <div className="text-lg font-extrabold text-grayDarker ss:text-2xl sm:mb-2 sm:text-3xl">
                {convertToINR(product.price)}
              </div>
              {isOutOfStock ? (
                <button className="inline-block w-full max-w-xl overflow-hidden border-2 bg-grayCustom p-2 text-center text-base font-extrabold tracking-wider text-grayDarker hover:cursor-default">
                  Out of stock
                </button>
              ) : isCartLoading ? (
                <button className="inline-block w-full max-w-xl overflow-hidden border-2 p-2 text-center text-base font-extrabold tracking-wider text-textColor duration-300 hover:cursor-default">
                  <SpinningAnim />
                </button>
              ) : isAddToCartLoading ? (
                <button className="flex w-full max-w-xl items-center justify-center overflow-hidden border-2 bg-accent p-2 text-center text-base font-extrabold tracking-wider text-textColor duration-300 hover:border-secondary hover:text-secondary">
                  <SpinningAnim />
                </button>
              ) : isSuccess || isProductInCart ? (
                <Link
                  to="/cart"
                  className="block w-full max-w-xl overflow-hidden border-2 bg-accent p-2 text-center text-base font-extrabold tracking-wider text-textColor duration-300 hover:border-secondary hover:text-secondary"
                >
                  Go to Cart
                </Link>
              ) : (
                <button
                  className="w-full max-w-xl overflow-hidden border-2 bg-accent p-2 text-center text-base font-extrabold tracking-wider text-textColor duration-300 hover:border-secondary hover:text-secondary"
                  onClick={
                    isAuthenticated ? addToCart : () => navigate("/login")
                  }
                >
                  {isAuthenticated ? "Add to Cart" : "Login to Continue"}
                </button>
              )}
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
