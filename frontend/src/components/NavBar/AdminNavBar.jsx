import React, { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.svg";
import settingIcon from "../../assets/setting_icon.svg";
import notificationIcon from "../../assets/notification_icon.svg";

const AdminNavBar = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      text: "OrderId 100345 is made. Please check and deliver.",
      read: false,
    },
    {
      id: 2,
      text: "Adidas shoes is nearly out of stock. Please consider restock.",
      read: false,
    },
    {
      id: 3,
      text: "OrderId 100344 is made. Please check and deliver.",
      read: false,
    },
    {
      id: 4,
      text: "Category : Men Wear is just created.",
      read: true,
    },
    {
      id: 5,
      text: "Category : Men Wear is just created.",
      read: true,
    },
    {
      id: 6,
      text: "Category : Men Wear is just created.",
      read: true,
    },
    {
      id: 7,
      text: "Category : Men Wear is just created.",
      read: true,
    },
    {
      id: 8,
      text: "Category : Men Wear is just created.",
      read: true,
    },
    {
      id: 9,
      text: "Category : Men Wear is just created.",
      read: true,
    },
  ]);
  const dropdownRef = useRef(null);
  const toggleNotifications = () => {
    setShowNotifications((prev) => !prev);
  };
  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };
  // Close modal if clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const linkClass = ({ isActive }) =>
    `group nav-link flex items-center gap-1 text-base uppercase font-serif transition-colors ${
      isActive
        ? "text-[var(--color-highlight)]"
        : "text-[var(--color-black)] hover:text-white"
    }`;

  return (
    <nav className="px-6 py-4 flex items-center justify-between border-b bg-[var(--color-white)] z-50 transition-all duration-300 w-full sticky top-0 h-24">
      <NavLink
        to="/admin/dashboard"
        className="flex items-center space-x-2"
        id="admin-dashboard">
        <img
          src={logo}
          alt="Logo"
          className="transition-transform duration-500 h-20 w-20 hover:rotate-180"
        />
        <span className="uppercase text-2xl font-bold text-[var(--color-black)] font-serif tracking-wider">
          The Clothique
        </span>
      </NavLink>
      <p className="text-[32px]">Admin Dashboard</p>
      <ul className="flex items-center gap-4">
        <li ref={dropdownRef} className="relative">
          <button
            onClick={toggleNotifications}
            className="group nav-link flex items-center">
            <img
              src={notificationIcon}
              alt="Notification"
              className="w-6 h-6 transition group-hover:filter group-hover:brightness-0 group-hover:invert"
            />
            {!notifications.every((n) => n.read) && (
              <span className="absolute top-0 right-0 bg-red-500 w-2 h-2 rounded-full" />
            )}
          </button>

          {/* Notification Modal */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-[600px] bg-white border shadow-lg rounded-md z-50">
              <div className="p-4 border-b font-semibold text-lg flex justify-between items-center bg-[var(--color-white)]">
                <span>Notifications</span>
                <button
                  onClick={markAllAsRead}
                  className="text-sm text-blue-600 hover:underline bg-[var(--color-white)]">
                  Mark all as read
                </button>
              </div>
              <ul className="max-h-64 overflow-y-auto">
                {notifications.map((n) => (
                  <li
                    key={n.id}
                    className={`px-4 py-3 border-b text-sm ${
                      n.read ? "bg-white" : "bg-[var(--color-section)]"
                    }`}>
                    {n.text}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </li>
        <li>
          <NavLink to="/admin/setting" id="setting-link" className={linkClass}>
            <img
              src={settingIcon}
              alt="Setting"
              className="w-6 h-6 transition group-hover:filter group-hover:brightness-0 group-hover:invert"
            />
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default AdminNavBar;
