import { FC, useState } from "react";
import { productType } from "../../utils/types";
import { convertToINR } from "../../utils/utils";
import { Link } from "react-router-dom";
import { SpinningAnimDark } from "../Loaders/SpinningAnimDark";

type Props = {
  product: productType;
  isLoading: boolean;
};

export const ProductCard: FC<Props> = ({ product, isLoading }) => {
  const [isImgLoaded, setIsImageLoaded] = useState<boolean>(false);

  return (
    <Link
      to={`/products/${product._id}`}
      className="flex w-full min-w-[9rem] flex-col outline outline-1 outline-primary-300 duration-300 hover:cursor-pointer hover:border-gray-600 hover:shadow-[0px_0px_3px_1px_rgba(0,0,0,0.3)] xs:max-w-[15rem] xs:shadow-[0px_0px_3px_1px_rgba(0,0,0,0.1)] xs:outline-none ss:max-w-[20rem]"
    >
      {isLoading ? (
        <div className="m-auto flex items-center justify-center">
          <SpinningAnimDark />
        </div>
      ) : (
        <>
          <div className="xs:p-0">
            <img
              className={isImgLoaded ? "" : "hidden"}
              src={product.images[0].url}
              alt={product.name}
              onLoad={() => setIsImageLoaded(true)}
            />
            {!isImgLoaded && (
              <div className="flex h-[250px] items-center justify-center">
                <SpinningAnimDark />
              </div>
            )}
          </div>
          <div className="flex h-full flex-col justify-between p-1 text-dynamicText">
            <p className="line-clamp-2 w-full overflow-hidden text-ellipsis font-medium capitalize text-primary-700">
              {product.name}
            </p>
            <p className="font-bold text-primary-800">
              {convertToINR(product.price)}
            </p>
          </div>
        </>
      )}
    </Link>
  );
};
