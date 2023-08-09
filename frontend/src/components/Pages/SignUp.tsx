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
      navigate("/");
    }
  }, [isSuccess, navigate]);

  return (
    <AuthBgWrapper>
      <h1 className="mb-3 text-center text-3xl font-bold xs:text-6xl">
        Sign Up
      </h1>
      <p className="mb-1 text-center text-sm xs:text-base">
        Already has an account?{" "}
        <span className="italic text-linkColor hover:underline">
          <Link to="/login">Login</Link>
        </span>
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 xs:gap-5">
        <div className="flex flex-col gap-1">
          <TextInputField
            fieldLabel={"Name"}
            fieldType={"text"}
            fieldValue={userData.name}
            fieldName={"name"}
            placeholder={"Full Name"}
            isRequired={true}
            isDisabled={isLoading}
            handleChange={handleChange}
          />
        </div>
        <div className="flex flex-col gap-1">
          <TextInputField
            fieldLabel={"Email"}
            fieldType={"email"}
            fieldValue={userData.email}
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
            fieldValue={userData.password}
            fieldName={"password"}
            placeholder={"Password"}
            isRequired={true}
            isDisabled={isLoading}
            handleChange={handleChange}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="avatar" className="text-base font-medium xs:text-2xl">
            Profile Photo
          </label>
          <div className="flex gap-1 xs:gap-4">
            <img
              className="aspect-square max-h-full w-1/4 rounded-md"
              src={previewAvatar}
              alt="Picture Photo"
            />
            <input
              className="block w-full border border-secondary text-base text-textColor file:h-full file:w-full  file:border-none file:font-medium hover:border-2 hover:border-secondary hover:file:cursor-pointer focus:outline focus:outline-4 focus:outline-secondary xs:text-2xl"
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
              <p className="text-error font-semibold">{error?.data.message}</p>
            )}
          <SubmitButton fieldValue={"Sign Up"} isDisabled={isLoading} />
          {isLoading && (
            <div className="absolute left-1/2 top-2/4 -translate-x-1/2 -translate-y-1/2">
              <SpinningAnim />
            </div>
          )}
        </div>
      </form>
    </AuthBgWrapper>
  );
};
