import { FC } from "react";
import { Navbar } from "./Navbar/Navbar";
import { Outlet } from "react-router-dom";

export const Layout: FC = () => {
  return (
    <main className="bg-background">
      <Navbar />
      <Outlet />
    </main>
  );
};
