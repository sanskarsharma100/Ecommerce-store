import { Navbar } from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Pages/Login";
import Home from "./components/Pages/Home";

function App() {
  return (
    <main>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </main>
  );
}

export default App;
