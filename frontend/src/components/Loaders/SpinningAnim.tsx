import { FC } from "react";

type Props = {
  size?: string;
  width?: string;
  className?: string;
};

export const SpinningAnim: FC<Props> = ({
  size = "1.5rem",
  width = "4px",
  className,
}) => {
  return (
    <>
      <span
        style={{ height: size, width: size, borderWidth: width }}
        className={
          "inline-block animate-spin self-center rounded-full border-solid border-white border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" +
          " " +
          className
        }
        role="status"
      ></span>
    </>
  );
};
