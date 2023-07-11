import { Navbar } from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import { Login } from "./components/Pages/Login";
import Home from "./components/Pages/Home";
import { ForgotPassword } from "./components/Pages/ForgotPassword";
import { ResetPassword } from "./components/Pages/ResetPassword";

function App() {
  return (
    <main>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />
      </Routes>
    </main>
  );
}

export default App;
