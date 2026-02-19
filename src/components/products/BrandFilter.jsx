// components/products/BrandFilter.jsx
const BrandFilter = ({ brands, activeBrand, onChange }) => {
  return (
    <div className="flex flex-wrap gap-2 sm:gap-3 mb-5 sm:mb-6">
      <button
        type="button"
        onClick={() => onChange("all")}
        className={`px-3 py-1.5 rounded-full text-xs sm:text-sm border font-medium transition-all ${
          activeBrand === "all"
            ? "bg-yellow-400 text-gray-900 border-yellow-400 shadow-md shadow-yellow-400/30"
            : "bg-gray-900/50 text-gray-200 border-gray-700/50 hover:border-yellow-400/70 hover:bg-gray-800/50"
        }`}
      >
        All Brands
      </button>

      {brands.map((brand) => (
        <button
          key={brand}
          type="button"
          onClick={() => onChange(brand)}
          className={`px-3 py-1.5 rounded-full text-xs sm:text-sm border font-medium transition-all capitalize ${
            activeBrand === brand
              ? "bg-yellow-400 text-gray-900 border-yellow-400 shadow-md shadow-yellow-400/30"
              : "bg-gray-900/50 text-gray-200 border-gray-700/50 hover:border-yellow-400/70 hover:bg-gray-800/50"
          }`}
        >
          {brand}
        </button>
      ))}
    </div>
  );
};

export default BrandFilter;
