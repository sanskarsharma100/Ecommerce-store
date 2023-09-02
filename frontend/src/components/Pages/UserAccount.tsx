import { ChangeEvent, FC, useEffect, useState } from "react";
import { useAppSelector } from "../../app/hooks";
import { selectCurrentUser } from "../../features/User/userSlice";
import { StringObject } from "../../utils/types";
import iconEdit from "../../assets/icons/iconEdit.svg";
import { HiCamera } from "react-icons/hi";

import {
  useLazyLoadUserQuery,
  useUpdatePasswordMutation,
  useUpdateUserDetailsMutation,
} from "../../services/userApi";
import { isErrorWithData, isErrorWithMessage } from "../../services/helpers";
import { SpinningAnim } from "./../Loaders/SpinningAnim";
import { TextInputField2 } from "../Inputs/TextInputField2";

export const UserAccount: FC = () => {
  const [isTouchscreen, setIsTouchscreen] = useState(false);
  const { user } = useAppSelector(selectCurrentUser);
  const [
    updateUserDetails,
    { isLoading: isUserLoading, isSuccess: isUserSuccess },
  ] = useUpdateUserDetailsMutation();

  const [
    updatePassword,
    {
      isLoading: isPasswordLoading,
      isSuccess: isPasswordSuccess,
      isError: isPasswordError,
      error: passwordError,
    },
  ] = useUpdatePasswordMutation();

  const [loadUser] = useLazyLoadUserQuery();

  const [updatedUser, setUpdatedUser] = useState<StringObject>({
    name: user.name,
    email: user.email,
  });
  const [newAvatar, setNewAvatar] = useState<string>(user.avatar.url);

  const [newPassword, setNewPassword] = useState<StringObject>({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [isUserEdit, setIsUserEdit] = useState<boolean>(false);
  const [isPasswordEdit, setIsPasswordEdit] = useState<boolean>(false);
  const [passwordErrMsg, setPasswordErrMsg] = useState<string>("");

  const toggleUserEdit = () => {
    setIsUserEdit(!isUserEdit);
  };

  const togglePasswordEdit = () => {
    setIsPasswordEdit(!isPasswordEdit);
  };

  const changeUserInfo = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setUpdatedUser((prevUser) => ({
      ...prevUser,
      [target.name]: target.value,
    }));
  };

  const changePassword = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setNewPassword((prevUser) => ({
      ...prevUser,
      [target.name]: target.value,
    }));
  };

  const resetUserInfo = () => {
    setUpdatedUser((prevUserInfo) => ({
      ...prevUserInfo,
      name: user.name,
      email: user.email,
    }));
  };

  const resetPasswordFields = () => {
    setNewPassword({
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setPasswordErrMsg("");
  };

  const updateUserInfo = () => {
    const info = {
      name: updatedUser.name,
      email: updatedUser.email,
    };
    updateUserDetails(info);
  };

  const updateAvatar = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    const image: File = (target.files as FileList)[0];
    if (image) {
      const reader = new FileReader();
      reader.onload = () => {
        setNewAvatar(URL.createObjectURL(image));
        updateUserDetails({ avatar: reader.result as string });
      };
      reader.readAsDataURL(image);
    }
  };

  const handlePasswordUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    updatePassword(newPassword);
  };

  useEffect(() => {
    if (!isUserLoading && isUserSuccess) {
      loadUser();
      setIsUserEdit(false);
    }
    if (!isPasswordLoading && isPasswordSuccess) {
      togglePasswordEdit();
      resetPasswordFields();
    }
    if (
      isPasswordError &&
      isErrorWithData(passwordError) &&
      isErrorWithMessage(passwordError.data)
    ) {
      const errStr = passwordError.data.message;
      const newErrStr = errStr.split(":")[2];
      setPasswordErrMsg(newErrStr || errStr);
    }

    const mediaQuery = window.matchMedia("(pointer: coarse)");

    const handleMediaQueryChange = (e: MediaQueryListEvent) => {
      setIsTouchscreen(e.matches);
    };

    mediaQuery.addEventListener("change", handleMediaQueryChange);

    setIsTouchscreen(mediaQuery.matches);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUserLoading, isUserSuccess, isPasswordLoading, isPasswordSuccess]);

  const userInfo = Object.keys(updatedUser).map((key) => {
    return (
      <div className="flex flex-wrap items-center gap-1" key={key}>
        <p className="font-medium capitalize">{[key]}:</p>
        {!isUserEdit ? (
          <p className="overflow-clip overflow-ellipsis font-medium text-gray-700">
            {updatedUser[key]}
          </p>
        ) : (
          <input
            className="w-full border border-secondary px-1 py-0.5"
            type="text"
            value={updatedUser[key]}
            onChange={changeUserInfo}
            name={key}
            disabled={isUserLoading}
          />
        )}
      </div>
    );
  });

  return (
    <div className="mt-4 min-h-[500px] font-inter">
      <section className="m-2 border-2 border-gray-500 p-2 sm:m-auto sm:max-w-lg">
        <div>
          <label
            htmlFor="avatar"
            className={`relative m-auto flex h-fit w-fit items-center justify-center rounded-full ${
              !isUserLoading && "group hover:cursor-pointer"
            }`}
          >
            <img
              src={iconEdit}
              alt="edit icon"
              className={`absolute z-[1] hidden w-8 group-hover:block ${
                isUserLoading || (isTouchscreen && "group-hover:hidden")
              }`}
            />
            {isUserLoading && (
              <div className="absolute z-20 flex h-full w-full items-center justify-center rounded-full bg-semiDarkOverlay">
                <SpinningAnim />
              </div>
            )}
            <img
              src={user.avatar.url}
              alt="Profile Photo"
              className="m-auto aspect-square w-40 rounded-full duration-200 group-hover:brightness-50"
            />

            {isTouchscreen && (
              <HiCamera className="absolute bottom-2 right-2 rounded-full bg-accent p-1 text-3xl" />
            )}
          </label>
          <input
            hidden
            id="avatar"
            type="file"
            accept="image/png, image/jpg, image/jpeg"
            onChange={updateAvatar}
            disabled={isUserLoading}
          />
          <div className="mt-4 flex flex-col gap-2">
            {userInfo}
            {!isUserEdit && (
              <button
                className="mt-2 border-3 border-secondary px-2 py-1 text-sm font-semibold duration-200 hover:bg-accent"
                onClick={toggleUserEdit}
                disabled={isUserLoading}
              >
                {isUserLoading ? <SpinningAnim size="20px" /> : "Edit Profile"}
              </button>
            )}
            {isUserEdit && (
              <div className="flex justify-between gap-1">
                <button
                  className="mt-2 w-full border-3 border-secondary px-2 py-1 text-sm font-semibold duration-200 hover:bg-success"
                  onClick={updateUserInfo}
                  disabled={isUserLoading}
                >
                  {isUserLoading ? <SpinningAnim size="20px" /> : "Save"}
                </button>
                <button
                  className="mt-2 w-full border-3 border-secondary px-2 py-1 text-sm font-semibold duration-200 hover:bg-warning"
                  onClick={() => {
                    toggleUserEdit();
                    resetUserInfo();
                  }}
                  disabled={isUserLoading}
                >
                  {isUserLoading ? <SpinningAnim size="20px" /> : "Cancel"}
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          {!isPasswordEdit && (
            <button
              className="mt-2 border-3 border-secondary px-2 py-1 text-sm font-semibold duration-200 hover:bg-accent"
              onClick={togglePasswordEdit}
              disabled={isPasswordLoading}
            >
              {isPasswordLoading ? (
                <SpinningAnim size="20px" />
              ) : (
                "Change Password"
              )}
            </button>
          )}
          {isPasswordEdit && (
            <div className="flex justify-between gap-1">
              <button
                className="mt-2 w-full border-3 border-secondary px-2 py-1 text-sm font-semibold duration-200 hover:bg-warning"
                onClick={() => {
                  togglePasswordEdit();
                  resetPasswordFields();
                }}
              >
                {isPasswordLoading ? <SpinningAnim size="20px" /> : "Cancel"}
              </button>
            </div>
          )}
          {isPasswordEdit && (
            <form onSubmit={handlePasswordUpdate}>
              <input
                type="text"
                name="email"
                autoComplete="username email"
                hidden
              ></input>
              <TextInputField2
                fieldLabel="Old Password"
                fieldType="password"
                fieldValue={newPassword.oldPassword}
                fieldName={"oldPassword"}
                handleChange={changePassword}
                isRequired={true}
                autoComplete="current-password"
                isDisabled={isPasswordLoading}
              />
              <TextInputField2
                fieldLabel="New Password"
                fieldType="password"
                fieldValue={newPassword.newPassword}
                fieldName={"newPassword"}
                handleChange={changePassword}
                isRequired={true}
                autoComplete="new-password"
                isDisabled={isPasswordLoading}
              />
              <TextInputField2
                fieldLabel="Confirm Password"
                fieldType="password"
                fieldValue={newPassword.confirmPassword}
                fieldName={"confirmPassword"}
                handleChange={changePassword}
                isRequired={true}
                autoComplete="new-password"
                isDisabled={isPasswordLoading}
              />
              <div className="mt-1 text-xs font-semibold text-warning">
                {passwordErrMsg}
              </div>
              <input
                className="mt-1 w-full border-3 border-secondary px-2 py-1 text-sm font-semibold duration-200 hover:cursor-pointer hover:bg-success"
                type="submit"
                value="Update"
                disabled={isPasswordLoading}
              />
            </form>
          )}
          <div></div>
        </div>
      </section>
    </div>
  );
};
