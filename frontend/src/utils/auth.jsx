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

    if (!user) {
        return <Navigate to="/login" replace />;
    }
    if (!user.is_staff) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedAdminRoute;
