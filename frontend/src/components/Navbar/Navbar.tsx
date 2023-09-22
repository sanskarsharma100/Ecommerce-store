import { FC, useEffect, useRef, useState } from "react";
import logo from "../../assets/images/logo.svg";
import { IoCartOutline } from "react-icons/io5";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menubar } from "./Menubar";
import { HamBtn } from "./../Buttons/HamBtn";
import { useLazyLogoutUserQuery } from "../../services/userAuthApi";
import { selectCurrentUser } from "../../features/User/userSlice";
import { useAppSelector } from "../../app/hooks";
import { SearchBar } from "./SearchBar";
import { FaAngleDown } from "react-icons/fa6";
import { ButtonPrimary } from "../Buttons/ButtonPrimary";

export const Navbar: FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isSearchBarFocused, setIsSearchBarFocused] = useState<boolean>(false);
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] =
    useState<boolean>(false);
  const location = useLocation();
  const menubarRef = useRef<HTMLElement>(null);
  const menuBtnRef = useRef<HTMLInputElement>(null);
  const accountDropdownRef = useRef<HTMLButtonElement>(null);

  const { isAuthenticated, user } = useAppSelector(selectCurrentUser);
  const [logoutUser] = useLazyLogoutUserQuery();

  const logoutCurrentUser = () => {
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
    if (
      accountDropdownRef.current &&
      !accountDropdownRef.current.contains(target)
    ) {
      setIsAccountDropdownOpen(false);
    }
  };

  useEffect(() => {
    if (menuBtnRef.current) {
      if (isOpen != menuBtnRef.current.checked) {
        setIsOpen(menuBtnRef.current?.checked);
      }
    }
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, menuBtnRef.current, isAccountDropdownOpen]);

  const menuItems = navLinks.map((item, i) => (
    <li
      key={i}
      className={`h-full align-middle font-semibold hover:cursor-pointer sm:flex ${
        item.icon ? "flex" : "hidden"
      }`}
    >
      <NavLink
        to={item.link}
        end
        className={({ isActive }) =>
          isActive
            ? "flex w-full max-w-xl items-center justify-center rounded-lg bg-primary-300 px-2 text-sm uppercase text-primary-900 duration-300"
            : "flex w-full max-w-xl items-center justify-center rounded-lg px-2 text-sm uppercase text-primary-900 duration-300 hover:bg-primary-200"
        }
      >
        {item.icon ? <IoCartOutline className="text-2xl" /> : item.name}
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
    <header className="sticky top-0 z-[99999] m-auto border-b-3 border-b-primary-200 bg-background font-inter">
      {isOpen && (
        <div className="fixed z-[9999] min-h-screen w-screen bg-black/40 sm:hidden"></div>
      )}
      <div className="relative m-auto flex justify-between md:max-w-[90%]">
        <NavLink to="/" className="m-2 flex items-center">
          <img
            className="h-9 max-w-[10rem] p-2 xs:max-w-[12rem] sm:p-2"
            src={logo}
            alt="ShopeeFast Logo"
          />
        </NavLink>
        <div
          className={`z-[9990] mr-2 h-fit xs:static xs:!flex xs:w-fit xs:p-0 md:max-w-sm lg:max-w-md ${
            isSearchBarFocused
              ? "absolute m-auto w-full p-2"
              : "my-auto ml-auto w-fit"
          }`}
        >
          <SearchBar
            isSearchBarFocused={isSearchBarFocused}
            setIsSearchBarFocused={setIsSearchBarFocused}
          />
        </div>
        <ul className="items-center gap-2 py-2 sm:flex sm:p-2">
          {menuItems}
          <li className="relative hidden h-full min-w-fit hover:cursor-pointer sm:flex">
            {isAuthenticated ? (
              <>
                <button
                  className={`flex items-center rounded-lg px-2 py-1.5 text-primary-900 duration-300 hover:bg-primary-200 ${
                    isAccountDropdownOpen &&
                    "bg-primary-300 ring-1 ring-primary-500"
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    setIsAccountDropdownOpen(!isAccountDropdownOpen);
                  }}
                  ref={accountDropdownRef}
                >
                  <div className="flex min-w-fit gap-0.5">
                    <div className="flex items-center gap-1">
                      <img
                        src={user.avatar.url}
                        alt="Profile Picture"
                        className="w-8 rounded-full ring-1 ring-primary-900"
                      />
                      <div className="hidden md:block">
                        <span className="line-clamp-1 overflow-ellipsis text-sm font-semibold">
                          {user.name}
                        </span>
                      </div>
                    </div>
                    <div>
                      <div className="flex h-full items-center justify-center">
                        <FaAngleDown
                          className={`duration-300 ${
                            isAccountDropdownOpen && "rotate-180"
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                </button>
                <div
                  className={`absolute right-0 top-full w-[150%] overflow-hidden rounded-lg border-2 border-primary-400 bg-primary-100 text-center md:w-full ${
                    isAccountDropdownOpen ? "block" : "hidden"
                  }`}
                >
                  <Link
                    to="/account"
                    className={`w-full border-b border-inherit py-1.5 duration-300 hover:bg-primary-400 ${
                      isAccountDropdownOpen ? "block" : "hidden"
                    }`}
                  >
                    Account
                  </Link>
                  <button
                    className={`w-full py-1.5 duration-300 hover:bg-primary-400`}
                    onClick={logoutCurrentUser}
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <ButtonPrimary to="/login">Login / Signup</ButtonPrimary>
            )}
          </li>
        </ul>
        <div className="static ml-10 sm:hidden">
          <HamBtn hamBtnHandler={hamBtnHandler} ref={menuBtnRef} />
        </div>
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
