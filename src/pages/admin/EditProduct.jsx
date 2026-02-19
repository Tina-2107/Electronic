// pages/admin/EditProduct.jsx - COMPLETE FORM
import { useState, useEffect, useCallback } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useParams, useNavigate } from "react-router-dom";

const EditProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({
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
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // ✅ Fetch product data
  const fetchProduct = useCallback(async () => {
    try {
      const docRef = doc(db, "products", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const productData = docSnap.data();
        setProduct({
          name: productData.name || "",
          brand: productData.brand || "",
          category: productData.category || "",
          price: productData.price || "",
          mrp: productData.mrp || "",
          stock: productData.stock || "",
          image: productData.image || "",
          badge: productData.badge || "",
          description: productData.description || "",
        });
      } else {
        navigate("/admin/manage-products");
      }
    } catch (error) {
      console.error("Error fetching product:", error);
    } finally {
      setLoading(false);
    }
  }, [id, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = doc(db, "products", id);
      await updateDoc(docRef, {
        ...product,
        price: Number(product.price),
        mrp: Number(product.mrp),
        stock: Number(product.stock),
      });
      navigate("/admin/manage-products");
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-lg text-gray-500">Loading product...</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Edit Product</h1>
          <button
            onClick={() => navigate("/admin/manage-products")}
            className="px-6 py-2.5 bg-gray-500 text-white rounded-xl hover:bg-gray-600 font-semibold transition"
          >
            ← Back to Products
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image Upload */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-3">
              Product Image
            </label>
            <div className="flex items-center space-x-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-24 h-24 rounded-xl object-cover border-2 border-gray-200"
              />
              <input
                type="url"
                name="image"
                value={product.image}
                onChange={handleInputChange}
                placeholder="https://example.com/image.jpg"
                className="flex-1 p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Basic Info Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Product Name
              </label>
              <input
                type="text"
                name="name"
                value={product.name}
                onChange={handleInputChange}
                className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Brand
              </label>
              <input
                type="text"
                name="brand"
                value={product.brand}
                onChange={handleInputChange}
                className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Category
              </label>
              <select
                name="category"
                value={product.category}
                onChange={handleInputChange}
                className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select Category</option>
                <option value="Fans">Fans</option>
                <option value="Lighting">Lighting</option>
                <option value="Switches">Switches</option>
                <option value="Wires">Wires</option>
                <option value="Appliances">Appliances</option>
              </select>
            </div>
          </div>

          {/* Pricing & Stock Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Price (₹)
              </label>
              <input
                type="number"
                name="price"
                value={product.price}
                onChange={handleInputChange}
                className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
                min="0"
                step="0.01"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                MRP (₹)
              </label>
              <input
                type="number"
                name="mrp"
                value={product.mrp}
                onChange={handleInputChange}
                className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
                min="0"
                step="0.01"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Stock
              </label>
              <input
                type="number"
                name="stock"
                value={product.stock}
                onChange={handleInputChange}
                className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
                min="0"
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
              value={product.description}
              onChange={handleInputChange}
              rows="4"
              className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
              placeholder="Product description..."
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
              value={product.badge}
              onChange={handleInputChange}
              className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Featured, Bestseller, New..."
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              type="button"
              onClick={() => navigate("/admin/manage-products")}
              className="flex-1 py-4 px-8 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 font-semibold transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-4 px-8 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              Update Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
