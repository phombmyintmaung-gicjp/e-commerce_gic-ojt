import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const ProfileSideBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user auth/session logic here
    console.log("Logging out...");
    navigate("/login");
  };

  const linkClass = ({ isActive }) =>
    `block px-4 py-2 rounded-md font-medium ${
      isActive ? "bg-[var(--color-section)] text-[var(--color-black)]" : "text-gray-700 hover:bg-gray-100"
    }`;
  return (
    <aside className="w-64 p-6 bg-white shadow-md flex flex-col ">
      <div>
        <h2 className="text-xl font-bold mb-2">My Profile</h2>
        <p className="mb-6">User Name</p>
        <nav className="space-y-2 text-left border-b border-[var(--color-black)] pb-6 mb-2">
          <NavLink to="orders" className={linkClass}>
            My Orders
          </NavLink>
          <NavLink to="address" className={linkClass}>
            My Address
          </NavLink>
          <NavLink to="account" className={linkClass}>
            Username & Password
          </NavLink>
        </nav>
      </div>
      <div>
        <button
          onClick={handleLogout}
          className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100 rounded-md">
          Logout
        </button>
      </div>
    </aside>
  );
};

export default ProfileSideBar;
