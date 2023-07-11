import { FC, useState } from "react";
import { useResetPasswordMutation } from "../../services/loginAuthApi";
import { isErrorWithData, isErrorWithMessage } from "../../services/helpers";
import { useNavigate, useParams } from "react-router-dom";

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

  return (
    <div className="flex h-screen bg-green-200">
      <section className="relative m-auto w-11/12 max-w-xl rounded-lg bg-green-600 p-4 font-inter text-white shadow-cardShadow xs:w-3/4 sm:w-2/4">
        <h1 className="mb-5 text-center text-3xl font-bold xs:text-4xl md:text-5xl ">
          Reset Password
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label
              htmlFor="password"
              className="text-lg font-medium xs:text-2xl"
            >
              New Password
            </label>
            <input
              className="rounded-md border-none bg-green-300 p-2 text-2xl text-black focus:outline focus:outline-4 focus:outline-green-900"
              id="password"
              type="password"
              value={passwords.password}
              onChange={(e) =>
                setPassword((prevPass) => ({
                  ...prevPass,
                  password: e.target.value,
                }))
              }
              required
              placeholder="New Password"
              disabled={isLoading || isSuccess}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label
              htmlFor="confirmPassword"
              className="text-lg font-medium xs:text-2xl"
            >
              Confirm Password
            </label>
            <input
              className="rounded-md border-none bg-green-300 p-2 text-2xl text-black focus:outline focus:outline-4 focus:outline-green-900"
              id="confirmPassword"
              type="password"
              value={passwords.confirmPassword}
              onChange={(e) =>
                setPassword((prevPass) => ({
                  ...prevPass,
                  confirmPassword: e.target.value,
                }))
              }
              required
              placeholder="Confirm Password"
              disabled={isLoading || isSuccess}
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
            <input
              className="button-1 relative w-full rounded-md border border-green-900 bg-green-700 p-2 text-2xl font-bold"
              value={isLoading || isSuccess ? "" : "Submit"}
              type="submit"
              disabled={isLoading || isSuccess}
              role="button"
            />
            {(isLoading || isSuccess) && (
              <div className="absolute left-1/2 top-2/4 -translate-x-1/2 -translate-y-1/2">
                <span
                  className="inline-block h-6 w-6 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                  role="status"
                ></span>
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
