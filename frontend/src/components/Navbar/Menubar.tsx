import { Ref, forwardRef } from "react";
import NoAvatar from "../../assets/images/NoAvatar.jpg";
import { Link, NavLink } from "react-router-dom";
import { FaAngleRight } from "react-icons/fa6";
import { User } from "../../utils/types";
import { ButtonPrimary } from "../Buttons/ButtonPrimary";

type Props = {
  isOpen: boolean;
  navLinks: Array<{ name: string; link: string; icon?: string }>;
  isAuthenticated: boolean;
  user: User;
  logoutUser: () => void;
};

export const Menubar = forwardRef(
  (
    { isOpen, navLinks, isAuthenticated, user, logoutUser }: Props,
    ref: Ref<HTMLElement>
  ) => {
    const menuItems = navLinks.map((item, i) => (
      <li key={i} className="font-semibold hover:cursor-pointer">
        {!item.icon && (
          <NavLink
            to={item.link}
            end
            className={({ isActive }) =>
              isActive
                ? "block w-full rounded-lg bg-primary-300 p-2 text-sm uppercase text-primary-900 duration-300"
                : "block w-full rounded-lg p-2 text-sm uppercase text-primary-900 duration-300 hover:bg-primary-200 active:bg-primary-200"
            }
          >
            {item.name}
          </NavLink>
        )}
      </li>
    ));

    return (
      <aside
        className={`absolute right-0 top-0 z-[9999] h-[100vh] w-4/5 overflow-y-hidden bg-background duration-500 xs:w-8/12 ss:w-6/12 sm:!hidden ${
          !isOpen ? "clip-circle-none" : "clip-circle-full"
        }`}
        ref={ref}
      >
        <div className="m-4 mt-20 flex flex-col gap-4 overflow-x-hidden text-left">
          {isAuthenticated && (
            <div className="w-full overflow-hidden rounded-lg">
              <Link
                className="group relative flex max-w-full items-center gap-2 bg-primary-400 p-2 hover:cursor-pointer"
                to="/account"
              >
                <img
                  className="aspect-square w-12 max-w-fit rounded-full"
                  src={user.avatar.url ? user.avatar.url : NoAvatar}
                  alt="User Photo"
                />
                <span className="line-clamp-1 overflow-ellipsis text-left text-sm font-semibold text-primary-900">
                  {user.name}
                </span>
                <FaAngleRight className="ml-auto pr-1 duration-300 group-hover:pr-0 group-active:pr-0" />
              </Link>
              <ButtonPrimary
                onClick={logoutUser}
                className="rounded-tl-none rounded-tr-none"
              >
                Logout
              </ButtonPrimary>
            </div>
          )}
          {!isAuthenticated && (
            <div className="m-auto h-fit w-full max-w-xs p-2">
              <ButtonPrimary to="/login">Login / Signup</ButtonPrimary>
            </div>
          )}
          <ul className="flex flex-col gap-0.5">{menuItems}</ul>
        </div>
      </aside>
    );
  }
);
