import Layout from "../components/common/Layout";
import { useWishlist } from "../context/useWishlist";
import { useCart } from "../context/useCart";

const Wishlist = () => {
  const { items, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (items.length === 0) {
    return (
      <Layout>
        <main className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
          <p>Your wishlist is empty.</p>
        </main>
      </Layout>
    );
  }

  return (
    <Layout>
      <main className="bg-gray-950 min-h-screen py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl sm:text-3xl font-semibold text-white mb-6">
            Wishlist
          </h1>

          <div className="space-y-4 mb-6">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 bg-gray-900 border border-gray-800 rounded-2xl p-4"
              >
                <img
                  src={item.image || item.image}
                  alt={item.name}
                  className="w-20 h-20 sm:w-24 sm:h-24 object-contain rounded-lg bg-gray-800"
                />

                <div className="flex-1 flex flex-col gap-2">
                  <div className="flex justify-between">
                    <div>
                      <h2 className="text-sm sm:text-base font-semibold text-white">
                        {item.name}
                      </h2>
                      {item.brand && (
                        <p className="text-xs text-gray-400">{item.brand}</p>
                      )}
                    </div>
                    <button
                      onClick={() => removeFromWishlist(item.id)}
                      className="text-xs text-red-400 hover:text-red-300"
                    >
                      Remove
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-semibold text-yellow-400">
                        ₹{(item.price || 0).toLocaleString("en-IN")}
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => addToCart(item, 1)}
                        className="px-4 py-2 rounded-xl bg-yellow-400 text-gray-900 text-sm font-semibold"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default Wishlist;
