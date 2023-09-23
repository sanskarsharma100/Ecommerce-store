import { ChangeEvent, FC, useEffect, useState } from "react";
import { useAppSelector } from "../../app/hooks";
import { selectCurrentUser } from "../../features/User/userSlice";
import { StringObject } from "../../utils/types";
import iconEdit from "../../assets/icons/iconEdit.svg";
import { HiCamera } from "react-icons/hi";
import { isErrorWithData, isErrorWithMessage } from "../../services/helpers";
import { SpinningAnim } from "./../Loaders/SpinningAnim";
import { TextInputField } from "../Inputs/TextInputField";
import { ButtonPrimary } from "./../Buttons/ButtonPrimary";
import { ButtonSuccess } from "../Buttons/ButtonSuccess";
import { ButtonWarning } from "../Buttons/ButtonWarning";
import {
  useLazyLoadUserQuery,
  useUpdatePasswordMutation,
  useUpdateUserDetailsMutation,
} from "../../services/userApi";

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
      <div className="flex flex-col" key={key}>
        <p className="font-medium capitalize">{[key]}:</p>
        {!isUserEdit ? (
          <p className="overflow-clip overflow-ellipsis font-semibold text-primary-700">
            {updatedUser[key]}
          </p>
        ) : (
          <TextInputField
            type="text"
            value={updatedUser[key]}
            name={key}
            onChange={changeUserInfo}
            disabled={isUserLoading}
          />
        )}
      </div>
    );
  });

  return (
    <div className="min-h-[500px] py-4 font-inter">
      <section className="m-2 rounded-lg border-2 border-primary-400 bg-primary-100 p-2 text-primary-900 ss:m-auto ss:max-w-lg">
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
              <div className="absolute z-20 flex h-full w-full items-center justify-center rounded-full bg-black/40">
                <SpinningAnim />
              </div>
            )}
            <img
              src={user.avatar.url}
              alt="Profile Photo"
              className="m-auto aspect-square w-40 rounded-full ring-2 ring-primary-600 ring-offset-2 duration-200 group-hover:brightness-50"
            />

            {isTouchscreen && (
              <HiCamera className="absolute bottom-2 right-2 rounded-full bg-primary-900 p-1.5 text-3xl text-primary-100" />
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
              <ButtonPrimary
                onClick={toggleUserEdit}
                disabled={isUserLoading}
                isLoading={isUserLoading}
              >
                Edit Profile
              </ButtonPrimary>
            )}
            {isUserEdit && (
              <div className="flex items-stretch gap-1">
                <ButtonSuccess
                  onClick={updateUserInfo}
                  disabled={isUserLoading}
                >
                  Save
                </ButtonSuccess>
                <ButtonWarning
                  onClick={() => {
                    toggleUserEdit();
                    resetUserInfo();
                  }}
                  disabled={isUserLoading}
                >
                  Cancel
                </ButtonWarning>
              </div>
            )}
          </div>
        </div>
        <div className="mt-2">
          {!isPasswordEdit && (
            <ButtonPrimary
              onClick={togglePasswordEdit}
              disabled={isPasswordLoading}
            >
              Change Password
            </ButtonPrimary>
          )}
          {isPasswordEdit && (
            <form
              onSubmit={handlePasswordUpdate}
              className="flex flex-col gap-1"
            >
              <div className="flex flex-col gap-2">
                <div className="hidden">
                  <input
                    type="text"
                    name="email"
                    autoComplete="username email"
                    hidden
                  ></input>
                </div>
                <div className="flex flex-col gap-0.5">
                  <TextInputField
                    label="Old Password"
                    type="password"
                    value={newPassword.oldPassword}
                    name={"oldPassword"}
                    onChange={changePassword}
                    required={true}
                    autoComplete="current-password"
                    disabled={isPasswordLoading}
                  />
                </div>
                <div className="flex flex-col gap-0.5">
                  <TextInputField
                    label="New Password"
                    type="password"
                    value={newPassword.newPassword}
                    name={"newPassword"}
                    onChange={changePassword}
                    required={true}
                    autoComplete="new-password"
                    disabled={isPasswordLoading}
                  />
                </div>
                <div className="flex flex-col gap-0.5">
                  <TextInputField
                    label="Confirm Password"
                    type="password"
                    value={newPassword.confirmPassword}
                    name={"confirmPassword"}
                    onChange={changePassword}
                    required={true}
                    autoComplete="new-password"
                    disabled={isPasswordLoading}
                  />
                </div>
              </div>
              <div className="mt-1 text-xs font-semibold text-red-vivid-600">
                {passwordErrMsg}
              </div>
              <div className="flex gap-1">
                <ButtonSuccess
                  type="submit"
                  disabled={isPasswordLoading}
                  isLoading={isPasswordLoading}
                >
                  Update
                </ButtonSuccess>
                <ButtonWarning
                  onClick={() => {
                    togglePasswordEdit();
                    resetPasswordFields();
                  }}
                  type="reset"
                  disabled={isPasswordLoading}
                  isLoading={isPasswordLoading}
                >
                  Cancel
                </ButtonWarning>
              </div>
            </form>
          )}
          <div></div>
        </div>
      </section>
    </div>
  );
};
