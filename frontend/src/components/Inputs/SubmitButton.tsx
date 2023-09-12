import { FC } from "react";

interface Props {
  value: string;
  disabled: boolean;
}

export const SubmitButton: FC<Props> = ({ value, disabled }) => {
  return (
    <>
      <input
        className="relative w-full rounded-lg bg-primary-800 p-2 text-base font-bold text-primary-050 duration-200 hover:cursor-pointer hover:bg-primary-900 active:ring-4 active:ring-primary-700 sm:text-lg"
        value={disabled ? "" : value}
        type="submit"
        role="button"
        disabled={disabled}
      />
    </>
  );
};
