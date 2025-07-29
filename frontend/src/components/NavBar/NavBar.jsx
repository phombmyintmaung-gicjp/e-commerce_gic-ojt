import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg";
import cartIcon from "../../assets/cart_icon.svg";

const NavBar = ({ isAuthPage = false }) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <nav className="px-6 py-2 flex items-center justify-between border-b mb-5">
      <Link to="/" className="flex items-center space-x-2">
        <img
          src={logo}
          alt="Logo"
          className="h-24 w-24 transition-transform duration-500 hover:rotate-180"
        />
        <span className="uppercase text-2xl font-bold text-[var(--color-black)] font-serif tracking-wider">
          The Clothique
        </span>
      </Link>
      {!isAuthPage && (
        <>
          <ul className="flex items-center">
            <li>
              <Link
                to="/"
                className="nav-link text-[var(--color-black)] text-base uppercase font-serif">
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/shop"
                className="nav-link text-[var(--color-black)] text-base uppercase font-serif">
                Shop
              </Link>
            </li>
            <li>
              <Link
                to="/cart"
                className="group nav-link flex items-center gap-1 text-[var(--color-black)] text-base uppercase font-serif hover:text-white transition-colors">
                Cart
                <img
                  src={cartIcon}
                  alt="Cart"
                  className="w-6 h-6 transition group-hover:filter group-hover:brightness-0 group-hover:invert"
                />
                <span className="text-xs mb-4 p-1 rounded-full bg-[var(--color-black)] text-[var(--color-white)] group-hover:invert">
                  30
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="/about-us"
                className="nav-link text-[var(--color-black)] text-base uppercase font-serif">
                about us
              </Link>
            </li>
            <li>
              <Link
                to="/about-us"
                className="get-started text-[var(--color-black)] text-base font-serif hover:text-[var(--color-highlight)]"
                onMouseEnter={() => setShowModal(true)}
                onMouseLeave={() => setShowModal(false)}>
                Get Started
                {showModal && (
                  <div className="px-4 absolute right-30 mt-2 w-40 bg-[var(--color-black)] shadow-md rounded-md z-10">
                    <Link
                      to="/login"
                      className="block px-4 py-2 text-sm text-white border-b hover:text-[var(--color-highlight)]">
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="block px-4 py-2 text-sm  text-white hover:text-[var(--color-highlight)]">
                      Register
                    </Link>
                  </div>
                )}
              </Link>
            </li>
          </ul>
        </>
      )}
    </nav>
  );
};

export default NavBar;
