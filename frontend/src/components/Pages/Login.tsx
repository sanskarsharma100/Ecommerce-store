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
        Don't have an account?{" "}
        <span className="italic text-light-blue-vivid-900 hover:underline">
          <Link to="/signup">Sign Up</Link>
        </span>
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <TextInputField
            label={"Email"}
            type={"email"}
            value={loginInfo.email}
            name={"email"}
            placeholder={"Email"}
            required={true}
            disabled={isLoading}
            onChange={handleChange}
            autoComplete="username"
          />
        </div>
        <div className="flex flex-col gap-1">
          <TextInputField
            label={"Password"}
            type={"password"}
            value={loginInfo.password}
            name={"password"}
            placeholder={"Password"}
            required={true}
            disabled={isLoading}
            onChange={handleChange}
            autoComplete="current-password"
          />
        </div>
        <div className="mt-3 w-full gap-1">
          {isError &&
            isErrorWithData(error) &&
            isErrorWithMessage(error.data) && (
              <p className="text-error mb-1 text-sm text-red-vivid-600">
                {error?.data.message}
              </p>
            )}
          <div className="relative">
            <SubmitButton value={"Login"} disabled={isLoading} />
            {isLoading && (
              <div className="absolute left-1/2 top-2/4 flex -translate-x-1/2 -translate-y-1/2">
                <SpinningAnim />
              </div>
            )}
          </div>
        </div>
      </form>
      <p className="mt-4 w-fit text-sm italic text-light-blue-vivid-900 hover:cursor-pointer hover:underline">
        <Link to="/password/forgot">Forgot Password?</Link>
      </p>
    </AuthBgWrapper>
  );
};
