import { ChangeEvent, FC, useEffect, useState } from "react";
import { useAppSelector } from "../../app/hooks";
import { selectCurrentUser } from "../../features/User/userSlice";
import { StringObject } from "../../utils/types";

import {
  useLazyLoadUserQuery,
  useUpdatePasswordMutation,
  useUpdateUserDetailsMutation,
} from "../../services/userApi";
import { isErrorWithData, isErrorWithMessage } from "../../services/helpers";

export const UserAccount: FC = () => {
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

  const handlePasswordUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(newPassword);
    updatePassword(newPassword);
  };

  useEffect(() => {
    if (!isUserLoading && isUserSuccess) {
      loadUser();
      toggleUserEdit();
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUserLoading, isUserSuccess, isPasswordLoading, isPasswordSuccess]);

  const userInfo = Object.keys(updatedUser).map(function (key) {
    return (
      <div className="flex items-center gap-1" key={key}>
        <p className="font-medium capitalize">{[key]}:</p>
        {!isUserEdit ? (
          <p>{updatedUser[key]}</p>
        ) : (
          <input
            className="w-full border border-secondary px-1 py-0.5"
            type="text"
            value={updatedUser[key]}
            onChange={changeUserInfo}
            name={key}
          />
        )}
      </div>
    );
  });

  const passwordInputs = Object.keys(newPassword).map(function (key) {
    return (
      <div className="mt-2 flex flex-wrap items-center gap-1" key={key}>
        <label className="font-medium capitalize">{[key]}:</label>
        <input
          className="w-full border border-secondary px-1 py-0.5"
          type="password"
          value={newPassword[key]}
          onChange={changePassword}
          name={key}
        />
      </div>
    );
  });

  return (
    <div className="h-[100dvh] font-inter">
      <section className="m-1 border-2 border-secondary p-2">
        <div>
          <img
            src={user.avatar.url}
            alt="Profile Photo"
            className="m-auto aspect-square rounded-full"
          />
          <div className="mt-4 flex flex-col gap-2">
            {userInfo}
            {!isUserEdit && (
              <button
                className="mt-2 border-3 border-secondary px-2 py-1 text-sm font-semibold duration-200 hover:bg-accent"
                onClick={toggleUserEdit}
              >
                Edit
              </button>
            )}
            {isUserEdit && (
              <div className="flex justify-between gap-1">
                <button
                  className="mt-2 w-full border-3 border-secondary px-2 py-1 text-sm font-semibold duration-200 hover:bg-success"
                  onClick={updateUserInfo}
                >
                  Save
                </button>
                <button
                  className="mt-2 w-full border-3 border-secondary px-2 py-1 text-sm font-semibold duration-200 hover:bg-warning"
                  onClick={() => {
                    toggleUserEdit();
                    resetUserInfo();
                  }}
                >
                  Cancel
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
            >
              Change Password
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
                Cancel
              </button>
            </div>
          )}
          {isPasswordEdit && (
            <form onSubmit={handlePasswordUpdate}>
              {passwordInputs}
              <p className="mt-1 text-xs font-semibold text-warning">
                {passwordErrMsg}
              </p>
              <input
                className="mt-1 w-full border-3 border-secondary px-2 py-1 text-sm font-semibold duration-200 hover:cursor-pointer hover:bg-success"
                type="submit"
                value="Update"
              />
            </form>
          )}
          <div></div>
        </div>
      </section>
    </div>
  );
};
