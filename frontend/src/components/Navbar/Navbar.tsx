import { FC, MouseEvent, useEffect, useRef, useState } from "react";
import logo from "../../assets/images/logo.svg";
import { IoCartOutline } from "react-icons/io5";
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

  const logoutCurrentUser = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    logoutUser();
  };

  const navLinks = [
    { name: "Home", link: "/" },
    { name: "Products", link: "/products" },
    { name: "Cart", link: "/cart", icon: "cart" },
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
    <li
      key={i}
      className="flex h-full align-middle font-semibold hover:cursor-pointer"
    >
      <NavLink
        to={item.link}
        end
        className={({ isActive }) =>
          isActive
            ? "flex w-full max-w-xl items-center justify-center bg-light px-2 text-sm uppercase duration-300"
            : "flex w-full max-w-xl items-center justify-center px-2 text-sm uppercase duration-300 hover:bg-light"
        }
      >
        {item.icon ? <IoCartOutline className="text-3xl" /> : item.name}
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
    <header className="sticky top-0 z-[99999] m-auto bg-background font-inter shadow-navbar">
      {isOpen && (
        <div className="fixed z-30 min-h-screen w-screen bg-semiDarkOverlay ss:hidden"></div>
      )}
      <div className="m-auto flex justify-between gap-4 sm:max-w-[90%]">
        <NavLink to="/" className="m-2 flex items-center">
          <img
            className="h-9 max-w-[10rem] p-2 xs:max-w-[12rem] sm:p-1"
            src={logo}
            alt="ShopeeFast Logo"
          />
        </NavLink>
        <ul className="hidden items-center gap-2 p-2 ss:flex">
          {menuItems}
          <li className="flex h-full hover:cursor-pointer">
            {isAuthenticated ? (
              <NavLink
                to="/account"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center bg-light px-2 py-1.5 duration-300"
                    : "flex items-center px-2 py-1.5 duration-300 hover:bg-light"
                }
              >
                <div className="flex gap-1">
                  <div className="flex items-center gap-1">
                    <img
                      src={user.avatar.url}
                      alt="Profile Picture"
                      className="w-8 rounded-full"
                    />
                    <div>
                      <span className="text-sm font-semibold">{user.name}</span>
                    </div>
                  </div>
                  <div className="relative">
                    <button
                      className="group peer flex h-7 items-center justify-center self-auto px-1 hover:cursor-pointer"
                      onClick={(e) => e.preventDefault()}
                      role="button"
                    >
                      <span className="h-2 w-2 rotate-45 border-b-2 border-r-2 border-black duration-500 group-focus-within:rotate-[225deg]"></span>
                      <button
                        className="absolute right-0 top-full mt-2 hidden bg-background px-2 py-1 shadow-navbar duration-300 hover:bg-accent group-focus-within:block"
                        onClick={logoutCurrentUser}
                      >
                        Logout
                      </button>
                    </button>
                  </div>
                </div>
              </NavLink>
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
