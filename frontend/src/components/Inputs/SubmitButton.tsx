import { FC } from "react";

interface Props {
  fieldValue: string;
  isDisabled: boolean;
}

export const SubmitButton: FC<Props> = ({ fieldValue, isDisabled }) => {
  return (
    <>
      <input
        className="button-1 relative w-full rounded-md border border-green-900 bg-green-700 p-2 text-base font-bold xs:text-2xl"
        value={isDisabled ? "" : fieldValue}
        type="submit"
        role="button"
        disabled={isDisabled}
      />
    </>
  );
};