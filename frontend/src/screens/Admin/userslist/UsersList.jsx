import React, { useState } from "react";
import { Link } from "react-router-dom";
import EditIcon from "../../../assets/edit_icon.svg";
import DeleteIcon from "../../../assets/delete_icon.svg";

const mockUsers = [
  {
    id: 1,
    name: "Alice",
    email: "alice@example.com",
    lastOrderDate: "2025-07-29",
  },
  { id: 2, name: "Bob", email: "bob@example.com", lastOrderDate: "2025-07-20" },
  {
    id: 3,
    name: "Charlie",
    email: "charlie@example.com",
    lastOrderDate: "2025-07-25",
  },
  {
    id: 4,
    name: "David",
    email: "david@example.com",
    lastOrderDate: "2025-07-18",
  },
  { id: 5, name: "Eva", email: "eva@example.com", lastOrderDate: "2025-07-28" },
  {
    id: 6,
    name: "Frank",
    email: "frank@example.com",
    lastOrderDate: "2025-07-27",
  },
  {
    id: 7,
    name: "Grace",
    email: "grace@example.com",
    lastOrderDate: "2025-07-30",
  },
];

const UsersList = () => {
  const [search, setSearch] = useState("");
  const [sortType, setSortType] = useState(""); // "name" | "date"
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const filteredUsers = mockUsers
    .filter((user) => user.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sortType === "name") return a.name.localeCompare(b.name);
      if (sortType === "date")
        return new Date(b.lastOrderDate) - new Date(a.lastOrderDate);
      return 0;
    });

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  return (
    <section>
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by username"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-3 py-2 rounded w-64"
        />
        <select
          value={sortType}
          onChange={(e) => setSortType(e.target.value)}
          className="border px-3 py-2 rounded">
          <option value="">Sort By</option>
          <option value="name">Name (A-Z)</option>
          <option value="date">Order Date (Latest)</option>
        </select>
        <button className="bg-[var(--color-green)] text-white px-4 py-2 rounded hover:bg-blue-700">
          Add User
        </button>
      </div>

      {/* User Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 text-sm text-left">
          <thead className="bg-[var(--color-section)]">
            <tr>
              <th className="p-3 border">No</th>
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Email</th>
              <th className="p-3 border">Last Order Date</th>
              <th className="p-3 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.map((user, index) => (
              <tr
                key={user.id}
                className="odd:bg-[var(--color-white)] even:bg-[var(--color-section)] hover:opacity-60">
                <td className="p-3 border">
                  {(currentPage - 1) * usersPerPage + index + 1}
                </td>
                <td className="p-3 border">{user.name}</td>
                <td className="p-3 border">{user.email}</td>
                <td className="p-3 border">{user.lastOrderDate}</td>
                <td className="p-3 border space-x-2 flex items-center">
                  <Link
                    to={`/admin/users/${user.id}/edit`}
                    className="text-blue-600 hover:underline">
                    <img
                      src={EditIcon}
                      alt="Edit"
                      className="w-6 h-6 transition hover:opacity-90"
                    />
                  </Link>
                  <Link className="text-[var(--color-warning)] hover:underline">
                    <img
                      src={DeleteIcon}
                      alt="Delete"
                      className="w-6 h-6 transition hover:opacity-90"
                    />
                  </Link>
                </td>
              </tr>
            ))}
            {paginatedUsers.length === 0 && (
              <tr>
                <td colSpan="5" className="p-3 text-center text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8 gap-2 text-[14px]">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-2">
          {"<"}
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
          <button
            key={num}
            onClick={() => goToPage(num)}
            className={`px-3 py-1 rounded ${
              num === currentPage
                ? "bg-[var(--color-highlight)] text-[var(--color-black)]"
                : "text-[var(--color-black)]"
            }`}>
            {num}
          </button>
        ))}
        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-2">
          {">"}
        </button>
      </div>
    </section>
  );
};

export default UsersList;
