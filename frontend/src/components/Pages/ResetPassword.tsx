import { ChangeEvent, FC, useState } from "react";
import { useResetPasswordMutation } from "../../services/userAuthApi";
import { isErrorWithData, isErrorWithMessage } from "../../services/helpers";
import { useNavigate, useParams } from "react-router-dom";
import { TextInputField } from "../Inputs/TextInputField";
import { SubmitButton } from "../Inputs/SubmitButton";
import { SpinningAnim } from "../Loaders/SpinningAnim";
import { AuthBgWrapper } from "../Wrappers/AuthBgWrapper";

type passwords = {
  password: string;
  confirmPassword: string;
};

export const ResetPassword: FC = () => {
  const [passwords, setPassword] = useState<passwords>({
    password: "",
    confirmPassword: "",
  });
  const [resetPassword, { error, isError, isSuccess, isLoading }] =
    useResetPasswordMutation();
  const navigate = useNavigate();

  const params = useParams();

  if (isSuccess) {
    setTimeout(() => {
      return navigate("/login");
    }, 2000);
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const passwordArg = {
      token: params.token,
      passwords: passwords,
    };
    resetPassword(passwordArg);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setPassword((prevData) => ({
      ...prevData,
      [target.name]: target.value,
    }));
  };

  return (
    <AuthBgWrapper>
      <h1 className="mb-5 text-center text-3xl font-bold xs:text-4xl md:text-5xl">
        Reset Password
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 xs:gap-4">
        <div className="flex flex-col gap-1">
          <TextInputField
            label={"New Password"}
            type={"password"}
            value={passwords.password}
            name={"password"}
            placeholder={"New Password"}
            required={true}
            disabled={isLoading || isSuccess}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col gap-1">
          <TextInputField
            label={"Confirm Password"}
            type={"password"}
            value={passwords.confirmPassword}
            name={"confirmPassword"}
            placeholder={"Confirm Password"}
            required={true}
            disabled={isLoading || isSuccess}
            onChange={handleChange}
          />
        </div>
        <div className="relative mt-3 w-full">
          {isError &&
            isErrorWithData(error) &&
            isErrorWithMessage(error.data) && (
              <p className="text-error font-semibold">{error?.data.message}</p>
            )}
          <SubmitButton value={"Submit"} disabled={isLoading || isSuccess} />
          {(isLoading || isSuccess) && (
            <div className="absolute left-1/2 top-2/4 -translate-x-1/2 -translate-y-1/2">
              <SpinningAnim />
            </div>
          )}
        </div>
      </form>
      {isSuccess && (
        <p className="mt-3">
          Password updated Successfully. Redirecting to login Page.
        </p>
      )}
    </AuthBgWrapper>
  );
};
