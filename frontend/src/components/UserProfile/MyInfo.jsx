import React, { useState } from "react";

const MyInfo = () => {
  const [name, setName] = useState("username");
  const [email, setEmail] = useState("email@gic.com");
  const [password, setPassword] = useState("abcdefg");
  const handleSave = () => {
    console.log({ name, email, password });
  };

  const handleCancel = () => {
    setStreet("");
    setWard("");
    setTownship("");
    setRegion("");
  };
  return (
    <div className="max-w-md p-6 border bg-[var(--color-white)] text-left">
      <h2 className="text-xl font-semibold mb-4">My Profile</h2>

      <div className="mb-4">
        <label className="block mb-1">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <div className="mb-6">
        <label className="block mb-1">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <div className="flex justify-end space-x-4">
        <button
          onClick={handleCancel}
          className="px-4 py-2 border border-[var(--color-warning)] rounded-xl text-[var(--color-black)] hover:opacity-90">
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="px-4 py-2 border rounded-xl bg-[var(--color-black)] text-[var(--color-white)] hover:opacity-90">
          Save
        </button>
      </div>
    </div>
  );
};

export default MyInfo;
