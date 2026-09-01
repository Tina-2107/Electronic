import { useWishlist } from "../context/useWishlist";
import { useCart } from "../context/useCart";
import { Link } from "react-router-dom";

const Wishlist = () => {
  const { items, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  // Empty Wishlist
  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-gray-950 text-white flex items-center justify-center px-4">
        <div className="text-center">
          <div className="text-6xl mb-5">♡</div>

          <h1 className="text-2xl sm:text-3xl font-bold mb-3">
            Your Wishlist is Empty
          </h1>

          <p className="text-gray-400 text-sm sm:text-base mb-6">
            Save products you love and find them here later.
          </p>

          <Link
            to="/products"
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-yellow-400 text-gray-900 font-semibold hover:bg-yellow-300 transition"
          >
            Browse Products
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-950 text-white py-8 sm:py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Wishlist</h1>

            <p className="text-sm text-gray-400 mt-1">
              {items.length} {items.length === 1 ? "product" : "products"} saved
            </p>
          </div>
        </div>

        {/* Wishlist Items */}
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row gap-4 bg-gray-900 border border-gray-800 rounded-2xl p-4 sm:p-5 hover:border-gray-700 transition"
            >
              {/* Product Image */}
              <div className="w-full sm:w-28 h-28 flex-shrink-0 bg-gray-800 rounded-xl flex items-center justify-center">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.name || "Product"}
                    className="w-24 h-24 object-contain rounded-lg"
                  />
                ) : (
                  <span className="text-gray-500 text-xs">No image</span>
                )}
              </div>

              {/* Product Info */}
              <div className="flex-1 flex flex-col justify-between gap-4">
                {/* Top */}
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <h2 className="text-base sm:text-lg font-semibold text-white truncate">
                      {item.name}
                    </h2>

                    {item.brand && (
                      <p className="text-sm text-gray-400 mt-1">{item.brand}</p>
                    )}

                    {item.category && (
                      <p className="text-xs text-gray-500 mt-1">
                        {item.category}
                      </p>
                    )}
                  </div>

                  {/* Remove */}
                  <button
                    type="button"
                    onClick={() => removeFromWishlist(item.id)}
                    className="flex-shrink-0 text-sm text-red-400 hover:text-red-300 transition"
                  >
                    Remove
                  </button>
                </div>

                {/* Bottom */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  {/* Price */}
                  <div>
                    <span className="text-lg font-bold text-yellow-400">
                      ₹{(item.price || 0).toLocaleString("en-IN")}
                    </span>

                    {item.mrp && item.mrp > item.price && (
                      <span className="ml-2 text-sm text-gray-500 line-through">
                        ₹{item.mrp.toLocaleString("en-IN")}
                      </span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => addToCart(item, 1)}
                      disabled={item.inStock === false}
                      className="px-5 py-2.5 rounded-xl bg-yellow-400 text-gray-900 text-sm font-semibold hover:bg-yellow-300 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {item.inStock === false ? "Out of Stock" : "Add to Cart"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Wishlist;
