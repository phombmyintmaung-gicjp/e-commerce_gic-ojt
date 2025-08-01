import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.svg";
import settingIcon from "../../assets/setting_icon.svg";
import notificationIcon from "../../assets/notification_icon.svg";

const AdminNavBar = () => {
  const linkClass = ({ isActive }) =>
    `group nav-link flex items-center gap-1 text-base uppercase font-serif transition-colors ${
      isActive
        ? "text-[var(--color-highlight)]"
        : "text-[var(--color-black)] hover:text-white"
    }`;

  return (
    <nav className="px-6 py-4 flex items-center justify-between border-b bg-[var(--color-white)] z-50 transition-all duration-300 w-full sticky top-0 shadow-md h-24">
      <NavLink to="/" className="flex items-center space-x-2">
        <img
          src={logo}
          alt="Logo"
          className="transition-transform duration-500 h-20 w-20 hover:rotate-180"
        />
        <NavLink to="/admin/dashboard" id="admin-dashboard">
          <span className="uppercase text-2xl font-bold text-[var(--color-black)] font-serif tracking-wider">
            The Clothique
          </span>
        </NavLink>
      </NavLink>

      <p className="text-[32px]">Admin Dashboard</p>

      <ul className="flex items-center gap-4">
        <li>
          <NavLink to="/admin/setting" id="setting-link" className={linkClass}>
            <img
              src={settingIcon}
              alt="Setting"
              className="w-6 h-6 transition group-hover:filter group-hover:brightness-0 group-hover:invert"
            />
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/notifications"
            id="notification-link"
            className={linkClass}>
            <img
              src={notificationIcon}
              alt="Notification"
              className="w-6 h-6 transition group-hover:filter group-hover:brightness-0 group-hover:invert"
            />
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default AdminNavBar;
