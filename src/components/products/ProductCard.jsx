import { useCart } from "../../context/useCart";
import { useWishlist } from "../../context/useWishlist";

const formatCurrency = (value) =>
  typeof value === "number" ? `₹${value.toLocaleString("en-IN")}` : value;

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { name, price, mrp, image, brand, badge } = product;

  return (
    <div className="flex flex-col h-full bg-gray-900 border border-gray-800 rounded-2xl p-4 hover:border-yellow-400/70 hover:-translate-y-1 transition">
      {/* Image */}
      <div className="h-32 sm:h-40 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center mb-3 overflow-hidden">
        {image ? (
          <img
            src={image}
            alt={name}
            className="object-contain w-20 h-20 sm:w-24 sm:h-24"
          />
        ) : (
          <span className="text-gray-500 text-xs">No image</span>
        )}
      </div>

      {/* Title */}
      <h3 className="font-semibold text-white text-sm sm:text-base mb-1.5 line-clamp-2">
        {name}
      </h3>

      {/* Brand / Badge */}
      <div className="flex items-center gap-2 mb-2">
        {brand && (
          <span className="px-2 py-0.5 rounded bg-gray-800 text-xs text-gray-300">
            {brand}
          </span>
        )}
        {badge && (
          <span className="px-2 py-0.5 rounded bg-yellow-400/15 text-xs text-yellow-300 uppercase">
            {badge}
          </span>
        )}
      </div>

      {/* Price */}
      <div className="flex items-baseline gap-2 mb-3">
        {price != null && (
          <span className="font-bold text-yellow-400 text-base sm:text-lg">
            {formatCurrency(price)}
          </span>
        )}
        {mrp != null && (
          <span className="text-xs text-gray-500 line-through">
            {formatCurrency(mrp)}
          </span>
        )}
      </div>

      {/* Actions (optional placeholder) */}
      <div className="mt-auto flex gap-2">
        <button
          onClick={() => addToCart(product, 1)}
          className="w-full py-2 rounded-xl bg-yellow-400 text-gray-900"
        >
          Add to Cart
        </button>
        <WishlistButton product={product} />
      </div>
    </div>
  );
};

const WishlistButton = ({ product }) => {
  const { inWishlist, toggleWishlist } = useWishlist();
  const active = inWishlist(product.id);
  return (
    <button
      onClick={() => toggleWishlist(product)}
      className={`px-3 py-2 rounded-xl border transition ${
        active
          ? "bg-pink-500 text-white border-pink-500"
          : "bg-gray-800 border-gray-700 text-yellow-300 hover:bg-yellow-400/20 hover:border-yellow-400"
      }`}
    >
      {active ? "♥ In Wishlist" : "Wishlist"}
    </button>
  );
};

export default ProductCard;
