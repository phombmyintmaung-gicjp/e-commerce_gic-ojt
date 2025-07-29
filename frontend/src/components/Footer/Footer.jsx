import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg";
import fbIcon from "../../assets/facebook.svg";
import xIcon from "../../assets/x.svg";
import tiktokIcon from "../../assets/tiktok.svg";
import ytIcon from "../../assets/youtube.svg";

const Footer = () => {
  return (
    <footer className="bg-[var(--color-black)] text-white p-10 mt-10">
      <div className="flex flex-col md:flex-row justify-between items-start gap-10">
        <div className="flex items-center space-x-4">
          <img src={logo} alt="Logo" className="h-16 w-16 border p-1 " />
          <span className="uppercase text-2xl font-serif tracking-wider">
            The Clothique
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 text-left mr-32">
          {/* Categories */}
          <div>
            <span className="font-bold mb-2 text-2xl">Categories</span>
            <ul className="space-y-2 py-4">
              <li>
                <Link
                  to="#"
                  className="text-xl hover:text-[var(--color-highlight)]">
                  Man
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-xl hover:text-[var(--color-highlight)]">
                  Woman
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-xl hover:text-[var(--color-highlight)]">
                  Arrivals
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-xl hover:text-[var(--color-highlight)]">
                  Sale
                </Link>
              </li>
            </ul>
          </div>
          {/* Informations */}
          <div>
            <span className="font-bold mb-2 text-2xl">Informations</span>
            <ul className="space-y-2 py-4">
              <li>
                <Link
                  to="#"
                  className="text-xl hover:text-[var(--color-highlight)]">
                  About us
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-xl hover:text-[var(--color-highlight)]">
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-xl hover:text-[var(--color-highlight)]">
                  Shipping
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-xl hover:text-[var(--color-highlight)]">
                  Returns
                </Link>
              </li>
            </ul>
          </div>
          {/* Links with Icons */}
          <div>
            <span className="font-bold mb-2 text-2xl">Quick Links</span>
            <p className="mb-2">Follow us on:</p>
            <ul className="space-y-3">
              <li>
                <Link
                  to="#"
                  className="grid grid-cols-[1fr_auto] items-center text-xl hover:text-[var(--color-highlight)]">
                  <span>Facebook</span>
                  <img src={fbIcon} alt="Facebook" className="w-5 h-5" />
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="grid grid-cols-[1fr_auto] items-center text-xl hover:text-[var(--color-highlight)]">
                  <span>X</span>
                  <img src={xIcon} alt="X" className="w-5 h-5" />
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="grid grid-cols-[1fr_auto] items-center text-xl hover:text-[var(--color-highlight)]">
                  <span>Tik Tok</span>
                  <img src={tiktokIcon} alt="TikTok" className="w-5 h-5" />
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="grid grid-cols-[1fr_auto] items-center text-xl hover:text-[var(--color-highlight)]">
                  <span>You Tube</span>
                  <img src={ytIcon} alt="YouTube" className="w-5 h-5" />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
