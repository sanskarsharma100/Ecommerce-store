import { Navbar } from "./components/Navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import { Login } from "./components/Pages/Login";
import { Home } from "./components/Pages/Home";
import { ForgotPassword } from "./components/Pages/ForgotPassword";
import { ResetPassword } from "./components/Pages/ResetPassword";
import { SignUp } from "./components/Pages/SignUp";
import { useEffect } from "react";
import { useLazyLoadUserQuery } from "./services/userAuthApi";
import { UserAccount } from "./components/Pages/UserAccount";

function App() {
  const [loadUser] = useLazyLoadUserQuery();

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <main className="bg-background">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />
        <Route path="/account" element={<UserAccount />} />
      </Routes>
    </main>
  );
}

export default App;
