import React, { useState } from "react";
import { Link } from "react-router-dom";
import EditIcon from "../../../assets/edit_icon.svg";
import DeleteIcon from "../../../assets/delete_icon.svg";
const mockOrders = [
  {
    orderId: 1,
    orderBy: "Alice",
    totalPrice: 10000,
    status: "pending",
  },
  {
    orderId: 2,
    orderBy: "Bob",
    totalPrice: 24500,
    status: "shipped",
  },
  {
    orderId: 3,
    orderBy: "Charlie",
    totalPrice: 18000,
    status: "delivered",
  },
  {
    orderId: 4,
    orderBy: "Diana",
    totalPrice: 22000,
    status: "cancelled",
  },
  {
    orderId: 5,
    orderBy: "Ethan",
    totalPrice: 15000,
    status: "pending",
  },
  {
    orderId: 6,
    orderBy: "Fiona",
    totalPrice: 27500,
    status: "shipped",
  },
  {
    orderId: 7,
    orderBy: "George",
    totalPrice: 19000,
    status: "delivered",
  },
];

const OrdersList = () => {
  const [search, setSearch] = useState("");
  const [sortType, setSortType] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5;

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const filteredOrders = mockOrders
    .filter((order) =>
      String(order.orderId).toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      let comparison = 0;
      if (sortType === "orderId") comparison = a.orderId - b.orderId;
      if (sortType === "price") comparison = a.totalPrice - b.totalPrice;
      return sortDirection === "asc" ? comparison : -comparison;
    });
  const togglePriceSort = () => {
    if (sortType === "price") {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortType("price");
      setSortDirection("asc");
    }
  };

  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * ordersPerPage,
    currentPage * ordersPerPage
  );
  return (
    <section>
      {/* Optional: Add search input */}
      <div className="mb-4 flex gap-4">
        <input
          type="text"
          placeholder="Search by Order ID"
          className="border px-3 py-2 text-sm rounded"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="border px-2 py-2 text-sm rounded"
          value={sortType}
          onChange={(e) => setSortType(e.target.value)}>
          <option value="">Sort By</option>
          <option value="orderId">Order ID</option>
          <option value="price">Total Price</option>
        </select>
      </div>
      {/* Orders Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 text-sm text-left">
          <thead className="bg-[var(--color-section)]">
            <tr>
              <th className="p-3 border">No</th>
              <th className="p-3 border">Order ID</th>
              <th className="p-3 border">Order By</th>
              <th
                className="p-3 border cursor-pointer select-none flex justify-between items-center"
                onClick={togglePriceSort}>
                <span>Total Price</span>
                <span className="inline-block">
                  {sortType === "price"
                    ? sortDirection === "asc"
                      ? "↓"
                      : "↑"
                    : "↕"}
                </span>
              </th>
              <th className="p-3 border">Status</th>
              <th className="p-3 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedOrders.map((order, index) => (
              <tr
                key={order.orderId}
                className="odd:bg-[var(--color-white)] even:bg-[var(--color-section)] hover:opacity-60">
                <td className="p-3 border">
                  {(currentPage - 1) * ordersPerPage + index + 1}
                </td>
                <td className="p-3 border">{order.orderId}</td>
                <td className="p-3 border">{order.orderBy}</td>
                <td className="p-3 border">{order.totalPrice}</td>
                <td className="p-3 border">{order.status}</td>
                <td className="p-3 border space-x-2 flex items-center">
                  <Link
                    to={`/admin/orders/${order.orderId}/edit`}
                    className="text-blue-600 hover:underline">
                    <img
                      src={EditIcon}
                      alt="Edit"
                      className="w-6 h-6 transition hover:opacity-90"
                    />
                  </Link>
                  <button className="text-[var(--color-warning)] hover:underline">
                    <img
                      src={DeleteIcon}
                      alt="Delete"
                      className="w-6 h-6 transition hover:opacity-90"
                    />
                  </button>
                </td>
              </tr>
            ))}
            {paginatedOrders.length === 0 && (
              <tr>
                <td colSpan="6" className="p-3 text-center text-gray-500">
                  No orders found.
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

export default OrdersList;
