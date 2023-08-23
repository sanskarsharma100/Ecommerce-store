import { FC } from "react";

type Props = {
  height?: string;
  width?: string;
};

export const SpinningAnim: FC<Props> = ({
  height = "1.5rem",
  width = "1.5rem",
}) => {
  return (
    <>
      <span
        style={{ height: height, width: width }}
        className="inline-block animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status"
      ></span>
    </>
  );
};
