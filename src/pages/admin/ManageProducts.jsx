// pages/admin/ManageProducts.jsx
import { useState, useEffect, useCallback } from "react";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { db } from "../../firebase/config";
import { Link } from "react-router-dom";
import {
  ShoppingBagIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  PencilIcon,
  TrashIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Categories for filter
  const categories = [
    "all",
    "Fans",
    "Lighting",
    "Switches",
    "Wires",
    "Appliances",
    "Decorative Lighting",
    "Switch Gear",
    "Relays",
  ];

  // Fetch products
  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);

      let q;

      if (categoryFilter === "all") {
        q = query(collection(db, "products"), orderBy("createdAt", "desc"));
      } else {
        q = query(
          collection(db, "products"),
          where("category", "==", categoryFilter),
          orderBy("createdAt", "desc"),
        );
      }

      const querySnapshot = await getDocs(q);

      const productsList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setProducts(productsList);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  }, [categoryFilter]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Delete product
  const deleteProduct = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteDoc(doc(db, "products", id));
        await fetchProducts(); // refresh list
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  // Search products
  const displayedProducts = products.filter((p) => {
    const search = searchTerm.trim().toLowerCase();

    const name = String(p.name || "").toLowerCase();
    const brand = String(p.brand || "").toLowerCase();

    return !search || name.includes(search) || brand.includes(search);
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Manage Products</h1>
          <p className="text-gray-600 mt-1">
            {displayedProducts.length} products shown
          </p>
        </div>
        <Link
          to="/admin/add-product"
          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl shadow-lg hover:from-blue-700 hover:shadow-xl transition-all whitespace-nowrap"
        >
          <PlusIcon className="w-5 h-5 mr-2" />
          Add New Product
        </Link>
      </div>

      {/* Filters & Search */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center">
          {/* Search */}
          <div className="relative flex-1 md:flex-auto">
            <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search products by name, brand..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>

          {/* Category Filter */}
          <div className="flex items-center">
            <FunnelIcon className="w-5 h-5 text-gray-400 mr-2" />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === "all" ? "All Categories" : cat}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        {/* Table Header */}
        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
              Products ({displayedProducts.length})
            </h3>
          </div>
        </div>
        {/* Loading */}
        {loading ? (
          <div className="p-12 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-2 text-gray-500">Loading products...</p>
          </div>
        ) : displayedProducts.length === 0 ? (
          /* Empty State */
          <div className="p-12 text-center">
            <ShoppingBagIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />

            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No products found
            </h3>
            <p className="text-gray-500">
              {searchTerm || categoryFilter !== "all"
                ? "Try adjusting your search or filters"
                : "No products have been added yet"}
            </p>
          </div>
        ) : (
          <>
            {/* Responsive Table */}
            <div className="overflow-x-auto">
              <table className="w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">
                      Product
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider hidden md:table-cell">
                      Price
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider hidden lg:table-cell">
                      Stock
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider hidden xl:table-cell">
                      Category
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {displayedProducts.map((product) => (
                    <tr
                      key={product.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      {/* Product Info */}
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-4">
                          <img
                            src={product.image || "/placeholder-image.jpg"}
                            alt={product.name || "Product"}
                            className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                            onError={(e) => {
                              e.target.src = "/placeholder-image.jpg";
                            }}
                          />
                          <div className="min-w-0 flex-1">
                            <div className="text-sm font-semibold text-gray-900 truncate">
                              {product.name || "Unnamed Product"}
                            </div>
                            <div className="text-xs text-gray-500 truncate">
                              {product.brand || "No brand"}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Price */}
                      <td className="px-6 py-4 hidden md:table-cell">
                        <div className="text-sm font-semibold text-gray-900">
                          ₹{product.price ?? 0}
                        </div>
                        {product.mrp && (
                          <div className="text-xs text-gray-500 line-through">
                            ₹{product.mrp}
                          </div>
                        )}
                      </td>

                      {/* Stock */}
                      <td className="px-6 py-4 hidden lg:table-cell">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            Number(product.stock) > 10
                              ? "bg-green-100 text-green-800"
                              : Number(product.stock) > 0
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                          }`}
                        >
                          {product.stock ?? 0}
                        </span>
                      </td>

                      {/* Category */}
                      <td className="px-6 py-4 hidden xl:table-cell">
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">
                          {product.category || "Uncategorized"}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          {/* Edit */}
                          <Link
                            to={`/admin/edit-product/${product.id}`}
                            className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition"
                            title="Edit"
                          >
                            <PencilIcon className="w-5 h-5" />
                          </Link>
                          {/* Delete */}
                          <button
                            onClick={() => deleteProduct(product.id)}
                            className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition"
                            title="Delete"
                          >
                            <TrashIcon className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ManageProducts;
