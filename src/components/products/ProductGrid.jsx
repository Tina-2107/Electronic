import { useWishlist } from "../../context/useWishlist";

const ProductsGrid = ({ products, onAddToCart, onAddToWishlist }) => {
  const { toggleWishlist, inWishlist } = useWishlist();
  return (
    <section className="bg-gray-950 py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((prod) => (
            <div
              key={prod.id}
              className="flex flex-col h-full bg-gray-900 border border-gray-800 rounded-2xl p-4 group hover:border-yellow-400/70 transition-all"
            >
              {/* Image */}
              <div className="h-32 sm:h-40 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center mb-3 overflow-hidden">
                <img
                  src={prod.image}
                  alt={prod.name}
                  className="object-contain w-20 h-20 sm:w-24 sm:h-24"
                />
              </div>

              {/* Name */}
              <h3 className="font-semibold text-white text-sm sm:text-base mb-1.5 line-clamp-2 group-hover:text-yellow-300">
                {prod.name}
              </h3>

              {/* Price */}
              <div className="flex items-baseline gap-2 mb-2">
                <span className="font-bold text-yellow-400 text-base sm:text-lg">
                  ₹{prod.price.toLocaleString("en-IN")}
                </span>
                {prod.mrp && (
                  <span className="text-xs text-gray-500 line-through">
                    ₹{prod.mrp.toLocaleString("en-IN")}
                  </span>
                )}
              </div>

              {(prod.brand || prod.badge) && (
                <div className="flex items-center gap-2 mb-2">
                  {prod.brand && (
                    <span className="px-2 py-0.5 rounded bg-gray-800 text-xs text-gray-300">
                      {prod.brand}
                    </span>
                  )}
                  {prod.badge && (
                    <span className="px-2 py-0.5 rounded bg-yellow-400/15 text-xs text-yellow-300 uppercase">
                      {prod.badge}
                    </span>
                  )}
                </div>
              )}
              <div className="mt-auto flex gap-2">
                <button
                  type="button"
                  onClick={() => onAddToCart?.(prod)}
                  className="flex-1 py-2 rounded-xl bg-yellow-400 text-gray-900 text-xs sm:text-sm font-semibold hover:bg-yellow-300 transition-colors"
                >
                  Add to Cart
                </button>
                <button
                  type="button"
                  onClick={() =>
                    onAddToWishlist
                      ? onAddToWishlist(prod)
                      : toggleWishlist(prod)
                  }
                  className={`p-2 rounded-xl border border-gray-700 transition ${
                    inWishlist(prod.id)
                      ? "bg-pink-500 text-white border-pink-500"
                      : "bg-gray-800 hover:bg-yellow-400/20 hover:border-yellow-400 text-pink-400 hover:text-pink-500"
                  }`}
                  title={
                    inWishlist(prod.id)
                      ? "Remove from wishlist"
                      : "Add to wishlist"
                  }
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill={inWishlist(prod.id) ? "currentColor" : "none"}
                    stroke={inWishlist(prod.id) ? "none" : "currentColor"}
                  >
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 1.01 4.5 2.09C13.09 4.01 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsGrid;
