import { FC, useEffect, useRef, useState } from "react";
import logo from "../../assets/images/logo.svg";
import { useLocation } from "react-router-dom";
import { Menubar } from "./Menubar";
import { HamBtn } from "./../Buttons/HamBtn";

export const Navbar: FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const location = useLocation();
  const menubarRef = useRef<HTMLElement>(null);
  const menuBtnRef = useRef<HTMLInputElement>(null);

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

  if (
    location.pathname === "/login" ||
    location.pathname === "/signup" ||
    location.pathname === "/password/forgot" ||
    location.pathname.includes("/password/reset")
  ) {
    return null;
  }

  return (
    <header className="sticky top-0 z-[99999] bg-background font-inter">
      {isOpen && (
        <div className="fixed z-30 min-h-screen w-screen bg-semiDarkOverlay md:hidden"></div>
      )}
      <img className="h-9 max-w-[10rem] p-2" src={logo} alt="ShopeeFast Logo" />
      <HamBtn hamBtnHandler={hamBtnHandler} ref={menuBtnRef} />
      <Menubar isOpen={isOpen} ref={menubarRef} />
    </header>
  );
};
