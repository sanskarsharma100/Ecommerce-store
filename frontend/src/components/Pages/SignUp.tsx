import { ChangeEvent, FC, useEffect, useState } from "react";
import { useRegisterUserMutation } from "./../../services/userAuthApi";
import { Link, useNavigate } from "react-router-dom";
import { isErrorWithData, isErrorWithMessage } from "./../../services/helpers";
import NoAvatar from "../../assets/images/NoAvatar.jpg";
import { TextInputField } from "../Inputs/TextInputField";
import { SubmitButton } from "../Inputs/SubmitButton";
import { SpinningAnim } from "../Loaders/SpinningAnim";
import { AuthBgWrapper } from "../Wrappers/AuthBgWrapper";
import { signUpTypes } from "../../utils/types";

export const SignUp: FC = () => {
  const [userData, setUserData] = useState<signUpTypes>({
    name: "",
    email: "",
    password: "",
    avatar: "",
  });
  const [previewAvatar, setPreviewAvatar] = useState<string>(NoAvatar);
  const [registerUser, { error, isError, isSuccess, isLoading }] =
    useRegisterUserMutation();
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setUserData((prevData) => ({
      ...prevData,
      [target.name]: target.value,
    }));
  };

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

  useEffect(() => {
    if (isSuccess) {
      navigate("/login");
    }
  }, [isSuccess, navigate]);

  return (
    <AuthBgWrapper>
      <h1 className="mb-3 text-center text-3xl font-bold">Sign Up</h1>
      <p className="mb-1 text-center text-sm">
        Already has an account?{" "}
        <span className="italic text-light-blue-vivid-900 hover:underline">
          <Link to="/login">Login</Link>
        </span>
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <TextInputField
            label={"Name"}
            type={"text"}
            value={userData.name}
            name={"name"}
            placeholder={"Full Name"}
            required={true}
            disabled={isLoading}
            onChange={handleChange}
            autoComplete="no"
          />
        </div>
        <div className="flex flex-col gap-1">
          <TextInputField
            label={"Email"}
            type={"email"}
            value={userData.email}
            name={"email"}
            placeholder={"Email"}
            required={true}
            disabled={isLoading}
            onChange={handleChange}
            autoComplete="no"
          />
        </div>
        <div className="flex flex-col gap-1">
          <TextInputField
            label={"Password"}
            type={"password"}
            value={userData.password}
            name={"password"}
            placeholder={"Password"}
            required={true}
            disabled={isLoading}
            onChange={handleChange}
            autoComplete="new-password"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="avatar" className="text-base font-medium">
            Profile Photo
          </label>
          <div className="flex gap-1 xs:gap-2">
            <img
              className="aspect-square max-h-full w-1/6 rounded-md"
              src={previewAvatar}
              alt="Picture Photo"
            />
            <input
              className="block w-full rounded-lg text-base file:h-full file:w-full file:border-none file:font-medium file:text-inherit hover:ring-4 hover:ring-primary-500 hover:file:cursor-pointer"
              id="avatar"
              type="file"
              name="avatar"
              required
              accept="image/png, image/jpg, image/jpeg"
              onChange={onImageChange}
              disabled={isLoading}
            />
          </div>
        </div>
        <div className="relative mt-3 w-full gap-1">
          {isError &&
            isErrorWithData(error) &&
            isErrorWithMessage(error.data) && (
              <p className="text-error mb-1 text-sm font-semibold text-red-vivid-600">
                {error?.data.message}
              </p>
            )}
          <div className="relative">
            <SubmitButton value="Sign Up" disabled={isLoading} />
            {isLoading && (
              <div className="absolute left-1/2 top-2/4 flex -translate-x-1/2 -translate-y-1/2">
                <SpinningAnim />
              </div>
            )}
          </div>
        </div>
      </form>
    </AuthBgWrapper>
  );
};
