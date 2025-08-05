import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EditIcon from "../../../assets/edit_icon.svg";
import DeleteIcon from "../../../assets/delete_icon.svg";
import ConfirmModal from "../../../components/ConfirmModal";
import Pagination from "../../../components/Pagination";
import { getUsers } from "../../../api/apiService";

const UsersList = () => {
  const [search, setSearch] = useState("");
  const [sortType, setSortType] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  console.log(users);

  const openDeleteModal = (user) => {
    setUserToDelete(user);
    setShowDeleteModal(true);
  };
  const closeDeleteModal = () => {
    setUserToDelete(null);
    setShowDeleteModal(false);
  };
  const handleDelete = () => {
    if (userToDelete) {
      // You can call your delete API or logic here
      console.log("Deleting user:", userToDelete);
      // e.g. setUsers(users.filter(u => u.id !== userToDelete.id));
      closeDeleteModal();
    }
  };
  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  const getUsersList = async () => {
    setLoading(true);
    try {
      const response = await getUsers();
      const allUsers = response.data;
      const nonSuperUsers = allUsers.filter((user) => !user.is_superuser); // 👈 exclude superusers
      setUsers(nonSuperUsers);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getUsersList();
  }, []);

  const filteredUsers = users
    .filter((user) =>
      user.username.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sortType === "name") return a.username.localeCompare(b.username);
      if (sortType === "date")
        return new Date(b.lastOrderDate || 0) - new Date(a.lastOrderDate || 0);
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
                <td className="p-3 border">{user.username}</td>
                <td className="p-3 border">{user.email}</td>
                <td className="p-3 border">{user?.last_order_date}</td>
                <td className="p-3 border space-x-2 flex items-center">
                  <Link
                    to={`/admin/users/${user.id}/edit`}
                    state={{ user }}
                    className="text-blue-600 hover:underline">
                    <img
                      src={EditIcon}
                      alt="Edit"
                      className="w-6 h-6 transition hover:opacity-90"
                    />
                  </Link>
                  <button
                    onClick={() => openDeleteModal(user)}
                    className="text-[var(--color-warning)] hover:underline"
                    type="button">
                    <img
                      src={DeleteIcon}
                      alt="Delete"
                      className="w-6 h-6 transition hover:opacity-90"
                    />
                  </button>
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
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={goToPage}
      />
      {/* Confirm Delete Modal */}
      <ConfirmModal
        show={showDeleteModal}
        title="Delete User"
        message={`Are you sure you want to delete user "${userToDelete?.name}"?`}
        onConfirm={handleDelete}
        onCancel={closeDeleteModal}
      />
    </section>
  );
};

export default UsersList;
