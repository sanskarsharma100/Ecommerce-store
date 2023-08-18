import { FC, useEffect, useRef, useState } from "react";
import logo from "../../assets/images/logo.svg";
import { Link, useLocation } from "react-router-dom";
import { Menubar } from "./Menubar";
import { HamBtn } from "./../Buttons/HamBtn";

export const Navbar: FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const location = useLocation();
  const menubarRef = useRef<HTMLElement>(null);
  const menuBtnRef = useRef<HTMLInputElement>(null);

  const navLinks = [
    { name: "Home", link: "/" },
    { name: "Categories", link: "/categories" },
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
      <Link to={item.link} className="inline-block w-full max-w-xl">
        {item.name}
      </Link>
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
    <header className="sticky top-0 z-[99999] m-auto bg-background font-inter xs:py-2">
      {isOpen && (
        <div className="fixed z-30 min-h-screen w-screen bg-semiDarkOverlay xs:hidden"></div>
      )}
      <div className="m-auto flex items-center justify-between gap-2 xs:max-w-[90%]">
        <img
          className="h-9 max-w-[10rem] p-2 xs:max-w-[12rem]"
          src={logo}
          alt="ShopeeFast Logo"
        />
        <ul className="hidden w-[15rem] justify-between xs:flex">
          {menuItems}
        </ul>
        <HamBtn hamBtnHandler={hamBtnHandler} ref={menuBtnRef} />
        <Menubar isOpen={isOpen} navLinks={navLinks} ref={menubarRef} />
      </div>
    </header>
  );
};
