// components/modals/CheckoutModal.jsx
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useCart } from "../../context/useCart";
import {
  XMarkIcon,
  CreditCardIcon,
  MapPinIcon,
  TruckIcon,
} from "@heroicons/react/24/outline";

const CheckoutModal = ({ isOpen, onClose }) => {
  const { items, cartTotal, clearCart } = useCart();
  const [step, setStep] = useState(1); // 1: Address, 2: Payment, 3: Review
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
    paymentMethod: "card",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePaymentMethodChange = (method) => {
    setFormData({ ...formData, paymentMethod: method });
  };

  const handleNextStep = () => {
    if (step === 1) {
      // Validate address form
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    }
  };

  const handlePlaceOrder = () => {
    // Process order (API call)
    console.log("Order placed:", { items, total: cartTotal, formData });
    clearCart();
    onClose();
    // Navigate to order success page or show success modal
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 flex items-center justify-center"
        onClose={onClose}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-2 sm:p-4 md:p-6">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className="
              w-full 
              max-w-full 
              sm:max-w-3xl
              md:max-w-4xl 
              max-h-[95vh] 
              transform overflow-hidden 
              rounded-xl 
              bg-gray-900/95 
              border border-gray-700/50 
              backdrop-blur-xl 
              shadow-2xl 
              shadow-black/50
            "
              >
                <div className="p-4 sm:p-6 md:p-8 overflow-y-auto max-h-[95vh]">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-4 sm:mb-6">
                    <Dialog.Title className="text-xl sm:text-2xl font-bold text-white">
                      Checkout
                    </Dialog.Title>
                    <button
                      onClick={onClose}
                      className="p-2 text-gray-400 hover:text-white"
                    >
                      <XMarkIcon className="h-6 w-6" />
                    </button>
                  </div>

                  {/* Steps Indicator */}
                  <div className="flex items-center justify-center  mb-6 sm:mb-8 space-x-2">
                    {[1, 2, 3].map((s) => (
                      <div
                        key={s}
                        className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-semibold transition-all ${
                          step >= s
                            ? "bg-yellow-400 text-gray-900 shadow-yellow-400/30"
                            : "bg-gray-800/50 text-gray-400"
                        }`}
                      >
                        {s}
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                    {/* Left: Form */}
                    <div className="space-y-4 sm:space-y-6">
                      {step === 1 && (
                        <div>
                          <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                            <MapPinIcon className="w-5 h-5" />
                            Shipping Address
                          </h4>
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-300 mb-2">
                                Full Name
                              </label>
                              <input
                                name="name"
                                type="text"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-400/50 focus:border-transparent"
                                placeholder="John Doe"
                                required
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                  Email
                                </label>
                                <input
                                  name="email"
                                  type="email"
                                  value={formData.email}
                                  onChange={handleInputChange}
                                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-400/50"
                                  placeholder="john@example.com"
                                  required
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                  Phone
                                </label>
                                <input
                                  name="phone"
                                  type="tel"
                                  value={formData.phone}
                                  onChange={handleInputChange}
                                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-400/50"
                                  placeholder="9876543210"
                                  required
                                />
                              </div>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-300 mb-2">
                                Address
                              </label>
                              <textarea
                                name="address"
                                rows="3"
                                value={formData.address}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-400/50 resize-none"
                                placeholder="123 Main St, City"
                                required
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                  City
                                </label>
                                <input
                                  name="city"
                                  type="text"
                                  value={formData.city}
                                  onChange={handleInputChange}
                                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-400/50"
                                  placeholder="Mumbai"
                                  required
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                  PIN Code
                                </label>
                                <input
                                  name="pincode"
                                  type="text"
                                  value={formData.pincode}
                                  onChange={handleInputChange}
                                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-400/50"
                                  placeholder="400001"
                                  required
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {step === 2 && (
                        <div>
                          <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                            <CreditCardIcon className="w-5 h-5" />
                            Payment Method
                          </h4>
                          <div className="space-y-3">
                            <div className="flex gap-3">
                              <label className="flex items-center">
                                <input
                                  type="radio"
                                  name="paymentMethod"
                                  value="card"
                                  checked={formData.paymentMethod === "card"}
                                  onChange={() =>
                                    handlePaymentMethodChange("card")
                                  }
                                  className="w-4 h-4 text-yellow-400 focus:ring-yellow-400 border-gray-700"
                                />
                                <span className="ml-2 text-sm text-gray-200">
                                  Credit/Debit Card
                                </span>
                              </label>
                              <label className="flex items-center">
                                <input
                                  type="radio"
                                  name="paymentMethod"
                                  value="upi"
                                  checked={formData.paymentMethod === "upi"}
                                  onChange={() =>
                                    handlePaymentMethodChange("upi")
                                  }
                                  className="w-4 h-4 text-yellow-400 focus:ring-yellow-400 border-gray-700"
                                />
                                <span className="ml-2 text-sm text-gray-200">
                                  UPI
                                </span>
                              </label>
                            </div>
                            {formData.paymentMethod === "card" && (
                              <div className="space-y-3 pt-2">
                                <input
                                  type="text"
                                  placeholder="Card Number"
                                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl"
                                />
                                <div className="grid grid-cols-2 gap-3">
                                  <input
                                    type="text"
                                    placeholder="MM/YY"
                                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl"
                                  />
                                  <input
                                    type="text"
                                    placeholder="CVV"
                                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl"
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {step === 3 && (
                        <div>
                          <h4 className="text-lg font-semibold text-white mb-4">
                            Order Review
                          </h4>
                          <div className="bg-gray-800/30 border border-gray-700/30 rounded-xl p-4 space-y-3">
                            <p className="text-sm text-gray-300">
                              Items:{" "}
                              <span className="font-semibold text-white">
                                {items.length}
                              </span>
                            </p>
                            <p className="text-sm text-gray-300">
                              Delivery:{" "}
                              <span className="text-emerald-400">Free</span>
                            </p>
                            <p className="text-sm text-gray-300">
                              Tax:{" "}
                              <span className="font-semibold text-white">
                                Included
                              </span>
                            </p>
                            <div className="border-t border-gray-700/50 pt-3">
                              <div className="flex justify-between text-lg font-bold">
                                <span>Total:</span>
                                <span className="text-yellow-400">
                                  ₹{cartTotal.toLocaleString("en-IN")}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Right: Order Summary */}
                    <div className="space-y-5 sm:space-y-6">
                      <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-4 sm:p-6">
                        <h4 className="text-lg font-semibold text-white mb-3 sm:mb-4">
                          Order Summary
                        </h4>
                        <div className="space-y-3 max-h-52 sm:max-h-64 overflow-y-auto pr-1">
                          {items.slice(0, 3).map((item) => (
                            <div
                              key={item.id}
                              className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-800/30"
                            >
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-12 h-12 object-contain rounded-lg bg-gray-900/50"
                              />
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-white truncate">
                                  {item.name}
                                </p>
                                <p className="text-xs text-gray-400">
                                  ₹{item.price.toLocaleString("en-IN")}
                                </p>
                              </div>
                              <span className="text-sm font-semibold text-white">
                                x{item.qty}
                              </span>
                            </div>
                          ))}
                          {items.length > 3 && (
                            <p className="text-xs text-gray-400 text-center py-2">
                              +{items.length - 3} more items
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="space-y-3 border-t border-gray-700/50 pt-4">
                        {step < 3 ? (
                          <>
                            <button
                              onClick={onClose}
                              className="w-full py-3 px-4 border border-gray-700 text-gray-300 rounded-xl hover:bg-gray-800/50 transition"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={handleNextStep}
                              className="w-full py-3 px-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 font-semibold rounded-xl shadow-lg hover:from-yellow-300 hover:shadow-xl transition-all"
                            >
                              Continue to {step === 1 ? "Payment" : "Review"}
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={handlePlaceOrder}
                            className="w-full py-4 px-6 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold rounded-xl shadow-lg hover:from-emerald-400 hover:shadow-xl transition-all text-lg"
                          >
                            Place Order
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default CheckoutModal;
