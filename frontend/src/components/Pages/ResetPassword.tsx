import { ChangeEvent, FC, useState } from "react";
import { useResetPasswordMutation } from "../../services/userAuthApi";
import { isErrorWithData, isErrorWithMessage } from "../../services/helpers";
import { useNavigate, useParams } from "react-router-dom";
import { TextInputField } from "../Inputs/TextInputField";
import { SubmitButton } from "../Inputs/SubmitButton";
import { SpinningAnim } from "../Loaders/SpinningAnim";

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
    <div className="flex h-screen bg-green-200">
      <section className="relative m-auto w-11/12 max-w-xl rounded-lg bg-green-600 p-4 font-inter text-white shadow-cardShadow xs:w-3/4 sm:w-2/4">
        <h1 className="mb-5 text-center text-3xl font-bold xs:text-4xl md:text-5xl ">
          Reset Password
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <TextInputField
              fieldLabel={"New Password"}
              fieldType={"password"}
              fieldValue={passwords.password}
              fieldName={"password"}
              placeholder={"New Password"}
              isRequired={true}
              isDisabled={isLoading || isSuccess}
              handleChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-1">
            <TextInputField
              fieldLabel={"Confirm Password"}
              fieldType={"password"}
              fieldValue={passwords.confirmPassword}
              fieldName={"confirmPassword"}
              placeholder={"Confirm Password"}
              isRequired={true}
              isDisabled={isLoading || isSuccess}
              handleChange={handleChange}
            />
          </div>
          <div className="relative mt-3 w-full">
            {isError &&
              isErrorWithData(error) &&
              isErrorWithMessage(error.data) && (
                <p className="font-semibold text-red-700">
                  {error?.data.message}
                </p>
              )}
            <SubmitButton
              fieldValue={"Submit"}
              isDisabled={isLoading || isSuccess}
            />
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
      </section>
    </div>
  );
};
