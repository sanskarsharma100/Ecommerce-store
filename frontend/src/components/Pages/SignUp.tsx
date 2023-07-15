import { FC, useState } from "react";
import { useRegisterUserMutation } from "./../../services/loginAuthApi";
import { Link, useNavigate } from "react-router-dom";
import { isErrorWithData, isErrorWithMessage } from "./../../services/helpers";
import NoAvatar from "../../assets/NoAvatar.jpg";

type userData = {
  name: string;
  email: string;
  password: string;
  avatar: string | ArrayBuffer | null;
};

export const SignUp: FC = () => {
  const [userData, setUserData] = useState<userData>({
    name: "",
    email: "",
    password: "",
    avatar: "",
  });
  const [previewAvatar, setPreviewAvatar] = useState<string>(NoAvatar);
  const [registerUser, { error, isError, isSuccess, isLoading }] =
    useRegisterUserMutation();
  const navigate = useNavigate();

  if (isSuccess) {
    navigate("/");
  }

  const onImageChange = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    const image: File = (target.files as FileList)[0];

    setPreviewAvatar(URL.createObjectURL(image));
    if (image) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setUserData((prevData) => ({
            ...prevData,
            avatar: reader.result,
          }));
        }
      };
      reader.readAsDataURL(image);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    registerUser(userData);
  };

  return (
    <div className="flex h-screen bg-green-200">
      <section className="relative m-auto w-11/12 max-w-xl rounded-lg bg-green-600 p-4 font-inter text-white  shadow-cardShadow xs:w-3/4 sm:w-2/4">
        <h1 className="mb-3 text-center text-5xl font-bold xs:text-6xl ">
          Sign Up
        </h1>
        <p className="text-center">
          Already has an account?{" "}
          <span className="italic text-blue-950 hover:underline">
            <Link to="/login">Login</Link>
          </span>
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <label htmlFor="name" className="text-xl font-medium xs:text-2xl">
              Name
            </label>
            <input
              className="rounded-md border-none bg-green-300 p-2 text-2xl text-black focus:outline focus:outline-4 focus:outline-green-900"
              id="name"
              type="text"
              value={userData.name}
              onChange={(e) =>
                setUserData((prevData) => ({
                  ...prevData,
                  name: e.target.value,
                }))
              }
              required
              placeholder="Name"
              disabled={isLoading}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-xl font-medium xs:text-2xl">
              Email
            </label>
            <input
              className="rounded-md border-none bg-green-300 p-2 text-2xl text-black focus:outline focus:outline-4 focus:outline-green-900"
              id="email"
              type="email"
              value={userData.email}
              onChange={(e) =>
                setUserData((prevData) => ({
                  ...prevData,
                  email: e.target.value,
                }))
              }
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
              value={userData.password}
              onChange={(e) =>
                setUserData((prevData) => ({
                  ...prevData,
                  password: e.target.value,
                }))
              }
              placeholder="Password"
              required
              disabled={isLoading}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="avatar" className="text-xl font-medium xs:text-2xl">
              Profile Photo
            </label>
            <div className="flex gap-4">
              <img
                className="aspect-square max-h-full w-1/4 rounded-md"
                src={previewAvatar}
                alt="Picture Photo"
              />
              <input
                className="block w-full rounded-md text-xl text-black file:h-full file:w-full file:border-none file:bg-green-300 file:font-medium hover:border-4 hover:border-green-900 hover:file:cursor-pointer focus:outline focus:outline-4 focus:outline-green-900 xs:text-2xl"
                id="avatar"
                type="file"
                name="avatar"
                required
                accept="image/*"
                onChange={onImageChange}
                placeholder="Password"
                disabled={isLoading}
              />
            </div>
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
              value={isLoading ? "" : "Sign Up"}
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
    </div>
  );
};
