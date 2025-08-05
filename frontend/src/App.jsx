import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import NavBar from "./components/NavBar/NavBar";
import ScrollToTop from "./components/ScrollToTop";
import Login from "./screens/User/login/Login";
import Home from "./screens/User/home/Home";
import Register from "./screens/User/register/Register";
import Footer from "./components/Footer/Footer";
import Shop from "./screens/User/shop/Shop";
import AboutUs from "./screens/User/AboutUs/AboutUs";
import Cart from "./screens/User/cart/Cart";
import ProductDetails from "./screens/User/productdetails/ProductDetails";
import AdminDashboard from "./screens/Admin/admindashboard/AdminDashboard";
import AdminNavBar from "./components/NavBar/AdminNavBar";
import AdminSideBar from "./components/AdminSideBar/AdminSideBar";
import AdminMainContent from "./screens/Admin/AdminMainContent";
import UsersList from "./screens/Admin/userslist/UsersList";
import UserEdit from "./screens/Admin/userslist/UserEdit";
import CategoryAdd from "./screens/Admin/categoryadd/CategoryAdd";
import CategoryList from "./screens/Admin/categoryadd/CategoryList";

import ProductAdd from "./screens/Admin/product/productAdd";
import OrdersList from "./screens/Admin/orderlist/OrdersList";
import OrderEdit from "./screens/Admin/orderlist/OrderEdit";
import ProductVariantAdd from "./screens/Admin/product/ProductVariantAdd";
import ProductList from "./screens/Admin/product/ProductList";
import InventoryEdit from "./screens/Admin/Inventory/InventoryEdit";
import InventoryList from "./screens/Admin/Inventory/InventoryList";
import ProtectedAdminRoute from "./utils/auth";



function App() {
  const location = useLocation();
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";
  const isAdminPage = location.pathname.startsWith("/admin");
  useEffect(() => {
    AOS.init({ duration: 1500 });
  }, []);
  return (
    <>
      {isAdminPage ? <AdminNavBar /> : <NavBar isAuthPage={isAuthPage} />}
      {isAdminPage && <AdminSideBar />}
      <ScrollToTop isAuthPage={isAuthPage} />
      <Routes>
        {/* admin routes */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedAdminRoute>
              <AdminMainContent>
                <AdminDashboard />
              </AdminMainContent>
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedAdminRoute>
              <AdminMainContent>
                <UsersList />
              </AdminMainContent>
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin/categories/add"
          element={
            <AdminMainContent>
              <CategoryAdd />
            </AdminMainContent>
          }
        />
        <Route
          path="/admin/categories"
          element={
            <ProtectedAdminRoute>
              <AdminMainContent>
                <CategoryList />
              </AdminMainContent>
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin/products/add"
          element={
            <ProtectedAdminRoute>
              <AdminMainContent>
                <ProductAdd />
              </AdminMainContent>
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin/products"
          element={
            <ProtectedAdminRoute>
              <AdminMainContent>
                <ProductList />
              </AdminMainContent>
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin/products/variants/add"
          element={
            <ProtectedAdminRoute>
              <AdminMainContent>
                <ProductVariantAdd />
              </AdminMainContent>
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="admin/users/:id/edit"
          element={
            <ProtectedAdminRoute>
              <AdminMainContent>
                <UserEdit />
              </AdminMainContent>
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="admin/orders"
          element={
            <ProtectedAdminRoute>
              <AdminMainContent>
                <OrdersList />
              </AdminMainContent>
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="admin/orders/:id/edit"
          element={
            <ProtectedAdminRoute>
              <AdminMainContent>
                <OrderEdit />
              </AdminMainContent>
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="admin/inventory"
          element={
            <ProtectedAdminRoute>
              <AdminMainContent>
                <InventoryList />
              </AdminMainContent>
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="admin/inventory/:id/edit"
          element={
            <ProtectedAdminRoute>
              <AdminMainContent>
                <InventoryEdit />
              </AdminMainContent>
            </ProtectedAdminRoute>
          }
        />

        {/* user routes */}
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/cart" element={<Cart />} />
        <Route
          path="/:category/products/:id/details"
          element={<ProductDetails />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about-us" element={<AboutUs />} />
      </Routes>
      {!isAuthPage && !isAdminPage && <Footer />}
    </>
  );
}

export default App;
