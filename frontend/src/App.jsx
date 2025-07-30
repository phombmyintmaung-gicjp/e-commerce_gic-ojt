import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import NavBar from "./components/NavBar/NavBar";
import ScrollToTop from "./components/ScrollToTop";
import Login from "./screens/login/Login";
import Home from "./screens/home/Home";
import Register from "./screens/register/Register";
import Footer from "./components/Footer/Footer";
import AboutUS from "./screens/AboutUs/AboutUS";
import Shop from "./screens/Shop/Shop";

function App() {
  const location = useLocation();
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";
  useEffect(() => {
    AOS.init({ duration: 1500 });
  }, []);
  return (
    <>
      <NavBar isAuthPage={isAuthPage} />
      <ScrollToTop isAuthPage={isAuthPage} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about-us" element={<AboutUS />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
