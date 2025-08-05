import React, { useState } from "react";

const MyAddress = () => {
  const [street, setStreet] = useState("");
  const [ward, setWard] = useState("");
  const [township, setTownship] = useState("");
  const [region, setRegion] = useState("");

  const handleSave = () => {
    console.log({ street, ward, township, region });
    // handle save logic here
  };

  const handleCancel = () => {
    setStreet("");
    setWard("");
    setTownship("");
    setRegion("");
  };

  return (
    <div className="max-w-md p-6 border bg-[var(--color-white)] text-left">
      <h2 className="text-xl font-semibold mb-4">My Address</h2>

      <div className="mb-4 ">
        <label className="block mb-1">Street</label>
        <input
          type="text"
          value={street}
          onChange={(e) => setStreet(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1">Quarter / Ward</label>
        <input
          type="text"
          value={ward}
          onChange={(e) => setWard(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1">Township</label>
        <select
          value={township}
          onChange={(e) => setTownship(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        >
          <option value="">Select Township</option>
          <option value="kamayut">Kamayut</option>
          <option value="hledan">Hledan</option>
          <option value="dagon">Dagon</option>
          {/* Add more options as needed */}
        </select>
      </div>

      <div className="mb-6">
        <label className="block mb-1">Region</label>
        <select
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        >
          <option value="">Select Region</option>
          <option value="yangon">Yangon</option>
          <option value="mandalay">Mandalay</option>
          <option value="naypyidaw">Nay Pyi Taw</option>
          {/* Add more regions as needed */}
        </select>
      </div>

      <div className="flex justify-end space-x-4">
        <button
          onClick={handleCancel}
          className="px-4 py-2 border border-[var(--color-warning)] rounded-xl text-[var(--color-black)] hover:opacity-90"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="px-4 py-2 border rounded-xl bg-[var(--color-black)] text-[var(--color-white)] hover:opacity-90"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default MyAddress;
