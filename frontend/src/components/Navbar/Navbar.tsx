import { FC, useRef, useState } from "react";
import logo from "../../assets/ShopeeFastLogo.png";
import { Link, useLocation } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { selectCurrentUser } from "../../features/User/userSlice";
import { useLazyLogoutUserQuery } from "../../services/userAuthApi";
import NoAvatar from "../../assets/NoAvatar.jpg";

export const Navbar: FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { isAuthenticated, user } = useAppSelector(selectCurrentUser);
  const location = useLocation();
  const menuBtnRef = useRef(null);

  const [logoutUser] = useLazyLogoutUserQuery();

  console.log("isOpen", isOpen);

  const logoutCurrentUser = () => {
    logoutUser();
  };

  const menubarHandler = (e: React.FormEvent) => {
    const target = e.target as HTMLInputElement;
    console.log("target.checked", target.checked);
    setIsOpen(target.checked);
  };

  if (
    location.pathname === "/login" ||
    location.pathname === "/signup" ||
    location.pathname === "/password/forgot" ||
    location.pathname.includes("/password/reset")
  ) {
    return null;
  }

  return (
    <header className="sticky top-0 font-inter">
      <img className="h-9 max-w-[10rem]" src={logo} alt="ShopeeFast Logo" />
      <label
        className="absolute right-0 top-0 z-[99999]"
        htmlFor="menuBtn"
        onClick={menubarHandler}
      >
        <span className="sr-only">Menubar Button</span>
        <div className="relative flex h-[50px] w-[50px] transform items-center justify-center overflow-hidden transition-all duration-200">
          <div className="ham-btn flex h-[30px] w-[25px] origin-center transform flex-col justify-between overflow-hidden transition-all duration-300">
            <input
              className="peer hidden"
              type="checkbox"
              id="menuBtn"
              ref={menuBtnRef}
            />
            <div className="h-[3px] w-7 origin-left transform bg-black transition-all duration-300 peer-checked:translate-x-1 peer-checked:translate-y-1 peer-checked:rotate-[45deg]"></div>
            <div className="h-[3px] w-1/2 transform rounded bg-black transition-all duration-300 peer-checked:-translate-x-10"></div>
            <div className="h-[3px] w-7 origin-left transform bg-black transition-all duration-300  peer-checked:-translate-y-0.5 peer-checked:translate-x-1 peer-checked:-rotate-[45deg]"></div>
          </div>
        </div>
      </label>
      <aside
        className={`absolute right-0 top-0 z-[9999] h-[100vh] w-10/12 overflow-y-hidden bg-[rgb(0,100,0,0.25)] backdrop-blur-lg ${
          !isOpen && "hidden"
        }`}
      >
        <ul className="m-4 mt-20 overflow-x-hidden text-center">
          {isAuthenticated && (
            <li className="w-full bg-green-300 p-2">
              <div className="flex max-w-full flex-wrap items-center gap-2">
                <img
                  className="m-auto w-16 max-w-fit rounded-full"
                  src={user.avatar.url ? user.avatar.url : NoAvatar}
                  alt="User Photo"
                />
                <div className="ml-2 text-ellipsis text-left text-base">
                  <p>{user.name}</p>
                  <p>{user.email}</p>
                </div>
              </div>
              <button
                className="w-full overflow-hidden rounded-lg bg-green-500 p-2 text-base font-medium tracking-wider text-white hover:bg-green-600"
                onClick={logoutCurrentUser}
                role="button"
              >
                Logout
              </button>
            </li>
          )}
          <li className="m-auto h-fit max-w-xs">
            {!isAuthenticated && (
              <Link
                to="/login"
                className="inline-block w-full overflow-hidden rounded-lg bg-green-700 p-2 text-base font-medium tracking-wider text-white"
              >
                Login/Signup
              </Link>
            )}
          </li>
          <li>Home</li>
          <li>Products</li>
          <li>About</li>
        </ul>
      </aside>
    </header>
  );
};
