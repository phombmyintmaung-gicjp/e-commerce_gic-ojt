import React, { useState } from "react";
import AddIcon from "../../../assets/add_icon.svg";
import EditIcon from "../../../assets/edit_icon.svg";
import DeleteIcon from "../../../assets/delete_icon.svg";
import { Link } from "react-router-dom";
import Pagination from "../../../components/Pagination";
const mockInventoryListItems = [
  {
    id: 1,
    name: "Levi T-Shirt",
    category: "Men Wears",
    price: 10000,
    quantity: 2,
    lowStockLimit: 3,
  },
  {
    id: 2,
    name: "Nike Running Shoes",
    category: "Footwear",
    price: 45000,
    quantity: 3,
    lowStockLimit: 5,
  },
  {
    id: 3,
    name: "Uniqlo Hoodie",
    category: "Men Wears",
    price: 25000,
    quantity: 12,
    lowStockLimit: 5,
  },
  {
    id: 4,
    name: "Adidas Backpack",
    category: "Accessories",
    price: 30000,
    quantity: 8,
    lowStockLimit: 5,
  },
  {
    id: 5,
    name: "Zara Skirt",
    category: "Women Wears",
    price: 22000,
    quantity: 1,
    lowStockLimit: 5,
  },
  {
    id: 6,
    name: "Casio Watch",
    category: "Accessories",
    price: 50000,
    quantity: 6,
    lowStockLimit: 5,
  },
  {
    id: 7,
    name: "Puma Socks Pack (3 pcs)",
    category: "Footwear",
    price: 8000,
    quantity: 50,
    lowStockLimit: 5,
  },
  {
    id: 8,
    name: "GU Blouse",
    category: "Women Wears",
    price: 18000,
    quantity: 2,
    lowStockLimit: 5,
  },
];

const InventoryList = () => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortType, setSortType] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [lowStockOnly, setLowStockOnly] = useState(false);
  const itemsPerPage = 5;
  const [modalItemId, setModalItemId] = useState(null);
  const [addStockValue, setAddStockValue] = useState("");
  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  const filteredListItems = mockInventoryListItems
    .filter(
      (item) =>
        item.name.toLowerCase().includes(search.toLowerCase()) &&
        (categoryFilter === "" || item.category === categoryFilter) &&
        (!lowStockOnly || item.quantity < 5)
    )
    .sort((a, b) => {
      if (sortType === "name") return a.name.localeCompare(b.name);
      if (sortType === "category") return a.category.localeCompare(b.category);
      if (sortType === "quantity") return b.quantity - a.quantity;
      return 0;
    });
  const totalPages = Math.ceil(filteredListItems.length / itemsPerPage);
  const paginatedFilteredItems = filteredListItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const openAddStockModal = (id) => {
    setModalItemId(id);
    setAddStockValue("");
  };

  const closeAddStockModal = () => {
    setModalItemId(null);
  };
  const handleAddStock = (item) => {
    const qtyToAdd = parseInt(addStockValue, 10);
    if (!isNaN(qtyToAdd) && qtyToAdd > 0) {
      alert(`Adding ${qtyToAdd} stock to ${item.name}`);
      closeAddStockModal();
    } else {
      alert("Please enter a valid positive number");
    }
  };
  return (
    <section>
      <div className="overflow-x-auto">
        <div className="flex flex-wrap items-center gap-4 mb-4">
          <input
            type="text"
            placeholder="Search by name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border p-2 rounded"
          />

          <select
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
            className="border p-2 rounded">
            <option value="">Sort by</option>
            <option value="name">Name</option>
            <option value="category">Category</option>
            <option value="quantity">Quantity</option>
          </select>

          <select
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="border p-2 rounded">
            <option value="">All Categories</option>
            {[
              ...new Set(mockInventoryListItems.map((item) => item.category)),
            ].map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={lowStockOnly}
              onChange={() => setLowStockOnly(!lowStockOnly)}
            />
            Show Low Stock Only
          </label>
        </div>
        <table className="min-w-full border border-gray-300 text-sm text-left">
          <thead className="bg-[var(--color-section)]">
            <tr>
              <th className="p-3 border">No</th>
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Category</th>
              <th className="p-3 border">Quantity</th>
              <th className="p-3 border">Low Stock Limit</th>
              <th className="p-3 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedFilteredItems.map((item, index) => (
              <tr
                key={item.id}
                className={`odd:bg-[var(--color-white)] even:bg-[var(--color-section)] hover:opacity-60 ${
                  item.quantity <= item.lowStockLimit
                    ? "odd:bg-red-50 even:bg-red-50"
                    : ""
                }`}
                title={
                  item.quantity <= item.lowStockLimit
                    ? "Low stock alert!"
                    : undefined
                }>
                <td className="p-3 border">
                  {(currentPage - 1) * itemsPerPage + index + 1}
                </td>
                <td className="p-3 border">{item.name}</td>
                <td className="p-3 border">{item.category}</td>
                <td className="p-3 border">{item.quantity}</td>
                <td className="p-3 border">{item.lowStockLimit}</td>
                <td className="p-3 border space-x-2 flex items-center">
                  <button
                    onClick={() => openAddStockModal(item.id)}
                    className="text-blue-600 bg-transparent"
                    type="button">
                    <img
                      src={AddIcon}
                      alt="Add"
                      className="w-6 h-6 transition hover:opacity-90"
                    />
                  </button>
                  <Link
                    to={`/admin/inventory/${item.id}/edit`}
                    className="text-blue-600">
                    <img
                      src={EditIcon}
                      alt="Edit"
                      className="w-6 h-6 transition hover:opacity-90"
                    />
                  </Link>
                  <button
                    onClick={() => openDeleteModal(item)}
                    className="text-[var(--color-warning)] bg-transparent"
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

            {paginatedFilteredItems.length === 0 && (
              <tr>
                <td colSpan="5" className="p-3 text-center text-gray-500">
                  No items found.
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

      {modalItemId && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded shadow-md p-6 w-80 text-left">
            {(() => {
              const item = mockInventoryListItems.find(
                (i) => i.id === modalItemId
              );
              if (!item) return null;
              return (
                <>
                  <h2 className="text-lg font-bold mb-2">Restock</h2>
                  <p>
                    <strong>Item:</strong> {item.name}
                  </p>
                  <p>
                    <strong>Current Stock:</strong> {item.quantity}
                  </p>
                  <input
                    type="number"
                    min="1"
                    placeholder="Add quantity"
                    value={addStockValue}
                    onChange={(e) => setAddStockValue(e.target.value)}
                    className="border p-2 w-full mt-2 mb-4 rounded"
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={closeAddStockModal}
                      className="px-4 py-1 rounded bg-gray-300 hover:opacity-90">
                      Cancel
                    </button>
                    <button
                      onClick={() => handleAddStock(item)}
                      className="flex items-center px-4 py-1 rounded bg-[var(--color-green)] text-white hover:opacity-90">
                      <img
                        src={AddIcon}
                        alt="Add"
                        className="w-6 h-6 transition "
                      />
                      Add Stock
                    </button>
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      )}
    </section>
  );
};

export default InventoryList;
