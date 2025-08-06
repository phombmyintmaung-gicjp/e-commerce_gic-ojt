import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import logo from "../../assets/logo.svg";
import cartIcon from "../../assets/cart_icon.svg";
import PersonIcon from "../../assets/login_name_icon.svg";
import NotificationIcon from "../../assets/notification_icon.svg";

const NavBar = ({ isAuthPage = false }) => {
  const [showModal, setShowModal] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [user, setUser] = useState(null);
  const [cartItems, setCartItems] = useState(0);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const linkClass = ({ isActive }) =>
    `nav-link text-base uppercase font-serif transition-colors ${
      isActive
        ? "text-[var(--color-highlight)]"
        : "text-[var(--color-black)] hover:text-white"
    }`;

  return (
    <nav
      className={`px-6 py-1.5 flex items-center justify-between border-b bg-white z-50 transition-all duration-300 w-full sticky top-0 ${
        isSticky && !isAuthPage ? "shadow-md py-2" : "py-4"
      }`}>
      <NavLink to="/" className="flex items-center space-x-2">
        <img
          src={logo}
          alt="Logo"
          className={`transition-transform duration-500 ${
            isSticky && !isAuthPage ? "h-16 w-16" : "h-24 w-24"
          } hover:rotate-180`}
        />
        <span className="uppercase text-2xl font-bold text-[var(--color-black)] font-serif tracking-wider">
          The Clothique
        </span>
      </NavLink>

      {!isAuthPage && (
        <ul className="flex items-center gap-6">
          <li>
            <NavLink to="/" className={linkClass}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/shop" className={linkClass}>
              Shop
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/cart"
              id="cart-icon"
              className={({ isActive }) =>
                `group nav-link flex items-center gap-1 text-base uppercase font-serif transition-colors ${
                  isActive
                    ? "text-[var(--color-highlight)]"
                    : "text-[var(--color-black)] hover:text-white"
                }`
              }>
              Cart
              <img
                src={cartIcon}
                alt="Cart"
                className="w-6 h-6 transition group-hover:filter group-hover:brightness-0 group-hover:invert"
              />
              <span className="text-xs mb-4 p-1 rounded-full bg-[var(--color-black)] text-[var(--color-white)] group-hover:invert">
                {cartItems}
              </span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/about-us" className={linkClass}>
              About Us
            </NavLink>
          </li>
          {!user ? (
            <li>
              <Link
                to="#"
                className="get-started text-[var(--color-black)] text-base font-serif hover:text-[var(--color-highlight)]"
                onMouseEnter={() => setShowModal(true)}
                onMouseLeave={() => setShowModal(false)}>
                Get Started
                {showModal && (
                  <div className="px-4 absolute right-30 mt-2 w-40 bg-[var(--color-black)] shadow-md rounded-md z-10">
                    <Link
                      to="/login"
                      onClick={() => setShowModal(false)}
                      className="block px-4 py-2 text-sm text-white border-b hover:text-[var(--color-highlight)]">
                      Login
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setShowModal(false)}
                      className="block px-4 py-2 text-sm text-white hover:text-[var(--color-highlight)]">
                      Register
                    </Link>
                  </div>
                )}
              </Link>
            </li>
          ) : (
            <>
              <li>
                <Link
                  to="/users/profile"
                  className="hover:opacity-75 flex items-center gap-2">
                  <img
                    src={PersonIcon}
                    alt="Notifications"
                    className="w-6 h-6"
                  />
                  <span>{user.username}</span>
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:opacity-75">
                  <img
                    src={NotificationIcon}
                    alt="Account"
                    className="w-6 h-6 rounded-full"
                  />
                </Link>
              </li>
            </>
          )}
        </ul>
      )}
    </nav>
  );
};

export default NavBar;
