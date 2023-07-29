import { FC, useEffect, useRef, useState } from "react";
import logo from "../../assets/logo.svg";
import { Link, useLocation } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { selectCurrentUser } from "../../features/User/userSlice";
import { useLazyLogoutUserQuery } from "../../services/userAuthApi";
import NoAvatar from "../../assets/NoAvatar.jpg";

export const Navbar: FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { isAuthenticated, user } = useAppSelector(selectCurrentUser);
  const location = useLocation();
  const menuBarRef = useRef<HTMLElement>(null);
  const menuBtnRef = useRef<HTMLInputElement>(null);

  console.log("isOpen", isOpen);

  const [logoutUser] = useLazyLogoutUserQuery();

  const logoutCurrentUser = () => {
    logoutUser();
  };

  const menubarHandler = (e: React.FormEvent) => {
    const target = e.target as HTMLInputElement;
    setIsOpen(target.checked);
  };

  const handleOutsideClick = (e: Event) => {
    const target = e.target as HTMLElement;

    if (
      menuBarRef.current &&
      !menuBarRef.current.contains(target) &&
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

  if (
    location.pathname === "/login" ||
    location.pathname === "/signup" ||
    location.pathname === "/password/forgot" ||
    location.pathname.includes("/password/reset")
  ) {
    return null;
  }

  return (
    <header className="sticky top-0 bg-background font-inter">
      <img className="h-9 max-w-[10rem] p-2" src={logo} alt="ShopeeFast Logo" />
      <label
        className="absolute right-0 top-0 z-[99999] hover:cursor-pointer"
        htmlFor="menuBtn"
        onClick={menubarHandler}
      >
        <span className="sr-only">Menubar Button</span>
        <div className="relative flex h-[32px] w-[32px] transform items-center justify-center overflow-hidden transition-all duration-200">
          <div className="ham-btn flex h-[24px] w-[20px] transform flex-col items-center justify-between overflow-hidden p-1 transition-all duration-300">
            <input
              className="peer hidden"
              type="checkbox"
              id="menuBtn"
              ref={menuBtnRef}
            />
            <div className="peer-checked:translate-y-0.3 peer-checked:translate-x-0.6 h-[3px] w-4 origin-left transform bg-black transition-all duration-300 peer-checked:rotate-[45deg]"></div>
            <div className="h-[3px] w-4 transform rounded bg-black transition-all duration-300 peer-checked:-translate-x-10"></div>
            <div className="peer-checked:translate-x-0.6 h-[3px] w-4 origin-left transform bg-black transition-all  duration-300 peer-checked:-translate-y-0.5 peer-checked:-rotate-[45deg]"></div>
          </div>
        </div>
      </label>
      <aside
        className={`absolute right-0 top-0 z-[9999] h-[100vh] w-10/12 overflow-y-hidden border-l-2 border-secondary bg-accent shadow-cardShadow duration-500 ${
          !isOpen ? "clip-circle-none" : "clip-circle-full"
        }`}
        ref={menuBarRef}
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
    </header>
  );
};
