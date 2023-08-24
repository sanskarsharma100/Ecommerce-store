import { FC } from "react";
import { productType } from "../../utils/types";
import { convertToINR } from "../../utils/utils";
import { SpinningAnim } from "../Loaders/SpinningAnim";

type Props = {
  product: productType;
  isLoading: boolean;
};

export const ProductCard: FC<Props> = ({ product, isLoading }) => {
  return (
    <div
      key={product._id}
      className="flex w-full min-w-[9rem] flex-col bg-background outline outline-1 -outline-offset-1 outline-gray-700 hover:cursor-pointer hover:border-gray-600 hover:drop-shadow-3xl xs:max-w-[15rem] xs:outline-2 ss:max-w-[15rem]"
    >
      {isLoading ? (
        <div className="m-auto flex items-center justify-center">
          <SpinningAnim />
        </div>
      ) : (
        <>
          <div className="flex h-full items-center justify-center p-1 xs:p-0">
            <img src={product.images[0].url} alt={product.name} />
          </div>
          <div className="p-1 text-dynamicText">
            <p className="line-clamp-2 w-full overflow-hidden text-ellipsis font-semibold">
              {product.name}
            </p>
            <p className="font-bold text-success">
              {convertToINR(product.price)}
            </p>
          </div>
        </>
      )}
    </div>
  );
};