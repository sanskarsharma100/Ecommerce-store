import { ChangeEventHandler, FC, useId } from "react";

interface Props {
  label?: string;
  type: string;
  value: string;
  name: string;
  placeholder?: string;
  autoComplete?: string;
  disabled?: boolean;
  required?: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
  className?: string;
  autoFocus?: boolean;
}

export const TextInputField: FC<Props> = ({
  label,
  type,
  value,
  name,
  placeholder,
  autoComplete,
  disabled = false,
  required = false,
  autoFocus,
  onChange,
  className,
}) => {
  const id = useId();

  return (
    <>
      {label && (
        <label htmlFor={id} className="text-base font-medium">
          {label}
        </label>
      )}
      <input
        className={
          "rounded-lg !border-0 bg-primary-050 p-2 text-sm !outline-none focus:outline focus:outline-2 focus:ring-4 focus:ring-primary-500" +
          " " +
          className
        }
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        name={name}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        autoComplete={autoComplete}
        autoFocus={autoFocus}
      />
    </>
  );
};
