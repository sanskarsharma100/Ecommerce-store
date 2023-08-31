import { FC } from "react";
import { useGetCartProductsQuery } from "../../services/cartApi";
import { CartProductCard } from "../Cart/CartProductCard";
import { convertToINR } from "./../../utils/utils";
import { isErrorWithData, isErrorWithMessage } from "../../services/helpers";
import { SpinningAnim } from "./../Loaders/SpinningAnim";
import { useAppSelector } from "../../app/hooks";
import { selectCurrentUser } from "../../features/User/userSlice";
import { Link } from "react-router-dom";

export const Cart: FC = () => {
  const {
    data: cartData,
    isLoading,
    isError,
    error,
  } = useGetCartProductsQuery();

  const { isAuthenticated } = useAppSelector(selectCurrentUser);

  const cart = cartData && cartData.cart;

  const products = cart?.products.map((product) => (
    <CartProductCard product={product} key={product._id} />
  ));

  return !isAuthenticated ? (
    <div>
      <div className="flex min-h-[500px] items-center justify-center">
        <Link
          to="/login"
          className="flex w-fit items-center justify-center overflow-hidden border-2 border-black px-3 py-2 font-medium tracking-wider text-textColor duration-300 hover:bg-accent"
        >
          Login to Continue
        </Link>
      </div>
    </div>
  ) : isLoading ? (
    <div className="flex min-h-[500px] items-center justify-center">
      <SpinningAnim height="2.5rem" width="2.5rem" />
    </div>
  ) : cart && cart.products.length ? (
    <div className="m-2 mt-5 min-h-[500px]">
      <div className="gap-2 ss:flex lg:gap-4 ">
        <section className="w-full">
          <div className="flex flex-col gap-2">{products}</div>
          <hr className="my-1 w-full" />
          <div className="flex justify-between bg-background-3 p-2 text-sm ss:text-base ss:font-semibold">
            <span>Subtotal:</span>
            <span className="font-medium">{convertToINR(cart.cartPrice)}</span>
          </div>
        </section>
        <div className="flex w-full flex-col gap-2 ss:basis-1/2 sm:basis-5/12 lg:basis-4/12 lg:gap-4">
          <section className="mt-3 bg-background-3 p-2 ss:mt-0">
            <div>
              <div className="flex justify-between text-xs lg:text-base">
                <span>Subtotal:</span>
                <span>{convertToINR(cart.cartPrice)}</span>
              </div>
              <div className="flex justify-between text-xs lg:text-sm">
                <span>Shipping fee:</span>
                <span>{convertToINR(99)}</span>
              </div>
              <hr className="my-1 w-full border-black" />
              <div className="flex justify-between font-bold sm:text-lg">
                <span>Total:</span>
                <span>{convertToINR(cart.cartPrice + 99)}</span>
              </div>
            </div>
          </section>
          <button className="inline-block w-full max-w-xl overflow-hidden border-2 bg-accent p-2 text-center text-base font-extrabold tracking-wider text-textColor duration-300 hover:border-secondary hover:text-secondary">
            Place Order
          </button>
        </div>
      </div>
    </div>
  ) : !cart || !cart.products.length ? (
    <div className="flex min-h-[500px] items-center justify-center p-2 text-2xl font-bold ss:text-3xl">
      No products in the cart
    </div>
  ) : isError && isErrorWithData(error) && isErrorWithMessage(error.data) ? (
    <div className="text-error min-h-[500px] font-semibold">
      {error?.data.message}
    </div>
  ) : (
    <div className="min-h-[500px]">An Error Occurred</div>
  );
};
