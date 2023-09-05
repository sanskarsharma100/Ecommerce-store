import { FC } from "react";
import { SpinningAnim } from "../Loaders/SpinningAnim";
import { Button } from "../../utils/types";

export const ButtonPrimary: FC<Button> = ({
  disabled = false,
  isLoading = false,
  type,
  onClick,
  className,
  children,
}) => {
  return (
    <button
      className={
        "flex w-full items-center justify-center rounded-lg bg-primary-800 p-2 text-sm font-semibold text-primary-050 duration-200 hover:cursor-pointer hover:bg-primary-900 active:ring-4 active:ring-primary-700" +
        " " +
        className
      }
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {isLoading ? <SpinningAnim className="h-full w-fit" /> : children}
    </button>
  );
};
