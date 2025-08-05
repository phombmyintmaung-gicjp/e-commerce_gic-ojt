import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const UserEdit = () => {
  const location = useLocation();
  const user = location.state?.user;

  if (!user) {
    return <div>User data not found. Redirect or fetch from API...</div>;
  }

  const [formData, setFormData] = useState({
    name: user.username || "",
    email: user.email || "",
    phno: user.phoneNo || "",
    address: user.address || "No Data",
    township: user.township || "",
    region: user.region || "",
    role: user.is_staff ? "staff" : "customer",
  });

  const townships = ["Hlaing", "Kamayut", "Sanchaung", "Tamwe"];
  const regions = ["Yangon", "Mandalay", "Sagaing", "Bago"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedUser = {
      ...formData,
      is_staff: formData.role === "staff",
    };
    console.log("Saving user:", updatedUser);
    // TODO: send updatedUser to backend API here
  };

  return (
    <section className="p-6 max-w-xl rounded text-left">
      <h2 className="text-xl font-bold mb-6">User Info</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium mb-1">Phone Number</label>
          <input
            type="text"
            name="phno"
            value={formData.phno}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        {/* Address */}
        <div>
          <label className="block text-sm font-medium mb-1">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {/* Region */}
        <div>
          <label className="block text-sm font-medium mb-1">Region</label>
          <select
            name="region"
            value={formData.region}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">Select Region</option>
            {regions.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>

        {/* Township */}
        <div>
          <label className="block text-sm font-medium mb-1">Township</label>
          <select
            name="township"
            value={formData.township}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">Select Township</option>
            {townships.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        {/* Role */}
        <div>
          <label className="block text-sm font-medium mb-1">Role</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="staff">Staff</option>
            <option value="customer">Customer</option>
          </select>
        </div>

        {/* Save Button */}
        <div className="pt-4 text-right">
          <button
            type="submit"
            className="bg-[var(--color-green)] text-white px-6 py-2 rounded-xl hover:opacity-80"
          >
            Save
          </button>
        </div>
      </form>
    </section>
  );
};

export default UserEdit;
