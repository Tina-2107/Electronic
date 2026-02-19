// src/components/CategoryFilter.jsx
const CategoryFilter = ({ categories, activeCategory, onChange }) => {
  return (
    <div className="flex flex-wrap gap-2 sm:gap-3 mb-5 sm:mb-6">
      <button
        type="button"
        onClick={() => onChange("all")}
        className={`px-3 py-1.5 rounded-full text-xs sm:text-sm border ${
          activeCategory === "all"
            ? "bg-yellow-400 text-gray-900 border-yellow-400"
            : "bg-gray-900 text-gray-200 border-gray-700 hover:border-yellow-400/70"
        }`}
      >
        All
      </button>

      {categories.map((cat) => (
        <button
          key={cat}
          type="button"
          onClick={() => onChange(cat)}
          className={`px-3 py-1.5 rounded-full text-xs sm:text-sm border capitalize ${
            activeCategory === cat
              ? "bg-yellow-400 text-gray-900 border-yellow-400"
              : "bg-gray-900 text-gray-200 border-gray-700 hover:border-yellow-400/70"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
