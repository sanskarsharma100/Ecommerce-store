import { Ref, forwardRef } from "react";
import { useAppSelector } from "../../app/hooks";
import { selectCurrentUser } from "../../features/User/userSlice";
import NoAvatar from "../../assets/NoAvatar.jpg";
import { Link } from "react-router-dom";
import { useLazyLogoutUserQuery } from "../../services/userAuthApi";

type Props = {
  isOpen: boolean;
};

export const Menubar = forwardRef(
  ({ isOpen }: Props, ref: Ref<HTMLElement>) => {
    const { isAuthenticated, user } = useAppSelector(selectCurrentUser);
    const [logoutUser] = useLazyLogoutUserQuery();

    const logoutCurrentUser = () => {
      logoutUser();
    };

    return (
      <aside
        className={`absolute right-0 top-0 z-[9999] h-[100vh] w-10/12 overflow-y-hidden border-l-2 border-secondary bg-accent shadow-cardShadow duration-500 ${
          !isOpen ? "clip-circle-none" : "clip-circle-full"
        }`}
        ref={ref}
      >
        <ul className="m-4 mt-20 flex flex-col gap-4 overflow-x-hidden text-left">
          {isAuthenticated && (
            <li className="w-full rounded-lg bg-primary">
              <div className="flex max-w-full items-center gap-2 rounded-lg bg-background p-2">
                <img
                  className="w-12 max-w-fit rounded-full"
                  src={user.avatar.url ? user.avatar.url : NoAvatar}
                  alt="User Photo"
                />
                <div className="w-fit text-ellipsis text-left text-sm font-medium text-textColor">
                  <p>{user.name}</p>
                </div>
              </div>
              <button
                className="hover:bg-secondary2 w-full overflow-hidden rounded-b-lg border border-secondary bg-background p-1 text-sm font-medium tracking-wider text-accent"
                onClick={logoutCurrentUser}
                role="button"
              >
                Logout
              </button>
            </li>
          )}
          {!isAuthenticated && (
            <li className="m-auto h-fit w-full max-w-xs">
              <Link
                to="/login"
                className="inline-block w-full max-w-xl overflow-hidden border-2 border-textColor p-2 text-center text-base font-medium tracking-wider text-textColor duration-300 hover:border-secondary hover:bg-secondary hover:text-white"
              >
                Login/Signup
              </Link>
            </li>
          )}
          <li className="font-semibold hover:cursor-pointer hover:underline">
            Home
          </li>
          <li className="font-semibold hover:cursor-pointer hover:underline">
            Products
          </li>
          <li className="font-semibold hover:cursor-pointer hover:underline">
            About
          </li>
        </ul>
      </aside>
    );
  }
);
