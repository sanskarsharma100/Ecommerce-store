import { FC } from "react";
import { useGetProductDetailsQuery } from "../../services/productsApi";
import iconCross from "../../assets/icons/iconCross.svg";
import { GoTrash } from "react-icons/go";
import { Link } from "react-router-dom";
import {
  useDecreaseQuantityMutation,
  useIncreaseQuantityMutation,
  useRemoveProductFromCartMutation,
} from "../../services/cartApi";
import { convertToINR } from "../../utils/utils";

type Product = {
  productId: string;
  quantity: number;
  totalPrice: number;
  _id: string;
};

type Props = {
  product: Product;
};

export const CartProductCard: FC<Props> = ({ product }) => {
  const { productId, quantity, totalPrice } = product;
  const { data } = useGetProductDetailsQuery(product.productId);

  const [increaseQuantity] = useIncreaseQuantityMutation();
  const [decreaseQuantity] = useDecreaseQuantityMutation();
  const [removeProductFromCart] = useRemoveProductFromCartMutation();

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
    <div className="relative bg-background-3 p-2">
      <button
        className="absolute right-0 top-0 m-2 hover:outline hover:outline-1 hover:outline-black"
        onClick={removeProduct}
      >
        <img src={iconCross} alt="Remove Item" className="w-4 lg:w-6" />
      </button>
      <div className="flex">
        <div className="max-w-[30%] xs:max-w-[20%] sm:w-[20%] sm:max-w-[15rem] lg:max-w-[12%]">
          <img src={data.product.images[0].url} alt={data.product.name} />
        </div>
        <div className="ml-2 flex w-full flex-col justify-between">
          <div>
            <div>
              <Link
                to={`/products/${productId}`}
                className="text-sm font-medium xs:text-base sm:text-lg"
              >
                {data.product.name}
              </Link>
            </div>
            <div>
              <span className="text-sm font-semibold">
                {convertToINR(data.product.price)}
              </span>
            </div>
          </div>
          <div className="flex w-fit items-center border border-secondary">
            <button
              className={`group h-full border-r border-secondary px-2 text-sm xs:text-xl ${
                quantity <= 1 && "text-grayCustom"
              }`}
              onClick={quantity <= 1 ? removeProduct : reduceQuantity}
            >
              {quantity <= 1 ? (
                <GoTrash className="text-xs text-black group-hover:text-warning xs:text-base" />
              ) : (
                "-"
              )}
            </button>
            <span className="h-fit w-5 text-center text-sm font-bold leading-none xs:w-8 xs:text-base sm:w-10 sm:text-lg">
              {quantity}
            </span>
            <button
              className={`border-l border-secondary px-2 text-sm xs:text-xl ${
                quantity >= 10 ||
                (quantity >= data.product.stock && "bg-light text-grayCustom")
              }`}
              onClick={addQuantity}
              disabled={quantity >= 10 || quantity >= data.product.stock}
            >
              +
            </button>
          </div>
        </div>
        <div className="hidden self-center ss:block">
          <span className="text-sm font-medium">
            {convertToINR(totalPrice)}
          </span>
        </div>
      </div>
    </div>
  ) : (
    <div>Error Occurred</div>
  );
};
