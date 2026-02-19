import { useState } from "react";
import { useWishlist } from "../context/useWishlist";

const formatCurrency = (value) =>
  typeof value === "number" ? `₹${value.toLocaleString("en-IN")}` : value;

const ProductDetails = ({
  product,
  initialQty = 1,
  maxQty = 5,
  onAddToCart,
  onAddToWishlist,
  className = "",
}) => {
  const [selectedQty, setSelectedQty] = useState(initialQty);
  const {
    brand,
    price,
    mrp,
    inStock,
    description,
    images = [],
    features = [],
  } = product || {};

  const handleAddToCart = () => {
    if (onAddToCart) onAddToCart({ product, qty: selectedQty });
  };

  const { toggleWishlist } = useWishlist();

  const handleAddToWishlist = () => {
    // If parent passed a custom handler use it — otherwise use wishlist context
    if (onAddToWishlist) onAddToWishlist(product);
    else toggleWishlist(product);
  };

  return (
    <div
      className={
        "bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900 min-h-screen py-8 px-4 sm:px-8 lg:px-16 flex flex-col items-center " +
        className
      }
    >
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 rounded-2xl bg-gray-950 border border-gray-800/60 shadow-xl shadow-black/20 p-4 md:p-8">
        {/* LEFT: Product Images */}
        <div className="flex flex-col items-center">
          <div className="w-full flex items-center justify-center bg-gray-900/80 rounded-xl h-56 sm:h-72 lg:h-80 mb-4">
            {images?.[0] ? (
              <img
                src={images[0]}
                alt={name}
                className="w-40 h-40 sm:w-56 sm:h-56 lg:w-64 lg:h-64 object-contain mx-auto"
              />
            ) : (
              <span className="text-gray-500 text-sm">No image</span>
            )}
          </div>

          {/* Thumbnail strip (optional) */}
          {images?.length > 1 && (
            <div className="flex gap-2 mt-2">
              {images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt=""
                  className="w-12 h-12 rounded object-contain border border-gray-700"
                />
              ))}
            </div>
          )}
        </div>

        {/* RIGHT: Product Details & Actions */}
        <div className="flex flex-col justify-center space-y-5">
          {/* Title + badges */}
          <div>
            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-white">
              {name}
            </h1>
            <div className="flex items-center space-x-2 mt-2">
              {brand && (
                <span className="px-2 py-1 rounded-full bg-yellow-400/15 text-yellow-300 text-xs uppercase">
                  {brand}
                </span>
              )}
              {inStock != null && (
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    inStock
                      ? "bg-emerald-400/20 text-emerald-300"
                      : "bg-red-400/20 text-red-300"
                  }`}
                >
                  {inStock ? "In Stock" : "Out of Stock"}
                </span>
              )}
            </div>
          </div>

          {/* Description + features */}
          {description && (
            <p className="text-gray-300 text-sm md:text-base">{description}</p>
          )}

          {features?.length > 0 && (
            <ul className="space-y-2 text-gray-400 pl-5 list-disc">
              {features.map((feat, idx) => (
                <li key={idx} className="text-xs sm:text-sm md:text-base">
                  {feat}
                </li>
              ))}
            </ul>
          )}

          {/* PRICE */}
          {(price != null || mrp != null) && (
            <div className="flex items-baseline gap-3 mt-2">
              {price != null && (
                <span className="text-2xl md:text-3xl font-bold text-yellow-400">
                  {formatCurrency(price)}
                </span>
              )}
              {mrp != null && (
                <span className="text-base text-gray-500 line-through">
                  {formatCurrency(mrp)}
                </span>
              )}
            </div>
          )}

          {/* QTY & ACTIONS */}
          <div className="flex items-center gap-3 mt-4">
            <label
              htmlFor="qty"
              className="text-sm text-gray-300 font-medium mr-2"
            >
              Qty:
            </label>
            <select
              id="qty"
              value={selectedQty}
              onChange={(e) => setSelectedQty(Number(e.target.value))}
              className="bg-gray-800/90 border border-gray-700/70 text-white rounded px-3 py-2 text-sm focus:ring-yellow-400"
            >
              {Array.from({ length: maxQty }, (_, i) => i + 1).map((q) => (
                <option key={q} value={q}>
                  {q}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-4 mt-4">
            <button
              onClick={handleAddToCart}
              className="flex-1 py-2 rounded-xl bg-yellow-400 text-gray-900"
            >
              Add to Cart
            </button>

            <button
              className="flex-1 py-2 rounded-xl bg-gray-800 text-yellow-400 border border-yellow-400 font-semibold shadow hover:bg-yellow-500 hover:text-gray-900 transition"
              onClick={handleAddToWishlist}
            >
              Add to Wishlist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
