import { Routes, Route } from "react-router-dom";
import { Login } from "./components/Pages/Login";
import { Home } from "./components/Pages/Home";
import { ForgotPassword } from "./components/Pages/ForgotPassword";
import { ResetPassword } from "./components/Pages/ResetPassword";
import { SignUp } from "./components/Pages/SignUp";
import { UserAccount } from "./components/Pages/UserAccount";
import RequireAuth from "./components/Routes/RequireAuth";
import { Layout } from "./components/Layout";
import { Products } from "./components/Pages/Products";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />
        <Route element={<RequireAuth />}>
          <Route path="/account" element={<UserAccount />} />
        </Route>
        <Route path="/*" element={<Home />} />
      </Route>
    </Routes>
  );
}

export default App;
