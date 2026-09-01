// pages/admin/AdminDashboard.jsx
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
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

  useEffect(() => {
    const loadStats = async () => {
      setLoading(true);
      try {
        // ✅ Total Products
        const productsSnapshot = await getDocs(collection(db, "products"));
        const totalProducts = productsSnapshot.size;

        // ✅ Total Orders (assuming collection "orders")
        const ordersSnapshot = await getDocs(collection(db, "orders"));
        const totalOrders = ordersSnapshot.size;

        // ✅ Total Customers (assuming collection "users" or "customers")
        const customersSnapshot = await getDocs(collection(db, "users"));
        const totalCustomers = customersSnapshot.size;

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
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
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
  );
};

export default AdminDashboard;
