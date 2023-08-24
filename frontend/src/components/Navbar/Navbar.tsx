import { FC, useEffect, useRef, useState } from "react";
import logo from "../../assets/images/logo.svg";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menubar } from "./Menubar";
import { HamBtn } from "./../Buttons/HamBtn";
import { useLazyLogoutUserQuery } from "../../services/userAuthApi";
import { selectCurrentUser } from "../../features/User/userSlice";
import { useAppSelector } from "../../app/hooks";

export const Navbar: FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const location = useLocation();
  const menubarRef = useRef<HTMLElement>(null);
  const menuBtnRef = useRef<HTMLInputElement>(null);

  const { isAuthenticated, user } = useAppSelector(selectCurrentUser);
  const [logoutUser] = useLazyLogoutUserQuery();

  const logoutCurrentUser = () => {
    logoutUser();
  };

  const navLinks = [
    { name: "Home", link: "/" },
    { name: "Products", link: "/products" },
    { name: "About", link: "/about" },
  ];

  const hamBtnHandler = (e: React.FormEvent) => {
    const target = e.target as HTMLInputElement;
    setIsOpen(target.checked);
  };

  const handleOutsideClick = (e: Event) => {
    const target = e.target as HTMLElement;
    if (
      menubarRef.current &&
      !menubarRef.current.contains(target) &&
      menuBtnRef.current != target &&
      menuBtnRef.current?.checked
    ) {
      setIsOpen(false);
      menuBtnRef.current.checked = false;
    }
  };

  useEffect(() => {
    if (menuBtnRef.current) {
      if (isOpen != menuBtnRef.current.checked) {
        setIsOpen(menuBtnRef.current?.checked);
      }
    }
    if (isOpen) {
      document.addEventListener("click", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, menuBtnRef.current]);

  const menuItems = navLinks.map((item, i) => (
    <li key={i} className="font-semibold hover:cursor-pointer hover:underline">
      <NavLink
        to={item.link}
        className={({ isActive }) =>
          isActive
            ? "inline-block w-full max-w-xl uppercase text-accent"
            : "inline-block w-full max-w-xl uppercase"
        }
      >
        {item.name}
      </NavLink>
    </li>
  ));

  if (
    location.pathname === "/login" ||
    location.pathname === "/signup" ||
    location.pathname === "/password/forgot" ||
    location.pathname.includes("/password/reset")
  ) {
    return null;
  }

  return (
    <header className="sticky top-0 z-[99999] m-auto bg-background font-inter shadow-navbar xs:py-2">
      {isOpen && (
        <div className="fixed z-30 min-h-screen w-screen bg-semiDarkOverlay xs:hidden"></div>
      )}
      <div className="m-auto flex items-center justify-between gap-4 xs:max-w-[95%] ss:max-w-[90%]">
        <img
          className="h-9 max-w-[10rem] p-2 xs:max-w-[12rem]"
          src={logo}
          alt="ShopeeFast Logo"
        />
        <ul className="hidden items-center justify-between xs:flex xs:w-[16rem] ss:w-[20rem] sm:w-[25rem]">
          {menuItems}
          <li className="flex items-center hover:cursor-pointer">
            {isAuthenticated ? (
              <>
                <Link to="/account">
                  <img
                    src={user.avatar.url}
                    alt="Profile Picture"
                    className="w-8 rounded-full border-2 border-accent"
                  />
                </Link>
                <div className="relative">
                  <button className="group peer flex h-7 items-center justify-center self-auto px-1 hover:cursor-pointer">
                    <span className="h-2 w-2 rotate-45 border-b-2 border-r-2 border-black duration-500 group-focus-within:rotate-[225deg]"></span>
                    <div
                      className="absolute right-0 top-full mt-2 hidden bg-background px-2 py-1 shadow-navbar duration-300 hover:bg-accent group-focus-within:block"
                      onClick={logoutCurrentUser}
                    >
                      Logout
                    </div>
                  </button>
                </div>
              </>
            ) : (
              <Link
                to="/login"
                className="inline-block w-full max-w-xl overflow-hidden border-2 border-textColor px-2 py-0.5 text-center text-base font-medium tracking-wider text-textColor duration-300 hover:border-secondary hover:bg-accent hover:text-secondary"
              >
                Login/Signup
              </Link>
            )}
          </li>
        </ul>
        <HamBtn hamBtnHandler={hamBtnHandler} ref={menuBtnRef} />
        <Menubar
          isOpen={isOpen}
          navLinks={navLinks}
          ref={menubarRef}
          isAuthenticated={isAuthenticated}
          user={user}
          logoutUser={logoutCurrentUser}
        />
      </div>
    </header>
  );
};
