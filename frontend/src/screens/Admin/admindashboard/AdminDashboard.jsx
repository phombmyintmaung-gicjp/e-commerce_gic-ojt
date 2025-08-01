import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const summaryData = [
  { title: "Total Orders", value: 1200, bgColor: "bg-[var(--color-green)]" },
  { title: "Total Purchases", value: 780, bgColor: "bg-[var(--color-highlight)]" },
  { title: "Total Users", value: 350, bgColor: "bg-[var(--color-warning)]" },
];

const monthlyOrders = [
  { month: "Jan", orders: 100 },
  { month: "Feb", orders: 120 },
  { month: "Mar", orders: 90 },
  { month: "Apr", orders: 130 },
  { month: "May", orders: 80 },
  { month: "Jun", orders: 140 },
  { month: "Jul", orders: 110 },
  { month: "Aug", orders: 150 },
  { month: "Sep", orders: 95 },
  { month: "Oct", orders: 135 },
  { month: "Nov", orders: 160 },
  { month: "Dec", orders: 200 },
];

const orderTableData = [
  {
    no: 1,
    orderNo: "ORD20250001",
    shippingAddress: "123 Yangon St, Myanmar",
    shippingStatus: "Delivered",
  },
  {
    no: 2,
    orderNo: "ORD20250002",
    shippingAddress: "456 Mandalay Ave, Myanmar",
    shippingStatus: "Shipped",
  },
  {
    no: 3,
    orderNo: "ORD20250003",
    shippingAddress: "789 Naypyidaw Rd, Myanmar",
    shippingStatus: "Pending",
  },
];

const AdminDashboard = () => {
  return (
    <section >
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8 px-36">
        {summaryData.map((item, index) => (
          <div
            key={index}
            className={`text-[var(--color-white)] text-2xl px-9 py-7 shadow rounded-2xl ${item.bgColor}`}>
            <h2 className="text-lg font-semibold mb-2">{item.title}</h2>
            <p className="text-2xl font-bold">{item.value}</p>
          </div>
        ))}
      </div>

      {/* Orders Bar Chart */}
      <div className="p-6">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthlyOrders}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="orders" fill="#0ea5e9" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Orders Table */}
      <div className="p-6">
        <h2 className="text-lg font-semibold mb-4">Recent Orders</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left border border-gray-200">
            <thead className="bg-gray-100 text-sm">
              <tr>
                <th className="p-3 border">No</th>
                <th className="p-3 border">Order No</th>
                <th className="p-3 border">Shipping Address</th>
                <th className="p-3 border">Shipping Status</th>
              </tr>
            </thead>
            <tbody>
              {orderTableData.map((order) => (
                <tr key={order.no} className="text-sm hover:bg-gray-50">
                  <td className="p-3 border">{order.no}</td>
                  <td className="p-3 border">{order.orderNo}</td>
                  <td className="p-3 border">{order.shippingAddress}</td>
                  <td className="p-3 border">{order.shippingStatus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default AdminDashboard;
