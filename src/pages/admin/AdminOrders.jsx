// pages/admin/AdminOrders.jsx
import { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  query,
  orderBy,
} from "firebase/firestore";
import {
  MagnifyingGlassIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";
import { db } from "../../firebase/config";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [error, setError] = useState("");

  const statusOptions = [
    "pending",
    "processing",
    "shipped",
    "delivered",
    "cancelled",
  ];

  const loadOrders = async () => {
    setLoading(true);
    try {
      setError("");

      const ordersQuery = query(
        collection(db, "orders"),
        orderBy("createdAt", "desc"),
      );

      const ordersSnapshot = await getDocs(ordersQuery);
      const ordersList = ordersSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setOrders(ordersList);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setError("Failed to load orders. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      setUpdatingId(orderId);
      setError("");

      await updateDoc(doc(db, "orders", orderId), {
        status: newStatus,
      });

      setOrders((currentOrders) =>
        currentOrders.map((order) =>
          order.id === orderId
            ? {
                ...order,
                status: newStatus,
              }
            : order,
        ),
      );
    } catch (error) {
      console.error("Error updating order status:", error);
      setError("Failed to update order status. Please try again.");
    } finally {
      setUpdatingId(null);
    }
  };

  const filteredOrders = orders.filter((order) => {
    const search = searchTerm.trim().toLowerCase();

    const matchesSearch =
      !search ||
      String(order.id || "")
        .toLowerCase()
        .includes(search) ||
      String(order.customerName || "")
        .toLowerCase()
        .includes(search) ||
      String(order.userId || "")
        .toLowerCase()
        .includes(search);

    const matchesStatus =
      statusFilter === "all" ||
      (order.status || "pending").toLowerCase() === statusFilter;

    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Manage Orders</h2>
        <p className="text-gray-600">Loading orders...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Manage Orders</h2>

          <p className="text-gray-500 mt-1">
            {filteredOrders.length} of {orders.length} orders
          </p>
        </div>

        <button
          onClick={loadOrders}
          className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition"
        >
          <ArrowPathIcon className="w-5 h-5" />
          Refresh
        </button>
      </div>
      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 rounded-xl p-4">
          {error}
        </div>
      )}
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

          <input
            type="text"
            placeholder="Search by order ID, customer, or user ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Status Filter */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="all">All Status</option>

          {statusOptions.map((status) => (
            <option key={status} value={status}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {filteredOrders.length === 0 ? (
        <p className="text-gray-500">No orders found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs uppercase text-gray-700 bg-gray-50 border-b">
              <tr>
                <th className="px-4 py-3">Order ID</th>
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Total (₹)</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Update Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-mono text-xs text-gray-700">
                    {order.id}
                  </td>
                  <td className="px-4 py-3">
                    {order.customerName || order.userId || "Unknown"}
                  </td>
                  <td className="px-4 py-3 font-semibold">
                    {order.total != null
                      ? Number(order.total).toLocaleString("en-IN")
                      : "–"}
                  </td>
                  <td className="px-4 py-3">
                    {(() => {
                      const status = (order.status || "pending").toLowerCase();

                      const statusClasses = {
                        pending: "bg-gray-100 text-gray-800",
                        processing: "bg-yellow-100 text-yellow-800",
                        shipped: "bg-blue-100 text-blue-800",
                        delivered: "bg-green-100 text-green-800",
                        cancelled: "bg-red-100 text-red-800",
                      };

                      return (
                        <span
                          className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                            statusClasses[status] || "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </span>
                      );
                    })()}
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {order.createdAt?.toDate
                      ? order.createdAt.toDate().toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })
                      : "–"}
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={order.status || "pending"}
                      onChange={(e) =>
                        updateOrderStatus(order.id, e.target.value)
                      }
                      disabled={updatingId === order.id}
                      className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                    >
                      {statusOptions.map((status) => (
                        <option key={status} value={status}>
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </option>
                      ))}
                    </select>

                    {updatingId === order.id && (
                      <span className="ml-2 text-xs text-gray-500">
                        Updating...
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
