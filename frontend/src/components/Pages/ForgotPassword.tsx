import { ChangeEvent, FC, useState } from "react";
import { useForgotPasswordMutation } from "../../services/userAuthApi";
import { isErrorWithData, isErrorWithMessage } from "../../services/helpers";
import { TextInputField } from "../Inputs/TextInputField";
import { SubmitButton } from "../Inputs/SubmitButton";
import { SpinningAnim } from "../Loaders/SpinningAnim";
import { AuthBgWrapper } from "../Wrappers/AuthBgWrapper";

export const ForgotPassword: FC = () => {
  const [email, setEmail] = useState<string>("");
  const [forgotPassword, { error, isError, isSuccess, isLoading }] =
    useForgotPasswordMutation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const body = {
      email: email,
    };
    forgotPassword(body);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setEmail(target.value);
  };

  return (
    <AuthBgWrapper>
      <h1 className="mb-5 text-center text-3xl font-bold xs:text-4xl md:text-5xl">
        Forgot Password
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 xs:gap-4">
        <div className="flex flex-col gap-1">
          <TextInputField
            fieldLabel={"Email"}
            fieldType={"email"}
            fieldValue={email}
            fieldName={"email"}
            placeholder={"Email"}
            isRequired={true}
            isDisabled={isLoading}
            handleChange={handleChange}
          />
        </div>
        <div className="relative mt-3 w-full">
          {isError &&
            isErrorWithData(error) &&
            isErrorWithMessage(error.data) && (
              <p className="font-semibold text-error">{error?.data.message}</p>
            )}
          <SubmitButton fieldValue={"Submit"} isDisabled={isLoading} />
          {isLoading && (
            <div className="absolute left-1/2 top-2/4 -translate-x-1/2 -translate-y-1/2">
              <SpinningAnim />
            </div>
          )}
        </div>
      </form>
      {isSuccess && (
        <p className="mt-3">Password reset link has been sent to your email</p>
      )}
    </AuthBgWrapper>
  );
};
