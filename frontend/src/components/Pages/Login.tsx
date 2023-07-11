import { FC, useState } from "react";
import { useLoginAuthMutation } from "./../../services/loginAuthApi";
import { Link, useNavigate } from "react-router-dom";
import { isErrorWithData, isErrorWithMessage } from "./../../services/helpers";

export const Login: FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loginAuth, { error, isError, isSuccess, isLoading }] =
    useLoginAuthMutation();
  const navigate = useNavigate();

  if (isSuccess) {
    navigate("/");
  }

  const submitLoginInfo = (e: React.FormEvent) => {
    e.preventDefault();
    const credential = {
      email: email,
      password: password,
    };
    loginAuth(credential);
  };

  return (
    <div className="flex h-screen bg-green-200">
      <section className="relative m-auto w-11/12 max-w-xl rounded-lg bg-green-600 p-4 font-inter text-white  shadow-cardShadow xs:w-3/4 sm:w-2/4">
        <h1 className="mb-3 text-center text-5xl font-bold xs:text-6xl ">
          Login
        </h1>
        <form onSubmit={submitLoginInfo} className="flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-xl font-medium xs:text-2xl">
              Email
            </label>
            <input
              className="rounded-md border-none bg-green-300 p-2 text-2xl text-black focus:outline focus:outline-4 focus:outline-green-900"
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Email"
              disabled={isLoading}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label
              htmlFor="password"
              className="text-xl font-medium xs:text-2xl"
            >
              Password
            </label>
            <input
              className="rounded-md border-none bg-green-300 p-2 text-xl text-black focus:outline focus:outline-4 focus:outline-green-900 xs:text-2xl"
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              disabled={isLoading}
            />
          </div>
          <div className="relative mt-3 w-full gap-1">
            {isError &&
              isErrorWithData(error) &&
              isErrorWithMessage(error.data) && (
                <p className="font-semibold text-red-700">
                  {error?.data.message}
                </p>
              )}
            <input
              className="button-1 relative w-full rounded-md border border-green-900 bg-green-700 p-2 text-2xl font-bold"
              value={isLoading ? "" : "Login"}
              type="submit"
              role="button"
              disabled={isLoading}
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
        <p className="mt-2 italic hover:cursor-pointer hover:underline">
          <Link to="/password/forgot">Forgot Password?</Link>
        </p>
      </section>
    </div>
  );
};
