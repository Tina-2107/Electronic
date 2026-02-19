// pages/admin/AddProduct.jsx
import { useState } from "react";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [form, setForm] = useState({
    name: "",
    brand: "",
    category: "",
    price: "",
    mrp: "",
    stock: "",
    image: "",
    badge: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    // ✅ Image preview for URL input
    if (name === "image" && value) {
      setImagePreview(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await addDoc(collection(db, "products"), {
        ...form,
        price: Number(form.price),
        mrp: Number(form.mrp),
        stock: Number(form.stock),
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      navigate("/admin/manage-products");
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-gray-100">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Add New Product
          </h1>
          <button
            onClick={() => navigate("/admin/manage-products")}
            className="sm:w-auto w-full px-6 py-2.5 bg-gray-500 text-white rounded-xl hover:bg-gray-600 font-semibold transition whitespace-nowrap"
          >
            ← Back to Products
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image Upload Section */}
          <div className="border border-dashed border-gray-300 rounded-2xl p-6 sm:p-8 hover:border-gray-400 transition-colors">
            <label className="block text-sm font-semibold text-gray-900 mb-4">
              Product Image
            </label>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
              {/* Image Preview */}
              <div className="flex flex-col items-center">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 rounded-2xl object-cover shadow-lg border-4 border-gray-100 mx-auto"
                  />
                ) : (
                  <div className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto">
                    <ShoppingBagIcon className="w-12 h-12 text-gray-400" />
                  </div>
                )}
                <p className="text-xs text-gray-500 mt-2 text-center">
                  Image Preview
                </p>
              </div>

              {/* Image URL Input */}
              <div>
                <input
                  type="url"
                  name="image"
                  value={form.image}
                  onChange={handleInputChange}
                  placeholder="https://example.com/product-image.jpg"
                  className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  Paste image URL from your hosting service
                </p>
              </div>
            </div>
          </div>

          {/* Basic Info - 3 Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Product Name *
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleInputChange}
                className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                required
                placeholder="e.g. Havells Gracia Water Purifier"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Brand *
              </label>
              <input
                type="text"
                name="brand"
                value={form.brand}
                onChange={handleInputChange}
                className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                required
                placeholder="e.g. Havells, Philips"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Category *
              </label>
              <select
                name="category"
                value={form.category}
                onChange={handleInputChange}
                className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition appearance-none bg-white"
                required
              >
                <option value="">Select Category</option>
                <option value="Fans">Fans</option>
                <option value="Lighting">Lighting</option>
                <option value="Switches">Switches</option>
                <option value="Wires">Wires</option>
                <option value="Appliances">Appliances</option>
                <option value="Decorative Lighting">Decorative Lighting</option>
                <option value="Switch Gear">Switch Gear</option>
                <option value="Relays">Relays</option>
              </select>
            </div>
          </div>

          {/* Pricing & Stock - 3 Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Price (₹) *
              </label>
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleInputChange}
                min="0"
                step="0.01"
                className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                required
                placeholder="5000"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                MRP (₹) *
              </label>
              <input
                type="number"
                name="mrp"
                value={form.mrp}
                onChange={handleInputChange}
                min="0"
                step="0.01"
                className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                required
                placeholder="6500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Stock Quantity *
              </label>
              <input
                type="number"
                name="stock"
                value={form.stock}
                onChange={handleInputChange}
                min="0"
                className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                required
                placeholder="25"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleInputChange}
              rows="4"
              className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical transition"
              placeholder="Enter product description..."
            />
          </div>

          {/* Badge */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Badge (Optional)
            </label>
            <input
              type="text"
              name="badge"
              value={form.badge}
              onChange={handleInputChange}
              className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              placeholder="Featured, Bestseller, New Arrival, Sale"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <button
              type="button"
              onClick={() => navigate("/admin/manage-products")}
              className="flex-1 py-4 px-8 border-2 border-gray-300 text-gray-700 rounded-2xl hover:bg-gray-50 hover:border-gray-400 font-semibold transition-all shadow-sm hover:shadow-md"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-4 px-8 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-2xl hover:from-emerald-600 hover:to-emerald-700 font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Adding Product...
                </span>
              ) : (
                "Add Product"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
