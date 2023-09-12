import { FC } from "react";
import { SpinningAnim } from "../Loaders/SpinningAnim";
import { ButtonPrimary } from "./ButtonPrimary";
import { Button } from "../../utils/types";

export const ButtonSuccess: FC<Button> = ({
  disabled = false,
  isLoading = false,
  type,
  onClick,
  className,
  children,
}) => {
  return (
    <ButtonPrimary
      className={
        "text-green-050 bg-green-800 hover:bg-green-900 active:ring-green-700" +
        " " +
        className
      }
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {isLoading ? <SpinningAnim className="h-full w-fit" /> : children}
    </ButtonPrimary>
  );
};
