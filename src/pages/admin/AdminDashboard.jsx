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

  useEffect(() => {
    const loadStats = async () => {
      try {
        const productsSnapshot = await getDocs(collection(db, "products"));
        setStats((prev) => ({
          ...prev,
          totalProducts: productsSnapshot.size,
        }));
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    loadStats();
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
      {/* Stats Cards */}
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
      {/* Add more stat cards */}
    </div>
  );
};

export default AdminDashboard;
