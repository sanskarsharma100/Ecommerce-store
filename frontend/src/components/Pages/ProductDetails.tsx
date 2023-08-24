import { FC } from "react";
import { useParams } from "react-router-dom";

export const ProductDetails: FC = () => {
  const id = useParams();
  console.log(id);

  return <div>Details</div>;
};
