import React, { useEffect, useState } from "react";
import {
  getRegionsList,
  getTownshipsList,
  getUsers,
} from "../../api/apiService";
import { useOutletContext } from "react-router-dom";

const MyAddress = () => {
  const [street, setStreet] = useState("");
  const [ward, setWard] = useState("");
  const [township, setTownship] = useState("");
  const [region, setRegion] = useState("");
  const [regionsList, setRegionsList] = useState([]);
  const [townshipsList, setTownshipsList] = useState([]);
  const { user } = useOutletContext();

  useEffect(() => {
    if (user) {
      getUserAddress();
    }
  }, [user]);

  useEffect(() => {
    getRegions();
    getTownship();
  }, []);

  const getUserAddress = async () => {
    try {
      const response = await getUsers();
      setStreet(response.data?.address ?? "No Data");
      setWard(response.data?.township ?? "No Data");
      setTownship(response.data?.township ?? "No Township is selected:");
      setRegion(response.data?.region ?? "No Regions is selected:");
    } catch (error) {
      console.error("Failed to fetch user address:", error);
    }
  };

  const getRegions = async () => {
    try {
      const response = await getRegionsList();
      const sortedRegions = response.data.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      setRegionsList(sortedRegions);
    } catch (error) {
      console.error("Failed to fetch regions:", error);
    }
  };

  const getTownship = async () => {
    try {
      const response = await getTownshipsList();
      setTownshipsList(response.data);
    } catch (error) {
      console.error("Failed to fetch townships:", error);
    }
  };

  const handleSave = () => {
    console.log({ street, ward, township, region });
  };

  const handleCancel = () => {
    setStreet("");
    setWard("");
    setTownship("");
    setRegion("");
  };

  // Filter townships for selected region
  const filteredTownships = region
    ? townshipsList
        .filter((t) => t.region === Number(region))
        .sort((a, b) => a.name.localeCompare(b.name))
    : [];

  return (
    <div className="max-w-md p-6 border bg-[var(--color-white)] text-left">
      <h2 className="text-xl font-semibold mb-4">My Address</h2>

      <div className="mb-4">
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

      <div className="mb-6">
        <label className="block mb-1">Region</label>
        <select
          value={region}
          onChange={(e) => {
            setRegion(e.target.value);
            setTownship(""); // Reset township on region change
          }}
          className="w-full border px-3 py-2 rounded">
          <option value="">{region} Select Region</option>
          {regionsList.map((r) => (
            <option key={r.id} value={r.id}>
              {r.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-1">Township</label>
        <select
          value={township}
          onChange={(e) => setTownship(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          disabled={!region}>
          <option value="">{township} Select Township</option>
          {filteredTownships.map((t) => (
            <option key={t.id} value={t.name}>
              {t.name}
            </option>
          ))}
        </select>
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

export default MyAddress;
