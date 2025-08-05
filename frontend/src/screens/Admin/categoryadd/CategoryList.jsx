import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EditIcon from "../../../assets/edit_icon.svg";
import DeleteIcon from "../../../assets/delete_icon.svg";
import { deleteCategory, getCategory } from "../../../api/apiService";
import ConfirmModal from "../../../components/ConfirmModal";

const CategoryList = () => {
  const [search, setSearch] = useState("");
  const [sortType, setSortType] = useState(""); // "name" | "date"
  const [currentPage, setCurrentPage] = useState(1);
  const categoriesPerPage = 5;

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [categories, setCategories] = useState([])

  useEffect(() => {

    getCategories()

  }, [])

  const getCategories = async (e) => {
    setIsLoading(true);
    try {

      const response = await getCategory()
      setCategories(response.data)

    } catch (error) {
      setError("error");
    } finally {
      setIsLoading(false);
    }
  };



  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  const openDeleteModal = (category) => {
    setCategoryToDelete(category);
    setShowDeleteModal(true);
  };
  const closeDeleteModal = () => {
    setCategoryToDelete(null);
    setShowDeleteModal(false);
  };
  const handleDelete = async () => {
    if (categoryToDelete) {

      await deleteCategory(categoryToDelete.id)
      setCategories((prev) =>
        prev.filter((category) => category.id !== categoryToDelete.id)
      );
      closeDeleteModal();
    }
  };


  const filteredCategories = categories
    .filter((category) => category.title.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sortType === "title") return a.title.localeCompare(b.title);
      if (sortType === "date")
        return new Date(b.created_at) - new Date(a.created_at);
      return 0;
    });

  const totalPages = Math.ceil(filteredCategories.length / categoriesPerPage);
  const paginateCategory = filteredCategories.slice(
    (currentPage - 1) * categoriesPerPage,
    currentPage * categoriesPerPage
  );

  return (
    <section className='max-w'>
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by categoryName"
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

        <Link className="bg-[var(--color-green)] text-white px-4 py-2 rounded hover:opacity-90" to="/admin/categories/add">
          Add Category
        </Link>
      </div>

      {/* User Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 text-sm text-left">
          <thead className="bg-[var(--color-section)]">
            <tr>
              <th className="p-3 border">No</th>
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Creation Date</th>
              <th className="p-3 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginateCategory.map((category, index) => (
              <tr
                key={category.id}
                className="odd:bg-[var(--color-white)] even:bg-[var(--color-section)] hover:opacity-60">
                <td className="p-3 border">
                  {(currentPage - 1) * categoriesPerPage + index + 1}
                </td>
                <td className="p-3 border">{category.title}</td>
                <td className="p-3 border">{category.created_at.split("T")[0]}</td>
                <td className="p-3 border space-x-2 flex items-center">
                  <Link
                    to={`/admin/categories/${category.id}/edit`}
                    className="text-blue-600 hover:underline"
                    state={category}
                  >
                    <img
                      src={EditIcon}
                      alt="Edit"
                      className="w-6 h-6 transition hover:opacity-90"
                    />
                  </Link>
                  <Link className="text-[var(--color-warning)] hover:underline" onClick={() => openDeleteModal(category)}>
                    <img
                      src={DeleteIcon}
                      alt="Delete"
                      className="w-6 h-6 transition hover:opacity-90"
                    />
                  </Link>
                </td>
              </tr>
            ))}
            {paginateCategory.length === 0 && (
              <tr>
                <td colSpan="5" className="p-3 text-center text-gray-500">
                  No Category found.
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
            className={`px-3 py-1 rounded ${num === currentPage
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
      <ConfirmModal
        show={showDeleteModal}
        title="Confirm Delete"
        message="Are you sure you want to delete?"
        onConfirm={handleDelete}
        onCancel={closeDeleteModal}
      />
    </section>
  );
};

export default CategoryList
