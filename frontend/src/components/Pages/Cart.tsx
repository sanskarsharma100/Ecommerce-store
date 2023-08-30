import { FC } from "react";
import { useGetCartProductsQuery } from "../../services/cartApi";
import { CartProductCard } from "../Cart/CartProductCard";
import { convertToINR } from "./../../utils/utils";
import { isErrorWithData, isErrorWithMessage } from "../../services/helpers";

export const Cart: FC = () => {
  const {
    data: cartData,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetCartProductsQuery();

  const cart = cartData && cartData.cart;

  console.log("cart");

  const products = cart?.products.map((product) => (
    <CartProductCard product={product} key={product._id} />
  ));

  return cart && cart.products.length ? (
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
    <div className="mt-10 min-h-[500px] text-center text-2xl font-bold ss:mt-5 ss:text-3xl">
      No product in the cart
    </div>
  ) : isError && isErrorWithData(error) && isErrorWithMessage(error.data) ? (
    <div className="text-error min-h-[500px] font-semibold">
      {error?.data.message}
    </div>
  ) : (
    <div className="min-h-[500px]">An Error Occurred</div>
  );
};
