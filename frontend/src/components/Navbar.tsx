import { FC } from "react";
import ShopeeFastLogo from "../assets/ShopeeFastLogo.png";
import { Link, useLocation } from "react-router-dom";

import { useAppSelector } from "../app/hooks";

export const Navbar: FC = () => {
  const isLoggedIn = useAppSelector((state) => state.loginAuth.value);
  console.log("loginAuth", isLoggedIn);
  const location = useLocation();

  if (
    location.pathname === "/login" ||
    location.pathname === "/signup" ||
    location.pathname === "/password/forgot" ||
    location.pathname.includes("/password/reset")
  ) {
    return null;
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <img
          className="h-9 max-w-[10rem]"
          src={ShopeeFastLogo}
          alt="ShopeeFast Logo"
        />
        <button className="group relative p-2">
          <div className="relative flex h-[50px] w-[50px] transform items-center justify-center overflow-hidden transition-all duration-200">
            <div className="flex h-[30px] w-[25px] origin-center transform flex-col justify-between overflow-hidden transition-all duration-300">
              <div className="h-[5px] w-7 origin-left transform bg-black transition-all duration-300 group-focus:translate-x-1 group-focus:translate-y-1 group-focus:rotate-[42deg]"></div>
              <div className="h-[5px] w-1/2 transform rounded bg-black transition-all duration-300 group-focus:-translate-x-10"></div>
              <div className="h-[5px] w-7 origin-left transform bg-black transition-all duration-300  group-focus:-translate-y-0.5 group-focus:translate-x-1 group-focus:-rotate-[42deg]"></div>
            </div>
          </div>
        </button>
      </div>
      <ul>
        <li>Home</li>
        <li>Products</li>
        <li>About</li>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </ul>
    </div>
  );
};
