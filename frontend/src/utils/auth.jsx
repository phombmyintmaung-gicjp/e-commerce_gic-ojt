import { refreshToken } from "../api/apiService";

export const isLoggedIn = () => {
    return !!localStorage.getItem("access_token");
};

export async function tryRefreshToken() {
    const refresh = localStorage.getItem("refresh_token");
    if (!refresh) return false;

    try {
        const response = await refreshToken({ refresh });
        localStorage.setItem("access_token", response?.data.access);
        return true;
    } catch (error) {
        console.error("Refresh token failed", error);
        return false;
    }
}

import { Navigate } from "react-router-dom";

const ProtectedAdminRoute = ({ children }) => {
    const user = JSON.parse(localStorage.getItem("user"));
    // 🔍 Debug logs here
    console.log("🔒 ProtectedAdminRoute - User:", user);
    console.log("🔒 Is Admin:", user?.is_staff);

    if (!user) {
        console.warn("🔒 Not logged in. Redirecting to login.");
        return <Navigate to="/login" replace />;
    }

    if (!user.is_staff) {
        console.warn("🔒 User is not admin. Redirecting to home.");
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedAdminRoute;
