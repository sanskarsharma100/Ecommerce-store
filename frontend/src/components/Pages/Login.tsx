import { ChangeEvent, FC, useEffect, useState } from "react";
import { useLoginAuthMutation } from "./../../services/userAuthApi";
import { Link, useNavigate } from "react-router-dom";
import { isErrorWithData, isErrorWithMessage } from "./../../services/helpers";
import { TextInputField } from "../Inputs/TextInputField";
import { SubmitButton } from "../Inputs/SubmitButton";
import { SpinningAnim } from "./../Loaders/SpinningAnim";
import { AuthBgWrapper } from "./../Wrappers/AuthBgWrapper";

interface StringObject {
  [key: string]: string;
}

export const Login: FC = () => {
  const [loginInfo, setLoginInfo] = useState<StringObject>({
    email: "",
    password: "",
  });
  const [loginAuth, { error, isError, isSuccess, isLoading }] =
    useLoginAuthMutation();
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setLoginInfo((prevData) => ({
      ...prevData,
      [target.name]: target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginAuth(loginInfo);
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/");
    }
  }, [isSuccess, navigate]);

  return (
    <AuthBgWrapper>
      <h1 className="mb-3 text-center text-3xl font-bold">Login</h1>
      <p className="mb-1 text-center text-sm">
        Don't have a account?{" "}
        <span className="italic text-linkColor hover:underline">
          <Link to="/signup">Sign Up</Link>
        </span>
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <TextInputField
            fieldLabel={"Email"}
            fieldType={"email"}
            fieldValue={loginInfo.email}
            fieldName={"email"}
            placeholder={"Email"}
            isRequired={true}
            isDisabled={isLoading}
            handleChange={handleChange}
          />
        </div>
        <div className="flex flex-col gap-1">
          <TextInputField
            fieldLabel={"Password"}
            fieldType={"password"}
            fieldValue={loginInfo.password}
            fieldName={"password"}
            placeholder={"Password"}
            isRequired={true}
            isDisabled={isLoading}
            handleChange={handleChange}
          />
        </div>
        <div className="relative mt-3 w-full gap-1">
          {isError &&
            isErrorWithData(error) &&
            isErrorWithMessage(error.data) && (
              <p className="text-error font-semibold">{error?.data.message}</p>
            )}
          <SubmitButton fieldValue={"Login"} isDisabled={isLoading} />
          {isLoading && (
            <div className="absolute left-1/2 top-2/4 -translate-x-1/2 -translate-y-1/2">
              <SpinningAnim />
            </div>
          )}
        </div>
      </form>
      <p className="mt-4 text-sm italic text-linkColor hover:cursor-pointer hover:underline">
        <Link to="/password/forgot">Forgot Password?</Link>
      </p>
    </AuthBgWrapper>
  );
};
