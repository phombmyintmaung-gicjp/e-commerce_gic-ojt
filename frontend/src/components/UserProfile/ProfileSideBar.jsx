import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import ConfirmModal from "../ConfirmModal";

const ProfileSideBar = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const linkClass = ({ isActive }) =>
    `block px-4 py-2 rounded-md font-medium ${
      isActive
        ? "bg-[var(--color-section)] text-[var(--color-black)]"
        : "text-gray-700 hover:bg-gray-100"
    }`;

  return (
    <aside className="w-64 p-6 bg-white shadow-md flex flex-col">
      <div>
        <h2 className="text-xl font-bold mb-2">My Profile</h2>
        <p className="mb-6">{user?.username}</p>
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
          onClick={() => setShowModal(true)}
          className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100 rounded-md">
          Logout
        </button>
      </div>

      {/* Confirm Modal */}
      <ConfirmModal
        show={showModal}
        title="Confirm Logout"
        message="Are you sure you want to log out?"
        onConfirm={handleLogout}
        onCancel={() => setShowModal(false)}
      />
    </aside>
  );
};

export default ProfileSideBar;
