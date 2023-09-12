import { FC } from "react";
import { FaXmark } from "react-icons/fa6";

type Props = {
  className?: string;
  onClick: () => void;
};

export const ButtonClose: FC<Props> = ({ className, onClick }) => {
  return (
    <button
      className={
        "block w-fit rounded-lg bg-primary-200 p-1 duration-200 hover:ring-2 hover:ring-primary-700 active:ring-2 active:ring-primary-700" +
        " " +
        className
      }
      onClick={onClick}
    >
      <FaXmark className="text-2xl text-primary-900" />
    </button>
  );
};
