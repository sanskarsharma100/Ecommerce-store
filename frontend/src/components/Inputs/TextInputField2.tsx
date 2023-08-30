import { ChangeEventHandler, FC, useId } from "react";

interface Props {
  fieldLabel?: string;
  fieldType: string;
  fieldValue: string;
  fieldName: string;
  placeholder?: string;
  autoComplete?: string;
  isDisabled?: boolean;
  isRequired?: boolean;
  handleChange: ChangeEventHandler<HTMLInputElement>;
}

export const TextInputField2: FC<Props> = ({
  fieldLabel,
  fieldType,
  fieldValue,
  fieldName,
  placeholder,
  autoComplete = "on",
  isDisabled = false,
  isRequired = false,
  handleChange,
}) => {
  const id = useId();

  return (
    <>
      {fieldLabel && (
        <label htmlFor={id} className="mt-2 flex flex-wrap items-center gap-1">
          {fieldLabel}
        </label>
      )}
      <input
        className="w-full border border-secondary px-1 py-0.5"
        id={id}
        type={fieldType}
        value={fieldValue}
        onChange={handleChange}
        name={fieldName}
        placeholder={placeholder}
        disabled={isDisabled}
        required={isRequired}
        autoComplete={autoComplete}
      />
    </>
  );
};
