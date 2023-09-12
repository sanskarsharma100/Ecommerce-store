import { FC } from "react";
import { SpinningAnim } from "../Loaders/SpinningAnim";
import { Button } from "../../utils/types";
import { Link } from "react-router-dom";

export const ButtonPrimary: FC<Button> = ({
  to,
  href,
  className,
  children,
  ...props
}) => {
  const classes =
    "flex w-full items-center justify-center rounded-lg bg-primary-800 p-2 text-sm font-semibold text-primary-050 duration-200 hover:cursor-pointer hover:bg-primary-900 active:ring-4 active:ring-primary-700" +
    " " +
    className;

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {props.isLoading ? <SpinningAnim className="h-full w-fit" /> : children}
      </Link>
    );
  } else if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {props.isLoading ? <SpinningAnim className="h-full w-fit" /> : children}
      </a>
    );
  } else {
    return (
      <button className={classes} {...props}>
        {props.isLoading ? <SpinningAnim className="h-full w-fit" /> : children}
      </button>
    );
  }
};
