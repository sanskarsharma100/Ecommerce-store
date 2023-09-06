import { FC } from "react";

type Props = {
  size?: string;
  width?: string;
};

export const SpinningAnimDark: FC<Props> = ({
  size = "1.5rem",
  width = "4px",
}) => {
  return (
    <>
      <span
        style={{ height: size, width: size, borderWidth: width }}
        className="inline-block animate-spin rounded-full border-solid border-primary-900 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status"
      ></span>
    </>
  );
};
