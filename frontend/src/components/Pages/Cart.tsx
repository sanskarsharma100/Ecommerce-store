import { FC } from "react";
import { useGetCartProductsQuery } from "../../services/cartApi";
import { CartProductCard } from "../Cart/CartProductCard";
import { convertToINR } from "./../../utils/utils";
import { isErrorWithData, isErrorWithMessage } from "../../services/helpers";
import { useAppSelector } from "../../app/hooks";
import { selectCurrentUser } from "../../features/User/userSlice";
import { ButtonPrimary } from "../Buttons/ButtonPrimary";
import { SpinningAnimDark } from "../Loaders/SpinningAnimDark";

export const Cart: FC = () => {
  const {
    data: cartData,
    isLoading: isCartLoading,
    isFetching: isCartFetching,
    isError,
    error,
  } = useGetCartProductsQuery();

  const { isAuthenticated } = useAppSelector(selectCurrentUser);

  const cart = cartData && cartData.cart;

  const products = cart?.products.map((product) => (
    <CartProductCard
      product={product}
      isCartFetching={isCartFetching}
      key={product._id}
    />
  ));

  return !isAuthenticated ? (
    <div>
      <div className="flex min-h-[500px] items-center justify-center">
        <ButtonPrimary to="/login" className="!w-fit px-4 py-3">
          Login to Continue
        </ButtonPrimary>
      </div>
    </div>
  ) : isCartLoading ? (
    <div className="flex min-h-[500px] items-center justify-center">
      <SpinningAnimDark size="2.5rem" />
    </div>
  ) : cart && cart.products.length ? (
    <div className="m-2 mt-5 min-h-[500px]">
      <div className="gap-2 ss:flex lg:gap-4 ">
        <section className="w-full">
          <div className="flex flex-col gap-1">{products}</div>
          <hr className="my-1 w-full border border-primary-500" />
          <div className="flex justify-between rounded-lg bg-primary-200 p-2 text-sm text-primary-900 ss:text-base ss:font-semibold">
            <span>Subtotal:</span>
            <span className="font-medium">{convertToINR(cart.cartPrice)}</span>
          </div>
        </section>
        <div className="flex w-full flex-col gap-2 ss:basis-1/2 sm:basis-5/12 lg:basis-4/12 lg:gap-4">
          <section className="mt-3 rounded-lg bg-primary-200 p-2 font-medium text-primary-900 ss:mt-0">
            <div>
              <div className="flex justify-between text-xs lg:text-base">
                <span>Subtotal:</span>
                <span>{convertToINR(cart.cartPrice)}</span>
              </div>
              <div className="flex justify-between text-xs lg:text-sm">
                <span>Shipping fee:</span>
                <span>{convertToINR(99)}</span>
              </div>
              <hr className="my-1 w-full border-primary-900" />
              <div className="flex justify-between font-bold sm:text-lg">
                <span>Total:</span>
                <span>{convertToINR(cart.cartPrice + 99)}</span>
              </div>
            </div>
          </section>
          <ButtonPrimary>Place Order</ButtonPrimary>
        </div>
      </div>
    </div>
  ) : !cart || !cart.products.length ? (
    <div className="flex min-h-[500px] items-center justify-center p-2 text-center text-2xl font-bold text-primary-900 ss:text-3xl">
      No products in the cart
    </div>
  ) : isError && isErrorWithData(error) && isErrorWithMessage(error.data) ? (
    <div className="text-error min-h-[500px] font-semibold text-red-vivid-600">
      {error?.data.message}
    </div>
  ) : (
    <div className="min-h-[500px]">An Error Occurred</div>
  );
};
