// pages/AllProducts.jsx (renamed from AllProducts)
import Layout from "../components/common/Layout";
import { useSearchParams } from "react-router-dom";
import { useMemo } from "react";
import CategoryFilter from "../components/products/CategoryFilter";
import BrandFilter from "../components/products/BrandFilter"; // if you have it
import products from "../data/products";
import { useCart } from "../context/useCart";
import ProductsGrid from "../components/products/ProductGrid";

const AllProducts = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { addToCart } = useCart();

  // Get filters from URL
  const categoryFilter = searchParams.get("category") || "all";
  const brandFilter = searchParams.get("brand") || "all";
  const searchTerm = searchParams.get("search") || "";

  // Unique categories and brands
  const categories = useMemo(
    () => Array.from(new Set(products.map((p) => p.category))).filter(Boolean),
    []
  );
  const brands = useMemo(
    () => Array.from(new Set(products.map((p) => p.brand))).filter(Boolean),
    []
  );

  // Filter products step-by-step
  const filteredProducts = products.filter((p) => {
    // Category filter
    const categoryMatch =
      categoryFilter === "all" || p.category === categoryFilter;

    // Brand filter
    const brandMatch = brandFilter === "all" || p.brand === brandFilter;

    // Search filter
    const normalizedSearch = searchTerm.trim().toLowerCase();
    const searchMatch =
      !normalizedSearch ||
      p.name.toLowerCase().includes(normalizedSearch) ||
      p.brand?.toLowerCase().includes(normalizedSearch) ||
      p.category?.toLowerCase().includes(normalizedSearch);

    return categoryMatch && brandMatch && searchMatch;
  });

  // Update URL when filters change
  const updateFilter = (key, value) => {
    if (value === "all") {
      searchParams.delete(key);
    } else {
      searchParams.set(key, value);
    }
    setSearchParams(searchParams);
  };

  return (
    <Layout>
      <main className="bg-gray-950 min-h-screen py-8 sm:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header: Title + Search */}
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h1 className="text-2xl sm:text-3xl font-semibold text-white">
              {categoryFilter !== "all"
                ? `${categoryFilter} Products`
                : "All Products"}
            </h1>

            {/* Search Bar */}
            <div className="w-full sm:w-80 md:w-96">
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => updateFilter("search", e.target.value)}
                  placeholder="Search by name, brand, category..."
                  className="w-full rounded-xl bg-gray-900 border border-gray-700 px-3 py-2.5 text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400/70 focus:border-transparent"
                />
                <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-500">
                  🔍
                </span>
              </div>
            </div>
          </div>

          {/* Filters Row */}
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <CategoryFilter
              categories={categories}
              activeCategory={categoryFilter}
              onChange={(cat) => updateFilter("category", cat)}
            />
            <BrandFilter
              brands={brands}
              activeBrand={brandFilter}
              onChange={(brand) => updateFilter("brand", brand)}
            />
          </div>

          {/* Products Grid */}
          <ProductsGrid
            products={filteredProducts}
            onAddToCart={(product) => addToCart(product, 1)}
          />

          {filteredProducts.length === 0 && (
            <p className="text-sm text-gray-400 text-center py-12 col-span-full">
              No products match your filters. Try adjusting your search or
              category.
            </p>
          )}
        </div>
      </main>
    </Layout>
  );
};

export default AllProducts;
