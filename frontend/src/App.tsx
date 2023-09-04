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
import { ProductDetails } from "./components/Pages/ProductDetails";
import { Cart } from "./components/Pages/Cart";
import SecuredRoute from "./components/Routes/SecuredRoute";
import { ScrollToTop } from "./components/ScrollToTop";

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route element={<SecuredRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/password/forgot" element={<ForgotPassword />} />
            <Route path="/password/reset/:token" element={<ResetPassword />} />
          </Route>
          <Route element={<RequireAuth />}>
            <Route path="/account" element={<UserAccount />} />
          </Route>
          <Route path="/*" element={<Home />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
