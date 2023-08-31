import { FC } from "react";

interface Props {
  fieldValue: string;
  isDisabled: boolean;
}

export const SubmitButton: FC<Props> = ({ fieldValue, isDisabled }) => {
  return (
    <>
      <input
        className="button-1 relative w-full border border-secondary bg-accent p-2 text-base font-bold sm:text-lg"
        value={isDisabled ? "" : fieldValue}
        type="submit"
        role="button"
        disabled={isDisabled}
      />
    </>
  );
};
