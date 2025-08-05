import React, { useState } from "react";

const mockOrders = [
  {
    id: "100001",
    status: "Pending",
    user: "John Doe",
    time: "13:45",
    date: "2024-11-04",
    address: "123, abc road, def township",
    total: 22000,
    paymentStatus: "Pending",
    items: [
      { name: "item 1", price: 1000, quantity: 2 },
      { name: "item 2", price: 10000, quantity: 1 },
      { name: "item 3", price: 10000, quantity: 1 },
    ],
  },
  {
    id: "100002",
    status: "Completed",
    user: "Jane Smith",
    time: "10:15",
    date: "2024-10-22",
    address: "456, xyz road, ghi township",
    total: 50000,
    paymentStatus: "Paid",
    items: [{ name: "item A", price: 25000, quantity: 2 }],
  },
  {
    id: "100003",
    status: "Pending",
    user: "Myo Min",
    time: "09:30",
    date: "2024-11-01",
    address: "789, main street, yangon",
    total: 15000,
    paymentStatus: "Pending",
    items: [{ name: "item B", price: 5000, quantity: 3 }],
  },
  {
    id: "100004",
    status: "Completed",
    user: "Aye Chan",
    time: "16:00",
    date: "2024-09-25",
    address: "99, blue street, mandalay",
    total: 30000,
    paymentStatus: "Paid",
    items: [{ name: "item C", price: 15000, quantity: 2 }],
  },
  {
    id: "100005",
    status: "Pending",
    user: "Su Su",
    time: "14:20",
    date: "2024-10-30",
    address: "321, red road, taunggyi",
    total: 40000,
    paymentStatus: "Pending",
    items: [{ name: "item D", price: 20000, quantity: 2 }],
  },
  {
    id: "100006",
    status: "Pending",
    user: "John Doe",
    time: "13:45",
    date: "2024-11-04",
    address: "123, abc road, def township",
    total: 22000,
    paymentStatus: "Pending",
    items: [
      { name: "item 1", price: 1000, quantity: 2 },
      { name: "item 2", price: 10000, quantity: 1 },
      { name: "item 3", price: 10000, quantity: 1 },
    ],
  },
  {
    id: "100007",
    status: "Completed",
    user: "Jane Smith",
    time: "10:15",
    date: "2024-10-22",
    address: "456, xyz road, ghi township",
    total: 50000,
    paymentStatus: "Paid",
    items: [{ name: "item A", price: 25000, quantity: 2 }],
  },
];

const tabs = ["All", "Pending", "Completed"];

const MyOrders = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [sortOrder, setSortOrder] = useState("desc"); // or "asc"

  const filteredOrders = mockOrders
    .filter((order) => activeTab === "All" || order.status === activeTab)
    .sort((a, b) => {
      const dateA = new Date(`${a.date} ${a.time}`);
      const dateB = new Date(`${b.date} ${b.time}`);
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

  return (
    <div className="space-y-6">
      {/* Tabs and Sort */}
      <div className="flex items-center justify-between border-b pb-2">
        <div className="flex gap-4 bg-[var(--color-dark-gray)] p-2 rounded-xl">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`px-4 py-1 rounded-t font-medium ${
                activeTab === tab
                  ? "border-2 text-[var(--color-black)]"
                  : "text-[var(--color-white)] hover:text-[var(--color-white)] bg-[var(--color-dark-gray)]"
              }`}
              onClick={() => setActiveTab(tab)}>
              {tab}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-600">Sort by:</label>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="border rounded px-2 py-1 text-sm">
            <option value="desc">Date (Newest)</option>
            <option value="asc">Date (Oldest)</option>
          </select>
        </div>
      </div>

      {/* Orders */}
      {filteredOrders.map((order) => (
        <div
          key={order.id}
          className="bg-white p-6 rounded shadow space-y-2 text-left">
          <div className="text-sm font-semibold">Order: {order.id}</div>
          <div className="text-sm text-[var(--color-dark-gray)] border-b border-[var(--color-black)] pb-2">
            {order.items.length} items, By {order.user}, {order.time},{" "}
            {order.date}
          </div>
          <div className="text-sm">
            <span className="font-medium">Payment Status:</span>{" "}
            <span
              className={`${
                order.paymentStatus === "Pending"
                  ? "text-[var(--color-highlight)]"
                  : "text-[var(--color-green)]"
              }`}>
              {order.paymentStatus}
            </span>
          </div>
          <div className="text-sm">
            <span className="font-medium">Deliver to:</span> {order.address}
          </div>
          <div className="text-sm font-medium ">
            Total: MMK {order.total.toLocaleString()}
          </div>

          <div className="border-t border-[var(--color-black)] pb-2">
            <p className="font-medium text-[var(--color-dark-gray)]">Products:</p>
            <ol className="list-decimal pl-5 text-sm">
              {order.items?.map((item, index) => (
                <li key={index} className="text-[var(--color-dark-gray)]">
                  {item.name} - {item.price.toLocaleString()} × {item.quantity}
                </li>
              ))}
            </ol>
          </div>
        </div>
      ))}

      {filteredOrders.length === 0 && (
        <p className="text-center text-gray-500">No orders found.</p>
      )}
    </div>
  );
};

export default MyOrders;
