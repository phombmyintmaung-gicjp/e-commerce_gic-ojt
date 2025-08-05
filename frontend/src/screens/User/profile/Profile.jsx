import React from "react";
import { Outlet } from "react-router-dom";
import ProfileSideBar from "../../../components/UserProfile/ProfileSideBar";

const Profile = () => {

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <ProfileSideBar />

      {/* Main Content */}
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default Profile;
