import { ChangeEventHandler, FC, useId } from "react";

interface Props {
  fieldLabel?: string;
  fieldType: string;
  fieldValue: string;
  fieldName: string;
  placeholder: string;
  isDisabled?: boolean;
  isRequired?: boolean;
  handleChange: ChangeEventHandler<HTMLInputElement>;
}

export const TextInputField: FC<Props> = ({
  fieldLabel,
  fieldType,
  fieldValue,
  fieldName,
  placeholder,
  isDisabled = false,
  isRequired = false,
  handleChange,
}) => {
  const id = useId();

  return (
    <>
      {fieldLabel && (
        <label htmlFor={id} className="text-base font-medium">
          {fieldLabel}
        </label>
      )}
      <input
        className="border border-secondary bg-background p-2 text-sm text-textColor focus:outline focus:outline-2"
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
