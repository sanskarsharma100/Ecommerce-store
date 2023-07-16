import { ChangeEventHandler, FC, useId } from "react";

interface Props {
  fieldLabel: string;
  fieldType: string;
  fieldValue: string;
  fieldName: string;
  placeholder: string;
  isDisabled: boolean;
  isRequired?: boolean;
  handleChange: ChangeEventHandler<HTMLInputElement>;
}

export const TextInputField: FC<Props> = ({
  fieldLabel,
  fieldType,
  fieldValue,
  fieldName,
  placeholder,
  isDisabled,
  isRequired = false,
  handleChange,
}) => {
  const id = useId();

  return (
    <>
      <label htmlFor={id} className="text-xl font-medium xs:text-2xl">
        {fieldLabel}
      </label>
      <input
        className="rounded-md border-none bg-green-300 p-2 text-xl text-black focus:outline focus:outline-4 focus:outline-green-900 xs:text-2xl"
        id={id}
        type={fieldType}
        value={fieldValue}
        onChange={handleChange}
        name={fieldName}
        placeholder={placeholder}
        disabled={isDisabled}
        required={isRequired}
        autoComplete="on"
      />
    </>
  );
};
