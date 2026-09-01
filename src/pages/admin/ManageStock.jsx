// pages/admin/ManageStock.jsx
import { useState, useEffect, useCallback } from "react";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../firebase/config";

import {
  MagnifyingGlassIcon,
  ArrowPathIcon,
  ArchiveBoxIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
const LOW_STOCK_THRESHOLD = 5;

const ManageStock = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [stockValues, setStockValues] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [error, setError] = useState("");

  const loadProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const productsSnapshot = await getDocs(collection(db, "products"));

      const productsList = productsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setProducts(productsList);

      const initialStockValues = {};

      productsList.forEach((product) => {
        initialStockValues[product.id] = product.stock ?? 0;
      });

      setStockValues(initialStockValues);
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("Failed to load products. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const updateStock = async (productId) => {
    const rawStock = stockValues[productId];

    const newStock = Number(stockValues[productId]);
    // Validate stock
    if (
      rawStock === "" ||
      rawStock === null ||
      rawStock === undefined ||
      !Number.isInteger(newStock) ||
      newStock < 0
    ) {
      alert("Stock must be a whole number greater than or equal to 0.");
      return;
    }

    try {
      setUpdatingId(productId);

      await updateDoc(doc(db, "products", productId), {
        stock: newStock,
        updatedAt: serverTimestamp(),
      });

      setProducts((currentProducts) =>
        currentProducts.map((product) =>
          product.id === productId ? { ...product, stock: newStock } : product,
        ),
      );
      setStockValues((currentValues) => ({
        ...currentValues,
        [productId]: newStock,
      }));
      alert("Stock updated successfully.");
    } catch (error) {
      console.error("Error updating stock:", error);
      alert("Failed to update stock. Please try again.");
    } finally {
      setUpdatingId(null);
    }
  };

  const filteredProducts = products.filter((product) => {
    const search = searchTerm.trim().toLowerCase();
    const name = String(product.name || "").toLowerCase();
    const brand = String(product.brand || "").toLowerCase();
    const category = String(product.category || "").toLowerCase();
    const stock = Number(product.stock ?? 0);
    const matchesSearch =
      !search ||
      name.includes(search) ||
      brand.includes(search) ||
      category.includes(search);
    let matchesStatus = true;
    if (statusFilter === "in-stock") {
      matchesStatus = stock > LOW_STOCK_THRESHOLD;
    }
    if (statusFilter === "low-stock") {
      matchesStatus = stock > 0 && stock <= LOW_STOCK_THRESHOLD;
    }
    if (statusFilter === "out-of-stock") {
      matchesStatus = stock === 0;
    }
    return matchesSearch && matchesStatus;
  });

  const totalProducts = products.length;

  const inStockCount = products.filter(
    (product) => Number(product.stock ?? 0) > 5,
  ).length;

  const lowStockCount = products.filter((product) => {
    const stock = Number(product.stock ?? 0);
    return stock > 0 && stock <= 5;
  }).length;

  const outOfStockCount = products.filter(
    (product) => Number(product.stock ?? 0) === 0,
  ).length;

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
        {" "}
        <div className="flex flex-col items-center justify-center py-12">
          {" "}
          <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />{" "}
          <p className="mt-4 text-gray-600 font-medium">
            {" "}
            Loading stock information...{" "}
          </p>{" "}
        </div>{" "}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {" "}
      {/* Header */}{" "}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {" "}
        <div>
          {" "}
          <div className="flex items-center gap-3">
            {" "}
            <div className="p-3 bg-blue-100 rounded-xl">
              {" "}
              <ArchiveBoxIcon className="w-7 h-7 text-blue-600" />{" "}
            </div>{" "}
            <div>
              {" "}
              <h1 className="text-3xl font-bold text-gray-900">
                {" "}
                Manage Stock{" "}
              </h1>{" "}
              <p className="text-gray-600 mt-1">
                {" "}
                Monitor and update product inventory{" "}
              </p>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
        <button
          onClick={loadProducts}
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-gray-900 text-white font-semibold rounded-xl hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {" "}
          <ArrowPathIcon className="w-5 h-5" /> Refresh{" "}
        </button>{" "}
      </div>{" "}
      {/* Error */}{" "}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4">
          {" "}
          <p className="font-medium">{error}</p>{" "}
        </div>
      )}{" "}
      {/* Summary Cards */}{" "}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {" "}
        {/* Total */}{" "}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-5">
          {" "}
          <div className="flex items-center justify-between">
            {" "}
            <div>
              {" "}
              <p className="text-sm font-medium text-gray-500">
                {" "}
                Total Products{" "}
              </p>{" "}
              <p className="text-3xl font-bold text-gray-900 mt-1">
                {" "}
                {totalProducts}{" "}
              </p>{" "}
            </div>{" "}
            <div className="p-3 bg-gray-100 rounded-xl">
              {" "}
              <ArchiveBoxIcon className="w-6 h-6 text-gray-700" />{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
        {/* In Stock */}{" "}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-5">
          {" "}
          <div className="flex items-center justify-between">
            {" "}
            <div>
              {" "}
              <p className="text-sm font-medium text-green-600">
                {" "}
                In Stock{" "}
              </p>{" "}
              <p className="text-3xl font-bold text-green-700 mt-1">
                {" "}
                {inStockCount}{" "}
              </p>{" "}
            </div>{" "}
            <div className="p-3 bg-green-100 rounded-xl">
              {" "}
              <CheckCircleIcon className="w-6 h-6 text-green-600" />{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
        {/* Low Stock */}{" "}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-5">
          {" "}
          <div className="flex items-center justify-between">
            {" "}
            <div>
              {" "}
              <p className="text-sm font-medium text-yellow-600">
                {" "}
                Low Stock{" "}
              </p>{" "}
              <p className="text-3xl font-bold text-yellow-700 mt-1">
                {" "}
                {lowStockCount}{" "}
              </p>{" "}
            </div>{" "}
            <div className="p-3 bg-yellow-100 rounded-xl">
              {" "}
              <ExclamationTriangleIcon className="w-6 h-6 text-yellow-600" />{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
        {/* Out of Stock */}{" "}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-5">
          {" "}
          <div className="flex items-center justify-between">
            {" "}
            <div>
              {" "}
              <p className="text-sm font-medium text-red-600">
                {" "}
                Out of Stock{" "}
              </p>{" "}
              <p className="text-3xl font-bold text-red-700 mt-1">
                {" "}
                {outOfStockCount}{" "}
              </p>{" "}
            </div>{" "}
            <div className="p-3 bg-red-100 rounded-xl">
              {" "}
              <XCircleIcon className="w-6 h-6 text-red-600" />{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
      {/* Search + Filter */}{" "}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        {" "}
        <div className="flex flex-col md:flex-row gap-4">
          {" "}
          {/* Search */}{" "}
          <div className="relative flex-1">
            {" "}
            <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />{" "}
            <input
              type="text"
              placeholder="Search by product, brand, or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />{" "}
          </div>{" "}
          {/* Status Filter */}{" "}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {" "}
            <option value="all"> All Stock Status </option>{" "}
            <option value="in-stock"> In Stock </option>{" "}
            <option value="low-stock"> Low Stock </option>{" "}
            <option value="out-of-stock"> Out of Stock </option>{" "}
          </select>{" "}
        </div>{" "}
        <div className="mt-4 text-sm text-gray-500">
          {" "}
          Showing{" "}
          <span className="font-semibold text-gray-900">
            {" "}
            {filteredProducts.length}{" "}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-gray-900"> {totalProducts} </span>{" "}
          products{" "}
        </div>{" "}
      </div>{" "}
      {/* Products Table */}{" "}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        {" "}
        {filteredProducts.length === 0 ? (
          /* Empty State */ <div className="p-12 text-center">
            {" "}
            <ArchiveBoxIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />{" "}
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {" "}
              No products found{" "}
            </h3>{" "}
            <p className="text-gray-500">
              {" "}
              {searchTerm || statusFilter !== "all"
                ? "Try adjusting your search or stock filter."
                : "No products have been added yet."}{" "}
            </p>{" "}
          </div>
        ) : (
          <div className="overflow-x-auto">
            {" "}
            <table className="w-full text-sm text-left">
              {" "}
              <thead className="text-xs uppercase text-gray-700 bg-gray-50 border-b">
                {" "}
                <tr>
                  {" "}
                  <th className="px-6 py-4"> Product </th>{" "}
                  <th className="px-6 py-4 hidden md:table-cell"> Brand </th>{" "}
                  <th className="px-6 py-4 hidden lg:table-cell"> Category </th>{" "}
                  <th className="px-6 py-4"> Current Stock </th>{" "}
                  <th className="px-6 py-4"> Status </th>{" "}
                  <th className="px-6 py-4"> Update Stock </th>{" "}
                </tr>{" "}
              </thead>{" "}
              <tbody className="divide-y divide-gray-200">
                {" "}
                {filteredProducts.map((product) => {
                  const stock = Number(product.stock ?? 0);
                  const isLow = stock > 0 && stock <= LOW_STOCK_THRESHOLD;
                  const isOutOfStock = stock === 0;
                  return (
                    <tr
                      key={product.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      {" "}
                      {/* Product */}{" "}
                      <td className="px-6 py-4">
                        {" "}
                        <div className="flex items-center gap-3">
                          {" "}
                          <img
                            src={product.image || "/placeholder-image.jpg"}
                            alt={product.name || "Product"}
                            className="w-12 h-12 rounded-lg object-cover border border-gray-200 flex-shrink-0"
                            onError={(e) => {
                              e.currentTarget.src = "/placeholder-image.jpg";
                            }}
                          />{" "}
                          <div className="min-w-0">
                            {" "}
                            <p className="font-semibold text-gray-900 truncate max-w-xs">
                              {" "}
                              {product.name || "Unnamed Product"}{" "}
                            </p>{" "}
                            <p className="text-xs text-gray-500">
                              {" "}
                              {product.sku || "No SKU"}{" "}
                            </p>{" "}
                          </div>{" "}
                        </div>{" "}
                      </td>{" "}
                      {/* Brand */}{" "}
                      <td className="px-6 py-4 text-gray-700 hidden md:table-cell">
                        {" "}
                        {product.brand || "–"}{" "}
                      </td>{" "}
                      {/* Category */}{" "}
                      <td className="px-6 py-4 text-gray-700 hidden lg:table-cell">
                        {" "}
                        {product.category || "–"}{" "}
                      </td>{" "}
                      {/* Current Stock */}{" "}
                      <td className="px-6 py-4">
                        {" "}
                        <span className="font-mono font-semibold text-gray-900">
                          {" "}
                          {stock}{" "}
                        </span>{" "}
                      </td>{" "}
                      {/* Status */}{" "}
                      <td className="px-6 py-4">
                        {" "}
                        <span
                          className={`inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full ${isOutOfStock ? "bg-red-100 text-red-800" : isLow ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800"}`}
                        >
                          {" "}
                          {isOutOfStock
                            ? "Out of Stock"
                            : isLow
                              ? "Low Stock"
                              : "In Stock"}{" "}
                        </span>{" "}
                      </td>{" "}
                      {/* Update Stock */}{" "}
                      <td className="px-6 py-4">
                        {" "}
                        <div className="flex items-center gap-2">
                          {" "}
                          <input
                            type="number"
                            min="0"
                            step="1"
                            value={stockValues[product.id] ?? 0}
                            onChange={(e) =>
                              setStockValues((currentValues) => ({
                                ...currentValues,
                                [product.id]: e.target.value,
                              }))
                            }
                            className="w-20 px-3 py-2 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />{" "}
                          <button
                            onClick={() => updateStock(product.id)}
                            disabled={updatingId === product.id}
                            className="px-3 py-2 bg-blue-600 text-white text-xs font-semibold rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                          >
                            {" "}
                            {updatingId === product.id
                              ? "Saving..."
                              : "Update"}{" "}
                          </button>{" "}
                        </div>{" "}
                      </td>{" "}
                    </tr>
                  );
                })}{" "}
              </tbody>{" "}
            </table>{" "}
          </div>
        )}{" "}
      </div>{" "}
    </div>
  );
};

export default ManageStock;
