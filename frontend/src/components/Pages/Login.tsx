import { useState } from "react";
import { useLoginAuthMutation } from "./../../services/loginAuthApi";
import { useNavigate } from "react-router-dom";
import {
  isErrorWithData,
  isErrorWithMessage,
  isFetchBaseQueryError,
} from "./../../services/helpers";

export default function Login() {
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
    <section className="relative mt-auto bg-green-600 p-4 font-inter text-white">
      <h1 className="mb-3 text-center text-4xl font-bold">Login</h1>
      <form onSubmit={submitLoginInfo} className="flex flex-col gap-2">
        <div className="flex flex-col">
          <label htmlFor="email" className="font-lg text-lg">
            Email
          </label>
          <input
            className="rounded-md border-none bg-green-300 p-2 text-lg text-black focus:outline focus:outline-4 focus:outline-green-900"
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password" className="font-lg text-lg">
            Password
          </label>
          <input
            className="rounded-md border-none bg-green-300 p-2 text-lg text-black focus:outline focus:outline-4 focus:outline-green-900"
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isLoading}
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
            className="button-1 relative w-full rounded-md border border-green-900 bg-green-700 p-2 text-lg font-bold"
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
    </section>
  );
}
