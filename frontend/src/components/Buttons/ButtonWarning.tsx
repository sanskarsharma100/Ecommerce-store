import { FC } from "react";
import { SpinningAnim } from "../Loaders/SpinningAnim";
import { ButtonPrimary } from "./ButtonPrimary";
import { Button } from "../../utils/types";

export const ButtonWarning: FC<Button> = ({
  disabled = false,
  isLoading = false,
  onClick,
  type,
  className,
  children,
}) => {
  return (
    <ButtonPrimary
      className={
        "bg-red-vivid-800 text-red-vivid-050 hover:bg-red-vivid-900 active:ring-red-700" +
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
