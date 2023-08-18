import { FC } from "react";
import { Navbar } from "./Navbar/Navbar";
import { Outlet } from "react-router-dom";
import { Footer } from "./Footer/Footer";

export const Layout: FC = () => {
  return (
    <main className="bg-background font-inter">
      <Navbar />
      <Outlet />
      <Footer />
    </main>
  );
};
