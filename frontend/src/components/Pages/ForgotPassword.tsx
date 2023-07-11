import { FC, useState } from "react";
import { useForgotPasswordMutation } from "../../services/loginAuthApi";
import { isErrorWithData, isErrorWithMessage } from "../../services/helpers";

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

  return (
    <div className="flex h-screen bg-green-200">
      <section className="relative m-auto w-11/12 max-w-xl rounded-lg bg-green-600 p-4 font-inter text-white shadow-cardShadow xs:w-3/4 sm:w-2/4">
        <h1 className="mb-5 text-center text-3xl font-bold xs:text-4xl md:text-5xl ">
          Forgot Password
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-lg font-medium xs:text-2xl">
              Email
            </label>
            <input
              className="rounded-md border-none bg-green-300 p-2 text-2xl text-black focus:outline focus:outline-4 focus:outline-green-900"
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              required
              placeholder="Email"
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
              value={isLoading ? "" : "Submit"}
              type="submit"
              disabled={isLoading}
              role="button"
            />
            {isLoading && (
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
            Password reset link has been sent to your email
          </p>
        )}
      </section>
    </div>
  );
};
