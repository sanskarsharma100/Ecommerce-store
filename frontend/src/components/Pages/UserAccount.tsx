import { ChangeEvent, FC, useEffect, useState } from "react";
import { useAppSelector } from "../../app/hooks";
import { selectCurrentUser } from "../../features/User/userSlice";
import { StringObject } from "../../utils/types";
import {
  useLazyLoadUserQuery,
  useUpdateUserDetailsMutation,
} from "../../services/userApi";

export const UserAccount: FC = () => {
  const { user } = useAppSelector(selectCurrentUser);
  const [updateUserDetails, { isLoading, isSuccess }] =
    useUpdateUserDetailsMutation();

  const [loadUser] = useLazyLoadUserQuery();

  const [updatedUser, setUpdatedUser] = useState<StringObject>({
    name: user.name,
    email: user.email,
  });
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const toggleEdit = () => {
    setIsEdit(!isEdit);
  };

  const changeUserInfo = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setUpdatedUser((prevUser) => ({
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

  const updateUserInfo = () => {
    const info = {
      name: updatedUser.name,
      email: updatedUser.email,
    };
    updateUserDetails(info);
  };

  useEffect(() => {
    if (!isLoading && isSuccess) {
      loadUser();
      toggleEdit();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, isSuccess]);

  const userInfo = Object.keys(updatedUser).map(function (key) {
    return (
      <div className="flex items-center gap-1" key={key}>
        <p className="font-semibold capitalize">{[key]}:</p>
        {!isEdit ? (
          <>
            <p>{updatedUser[key]}</p>
          </>
        ) : (
          <input
            className="border border-secondary px-1 py-0.5"
            type="text"
            value={updatedUser[key]}
            onChange={changeUserInfo}
            name={key}
          />
        )}
      </div>
    );
  });

  return (
    <div className="h-[100dvh] font-inter">
      <section className="m-1 border-2 border-secondary p-2">
        <img
          src={user.avatar.url}
          alt="Profile Photo"
          className="m-auto aspect-square rounded-full"
        />
        <div className="mt-4 flex flex-col gap-2">
          {userInfo}
          {!isEdit && (
            <button
              className="mt-2 border-3 border-secondary px-2 py-1 text-sm font-semibold duration-200 hover:bg-accent"
              onClick={toggleEdit}
            >
              Edit
            </button>
          )}
          {isEdit && (
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
                  toggleEdit();
                  resetUserInfo();
                }}
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
