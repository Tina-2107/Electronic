// pages/admin/AdminDashboard.jsx
import { useState, useEffect } from "react";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from "../../firebase/config";
import {
  ShoppingBagIcon,
  UsersIcon,
  CreditCardIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalCustomers: 0,
    totalRevenue: 0,
  });
  const [loading, setLoading] = useState(true);
  const [recentOrders, setRecentOrders] = useState([]);
  const [lowStockProducts, setLowStockProducts] = useState([]);
  useEffect(() => {
    const loadStats = async () => {
      setLoading(true);
      try {
        // ✅ Total Products
        const productsSnapshot = await getDocs(collection(db, "products"));
        const productsList = productsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        const totalProducts = productsSnapshot.size;
        const lowStock = productsList
          .filter((product) => Number(product.stock) <= 5)
          .slice(0, 5);

        setLowStockProducts(lowStock);
        // ✅ Total Orders (assuming collection "orders")
        const ordersSnapshot = await getDocs(collection(db, "orders"));
        const totalOrders = ordersSnapshot.size;
        const recentOrdersQuery = query(
          collection(db, "orders"),
          orderBy("createdAt", "desc"),
          limit(5),
        );

        const recentOrdersSnapshot = await getDocs(recentOrdersQuery);

        const recentOrdersList = recentOrdersSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setRecentOrders(recentOrdersList);
        // ✅ Total Customers (assuming collection "users" or "customers")
        const customersSnapshot = await getDocs(collection(db, "users"));

        const totalCustomers = customersSnapshot.docs.filter(
          (doc) => doc.data().role === "user",
        ).length;

        // ✅ Total Revenue (sum of order totals; adjust field name as needed)
        let totalRevenue = 0;
        ordersSnapshot.forEach((doc) => {
          const data = doc.data();
          // assuming each order has `total` or `amount` in ₹
          if (typeof data.total === "number") {
            totalRevenue += data.total;
          }
        });

        setStats({
          totalProducts,
          totalOrders,
          totalCustomers,
          totalRevenue: Math.round(totalRevenue * 100) / 100, // 2 decimals
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
        // Optionally show a toast/alert here
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-lg text-gray-600">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Dashboard Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>

        <p className="mt-1 text-gray-600">Overview of your D-Light store</p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {/* Total Products */}
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">
                Total Products
              </p>
              <p className="text-3xl font-bold text-gray-900">
                {stats.totalProducts}
              </p>
            </div>
            <ShoppingBagIcon className="w-12 h-12 text-blue-500" />
          </div>
        </div>

        {/* Total Orders */}
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">
                Total Orders
              </p>
              <p className="text-3xl font-bold text-gray-900">
                {stats.totalOrders}
              </p>
            </div>
            <CreditCardIcon className="w-12 h-12 text-emerald-500" />
          </div>
        </div>

        {/* Total Customers */}
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">
                Total Customers
              </p>
              <p className="text-3xl font-bold text-gray-900">
                {stats.totalCustomers}
              </p>
            </div>
            <UsersIcon className="w-12 h-12 text-indigo-500" />
          </div>
        </div>

        {/* Total Revenue */}
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">
                Total Revenue (₹)
              </p>
              <p className="text-3xl font-bold text-gray-900">
                {stats.totalRevenue.toLocaleString("en-IN")}
              </p>
            </div>
            <ChartBarIcon className="w-12 h-12 text-purple-500" />
          </div>
        </div>
      </div>
      {/* Recent Orders */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">Recent Orders</h2>

          <p className="text-sm text-gray-500 mt-1">
            Latest orders from your customers
          </p>
        </div>

        {recentOrders.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-gray-500">No orders yet.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {recentOrders.map((order) => (
              <div
                key={order.id}
                className="px-6 py-4 flex items-center justify-between"
              >
                <div>
                  <p className="font-semibold text-gray-900">
                    #{order.id.slice(0, 8)}
                  </p>

                  <p className="text-sm text-gray-500">
                    {order.customerName || order.email || "Unknown customer"}
                  </p>
                </div>

                <div className="text-right">
                  <p className="font-semibold text-gray-900">
                    ₹{Number(order.total || 0).toLocaleString("en-IN")}
                  </p>

                  <span className="text-xs text-gray-500 capitalize">
                    {order.status || "pending"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Low Stock */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">Low Stock</h2>

          <p className="text-sm text-gray-500 mt-1">
            Products that need attention
          </p>
        </div>

        {lowStockProducts.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            All products have sufficient stock.
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {lowStockProducts.map((product) => (
              <div
                key={product.id}
                className="px-6 py-4 flex items-center justify-between"
              >
                <div>
                  <p className="font-semibold text-gray-900">{product.name}</p>

                  <p className="text-sm text-gray-500">{product.category}</p>
                </div>

                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800">
                  {Number(product.stock) === 0
                    ? "Out of Stock"
                    : `${product.stock} left`}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
