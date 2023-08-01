import { Ref, forwardRef } from "react";
import { useAppSelector } from "../../app/hooks";
import { selectCurrentUser } from "../../features/User/userSlice";
import NoAvatar from "../../assets/NoAvatar.jpg";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useLazyLogoutUserQuery } from "../../services/userAuthApi";

type Props = {
  isOpen: boolean;
};

export const Menubar = forwardRef(
  ({ isOpen }: Props, ref: Ref<HTMLElement>) => {
    const { isAuthenticated, user } = useAppSelector(selectCurrentUser);
    const [logoutUser] = useLazyLogoutUserQuery();
    const navigate = useNavigate();

    const logoutCurrentUser = () => {
      logoutUser();
    };

    const redirectToUserAccount = () => {
      navigate("/account");
    };

    return (
      <aside
        className={`absolute right-0 top-0 z-[9999] h-[100vh] w-10/12 overflow-y-hidden border-l-2 border-secondary bg-background shadow-cardShadow duration-500 ${
          !isOpen ? "clip-circle-none" : "clip-circle-full"
        }`}
        ref={ref}
      >
        <ul className="m-4 mt-20 flex flex-col gap-4 overflow-x-hidden text-left">
          {isAuthenticated && (
            <li className="w-full bg-primary">
              <div
                className="group relative flex max-w-full items-center gap-2 border-x-2 border-t-2 border-secondary bg-background p-2 hover:cursor-pointer"
                onClick={redirectToUserAccount}
              >
                <div className="absolute right-2 rotate-45 border-r-2 border-t-2 border-secondary p-1 duration-300 group-hover:right-1"></div>
                <img
                  className="aspect-square w-12 max-w-fit rounded-full"
                  src={user.avatar.url ? user.avatar.url : NoAvatar}
                  alt="User Photo"
                />
                <div className="w-fit text-ellipsis text-left text-sm font-medium text-textColor">
                  <p>{user.name}</p>
                </div>
              </div>
              <button
                className="hover:bg-secondary2 w-full overflow-hidden border-2 border-secondary bg-background p-1 text-sm font-medium tracking-wider text-textColor duration-300 hover:bg-accent hover:text-primary"
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
                className="inline-block w-full max-w-xl overflow-hidden border-2 border-textColor p-2 text-center text-base font-medium tracking-wider text-textColor duration-300 hover:border-secondary hover:bg-accent hover:text-secondary"
              >
                Login/Signup
              </Link>
            </li>
          )}
          <li className="font-semibold hover:cursor-pointer hover:underline">
            <Link to="/" className="inline-block w-full max-w-xl">
              Home
            </Link>
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
