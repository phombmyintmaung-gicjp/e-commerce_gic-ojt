import React, { useState } from "react";
import { Link } from "react-router-dom";
import registerTitleIcon from "../../../assets/register_title_icon.svg";
import userIcon from "../../../assets/login_name_icon.svg";
import registerEmailIcon from "../../../assets/register_email_icon.svg";
import passwordIcon from "../../../assets/login_password_icon.svg";
import cpasswordIcon from "../../../assets/register_cpassword_icon.svg";
import { createUser } from "../../../api/apiService";

const Register = () => {

  const [loading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [username, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      const authData = {
        username,
        email,
        password,
        password2
      };
      const response = await createUser(authData);
      console.log(response);
      alert('Account Created Successfully! Now redirecting to login')
      window.location.href = "/login";
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
            src={registerTitleIcon}
            alt="title icon"
            className="w-10 h-10 mr-2"
          />
          <h1 className="text-3xl">Register</h1>
        </div>
        {error && (
          <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
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
          {/* email */}
          <div className="relative mb-4">
            <img
              src={registerEmailIcon}
              alt="user icon"
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 opacity-60"
            />
            <input
              type="text"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)} value={email}
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
          {/* Confirm Password */}
          <div className="relative mb-6 ">
            <img
              src={cpasswordIcon}
              alt="password icon"
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 opacity-60"
            />
            <input
              type="password"
              placeholder="Confirm Password"
              onChange={(e) => setPassword2(e.target.value)} value={password2}
              className="pl-12 pr-4 py-2 w-full border border-[var(--color-highlight)] rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit" disabled={loading}
            className="bg-[var(--color-black)] text-[var(--color-white)] w-full py-2 rounded-xl">
            {!loading ? 'Create Account' : 'Creating Account'}
          </button>

        </form>
        <p className="text-base my-5">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
        <p className="text-base my-5">
          By signing up, you agreed to become gay and accept<br />
          <span className="text-blue-500">User agreements.</span>
        </p>
      </div>
    </div>
  );
};

export default Register;
