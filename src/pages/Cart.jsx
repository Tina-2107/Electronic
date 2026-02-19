// src/pages/Cart.jsx
import { useState } from "react";
import { useCart } from "../context/useCart";
import Layout from "../components/common/Layout";
import CheckoutModal from "../components/modals/CheckoutModal";

const Cart = () => {
  const { items, updateQty, removeFromCart, cartTotal, clearCart } = useCart();

  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  if (items.length === 0) {
    return (
      <Layout>
        <main className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
          <p>Your cart is empty.</p>
        </main>
      </Layout>
    );
  }

  return (
    <Layout>
      <main className="bg-gray-950 min-h-screen py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl sm:text-3xl font-semibold text-white mb-6">
            Shopping Cart
          </h1>

          <div className="space-y-4 mb-6">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 bg-gray-900 border border-gray-800 rounded-2xl p-4"
              >
                <img
                  src={item.image}
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
                      onClick={() => removeFromCart(item.id)}
                      className="text-xs text-red-400 hover:text-red-300"
                    >
                      Remove
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    {/* Qty selector */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQty(item.id, item.qty - 1)}
                        className="w-7 h-7 rounded-full bg-gray-800 text-white flex items-center justify-center"
                      >
                        -
                      </button>
                      <span className="w-8 text-center text-sm">
                        {item.qty}
                      </span>
                      <button
                        onClick={() => updateQty(item.id, item.qty + 1)}
                        className="w-7 h-7 rounded-full bg-gray-800 text-white flex items-center justify-center"
                      >
                        +
                      </button>
                    </div>

                    {/* Line total */}
                    <div className="text-sm font-semibold text-yellow-400">
                      ₹{(item.price * item.qty).toLocaleString("en-IN")}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="text-sm text-gray-200">
              Total:{" "}
              <span className="font-semibold text-yellow-400">
                ₹{cartTotal.toLocaleString("en-IN")}
              </span>
            </div>
            <div className="flex gap-3">
              <button
                onClick={clearCart}
                className="px-4 py-2 rounded-xl bg-gray-800 text-gray-200 text-sm"
              >
                Clear Cart
              </button>
              <button
                className="px-4 py-2 rounded-xl bg-yellow-400 text-gray-900 text-sm font-semibold"
                onClick={() => setIsCheckoutOpen(true)}
              >
                Checkout
              </button>
              <CheckoutModal
                isOpen={isCheckoutOpen}
                onClose={() => setIsCheckoutOpen(false)}
              />
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default Cart;
