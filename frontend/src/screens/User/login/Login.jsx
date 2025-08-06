import React, { useState } from "react";
import { Link } from "react-router-dom";
import loginTitleIcon from "../../../assets/login_title_icon.svg";
import userIcon from "../../../assets/login_name_icon.svg";
import passwordIcon from "../../../assets/login_password_icon.svg";
import { loginUser, retrieveMe } from "../../../api/apiService";

const Login = () => {
  const [loading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      const authData = {
        username,
        password
      };
      const response = await loginUser(authData);
      const { access, refresh } = response.data;
      localStorage.setItem("access_token", access);
      localStorage.setItem("refresh_token", refresh);
      const user = await retrieveMe();
      localStorage.setItem("user", JSON.stringify(user.data));
      if (user.data.is_staff || user.data.is_superuser) {
        window.location.href = "/admin/dashboard";
      } else {
        window.location.href = "/";
      }
    } catch (error) {
      console.error(error);
      const detail =
        error?.response?.data?.detail || error?.message || "Login failed";
      setError(detail);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className=" mt-16 flex justify-center items-center py-10">
      <div className="w-5/12 py-8 px-12 rounded-lg shadow-md text-center bg-[var(--color-section)] border border-[var(--color-highlight)]">
        <div className="flex items-center justify-center my-2.5">
          <img
            src={loginTitleIcon}
            alt="title icon"
            className="w-10 h-10 mr-2"
          />
          <h1 className="text-3xl">Login</h1>
        </div>
        {error && (
          <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}
        <form method="post" onSubmit={handleSubmit}>
          {/* Username */}
          <div className="relative mb-4">
            <img
              src={userIcon}
              alt="user icon"
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 opacity-60"
            />
            <input
              type="text"
              placeholder="Username"
              onChange={(e) => setUserName(e.target.value)} value={username}
              className="pl-12 pr-4 py-2 w-full border border-[var(--color-highlight)] rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div className="relative mb-6 ">
            <img
              src={passwordIcon}
              alt="password icon"
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 opacity-60"
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)} value={password}
              className="pl-12 pr-4 py-2 w-full border border-[var(--color-highlight)] rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="bg-[var(--color-black)] text-[var(--color-white)] w-full py-2 rounded-xl">
            Login
          </button>
        </form>
        <p className="text-base my-5">
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
