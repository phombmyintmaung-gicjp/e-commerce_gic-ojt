import React, { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

import HomeIcon from "../../assets/home_icon.svg";
import UserIcon from "../../assets/user_icon.svg";
import CategoryIcon from "../../assets/cat_icon.svg";
import ProductIcon from "../../assets/product_icon.svg";
import InventoryIcon from "../../assets/inventory_icon.svg";
import OrderIcon from "../../assets/order_icon.svg";
import LogoutIcon from "../../assets/logout_icon.svg";
import UserListIcon from "../../assets/user_list_icon.svg";
import AddCategoryIcon from "../../assets/add_category_icon.svg";
import CategoriesListIcon from "../../assets/list_icon.svg";
import AddProductIcon from "../../assets/add_product_icon.svg";
import AddVariantIcon from "../../assets/add_product_variants_icon.svg";
import ProductsListIcon from "../../assets/list_icon.svg";
import AddInventoryIcon from "../../assets/add_inventory_icon.svg";
import InventoryListIcon from "../../assets/list_icon.svg";
import OrdersListIcon from "../../assets/list_icon.svg";
import ConfirmModal from "../ConfirmModal";

const menuItems = [
  {
    icon: UserIcon,
    label: "User Management",
    submenu: [{ label: "User List", icon: UserListIcon, path: "/admin/users" }],
  },
  {
    icon: CategoryIcon,
    label: "Category Management",
    submenu: [
      {
        label: "Add Category",
        icon: AddCategoryIcon,
        path: "/admin/categories/add",
      },
      {
        label: "Categories List",
        icon: CategoriesListIcon,
        path: "/admin/categories",
      },
    ],
  },
  {
    icon: ProductIcon,
    label: "Product Management",
    submenu: [
      {
        label: "Add Product",
        icon: AddProductIcon,
        path: "/admin/products/add",
      },
      {
        label: "Add Product's Variants",
        icon: AddVariantIcon,
        path: "/admin/products/variants/add",
      },
      {
        label: "Products List",
        icon: ProductsListIcon,
        path: "/admin/products",
      },
    ],
  },
  {
    icon: InventoryIcon,
    label: "Inventory Management",
    submenu: [
      {
        label: "Add Items to Inventory",
        icon: AddInventoryIcon,
        path: "/admin/inventory/add",
      },
      {
        label: "Items in Inventory",
        icon: InventoryListIcon,
        path: "/admin/inventory",
      },
    ],
  },
  {
    icon: OrderIcon,
    label: "Order Management",
    submenu: [
      { label: "Orders List", icon: OrdersListIcon, path: "/admin/orders" },
    ],
  },
];

const AdminSideBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const toggleMenu = (label) => {
    setExpanded(true);
    setActiveMenu((prev) => (prev === label ? null : label));
  };

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const handleLogoutConfirm = () => {
    setShowLogoutModal(false);
    // TODO: Add actual logout logic here, e.g., clear tokens, auth state
    console.log("Logged out!");
    // navigate("/login"); // redirect to login page after logout
  };

  const handleLogoutCancel = () => {
    setShowLogoutModal(false);
  };

  return (
    <>
      <div
        className={`fixed top-24 left-0 z-40 bg-[var(--color-section)] transition-all duration-300 border-r border-[var(--color-light-gray)] ${
          expanded ? "w-64" : "w-16"
        } h-[calc(100vh-6rem)] overflow-y-auto`}>
        <div className="flex flex-col h-full">
          <NavLink
            to="/admin/dashboard"
            title={!expanded ? "Dashboard" : ""}
            onClick={() => setExpanded(!expanded)}
            className="flex items-center w-full px-4 py-3 hover:opacity-90 text-[var(--color-black)] bg-[var(--color-section)]">
            <img src={HomeIcon} alt="Home" className="w-6 h-6" />
            {expanded && <span className="ml-4">Dashboard</span>}
          </NavLink>
          <div className="flex-1">
            {menuItems.map((item, idx) => {
              const isAnySubmenuActive = item.submenu.some(
                (sub) => location.pathname === sub.path
              );

              return (
                <div key={idx}>
                  <button
                    title={!expanded ? item.label : ""}
                    onClick={() => toggleMenu(item.label)}
                    className={`flex items-center w-full px-4 py-4 hover:opacity-90 hover:bg-[var(--color-highlight)] text-[var(--color-black)] ${
                      isAnySubmenuActive
                        ? "bg-[var(--color-highlight)] font-semibold"
                        : "bg-[var(--color-section)]"
                    }`}>
                    <img src={item.icon} alt="" className="w-6 h-6" />
                    {expanded && <span className="ml-4">{item.label}</span>}
                  </button>

                  {expanded && activeMenu === item.label && (
                    <ul className="ml-12 mt-1 space-y-2 text-sm text-[var(--color-black)]">
                      {item.submenu.map((sub, subIdx) => (
                        <li key={subIdx}>
                          <NavLink
                            to={sub.path}
                            className={`flex items-center gap-2 p-3 rounded hover:bg-[var(--color-highlight)] ${
                              location.pathname === sub.path
                                ? "bg-[var(--color-highlight)] font-semibold"
                                : ""
                            }`}>
                            <img src={sub.icon} alt="" className="w-4 h-4" />
                            <span>{sub.label}</span>
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>

          <button
            title={!expanded ? "Log Out" : ""}
            onClick={handleLogoutClick}
            className="flex items-center w-full px-4 py-3 hover:opacity-90 text-[var(--color-black)] bg-[var(--color-section)]">
            <img src={LogoutIcon} alt="Logout" className="w-6 h-6" />
            {expanded && <span className="ml-4">Logout</span>}
          </button>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      <ConfirmModal
        show={showLogoutModal}
        title="Confirm Logout"
        message="Are you sure you want to logout?"
        onConfirm={handleLogoutConfirm}
        onCancel={handleLogoutCancel}
      />
    </>
  );
};

export default AdminSideBar;
