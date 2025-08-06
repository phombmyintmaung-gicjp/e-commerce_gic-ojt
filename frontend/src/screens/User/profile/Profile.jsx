import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import ProfileSideBar from "../../../components/UserProfile/ProfileSideBar";

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div className="flex min-h-full bg-gray-100">
      {/* Sidebar */}
      <ProfileSideBar />

      {/* Main Content */}
      <main className="flex-1 p-8">
        <Outlet  context={{user}}/>
      </main>
    </div>
  );
};

export default Profile;
