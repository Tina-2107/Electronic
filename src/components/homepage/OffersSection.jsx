// components/homepage/OffersSection.jsx
const OffersSection = () => {
  return (
    <section id="deals" className="bg-gray-900 py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-6 sm:mb-8">
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold text-white">
              Today&apos;s Best Deals
            </h2>
            <p className="text-sm sm:text-base text-gray-400 mt-1">
              Limited-time offers on top electrical products.
            </p>
          </div>
          <span className="inline-flex items-center text-xs sm:text-sm text-yellow-300 bg-yellow-400/10 border border-yellow-400/30 px-3 py-1 rounded-full self-start sm:self-auto">
            Up to 70% OFF
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {/* Big left offer */}
          <div className="md:col-span-2 bg-gradient-to-r from-yellow-400/15 to-orange-500/10 border border-yellow-400/40 rounded-2xl p-5 sm:p-7 flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="flex-1">
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-1">
                Schneider Acti 9 MCBs
              </h3>
              <p className="text-sm sm:text-base text-gray-200 mb-3">
                Heavy discounts on 1P & 3P MCBs for homes and industries.
              </p>
              <div className="flex items-baseline space-x-2 mb-4">
                <span className="text-xl sm:text-2xl font-bold text-yellow-300">
                  From ₹382
                </span>
                <span className="text-xs sm:text-sm text-gray-800 bg-yellow-300/80 px-2 py-0.5 rounded-full font-semibold">
                  Save up to 60%
                </span>
              </div>
              <button className="inline-flex items-center px-5 py-2.5 rounded-xl bg-gray-950 text-yellow-300 text-sm font-semibold hover:bg-black/80 transition-colors">
                Shop Schneider Deals
              </button>
            </div>
            <div className="w-full sm:w-40 h-24 sm:h-28 rounded-xl bg-yellow-300/20 border border-yellow-400/40 flex items-center justify-center text-xs text-yellow-50">
              <img
                src={
                  new URL("../../assets/images/SchMCB.jpeg", import.meta.url)
                    .href
                }
                alt="Schneider MCB"
                className="mx-auto mb-3 sm:mb-4"
              />
            </div>
          </div>

          {/* Side stacked offers */}
          <div className="space-y-4">
            <div className="bg-gray-950 border border-gray-800 rounded-2xl p-4">
              <img
                src={
                  new URL("../../assets/images/HavelLED.jpeg", import.meta.url)
                    .href
                }
                alt="Havells LED Panel"
                className="mx-auto mb-3 sm:mb-4 h-12 sm:h-16"
              />
              <h4 className="text-sm sm:text-base font-semibold text-white mb-1">
                Havells LED Panels
              </h4>
              <p className="text-xs sm:text-sm text-gray-400 mb-2">
                Flat prices on 18W square panels.
              </p>
              <p className="text-sm font-semibold text-yellow-300">
                Now at ₹680
              </p>
            </div>
            <div className="bg-gray-950 border border-gray-800 rounded-2xl p-4">
              <img
                src={
                  new URL("../../assets/images/deco.jpeg", import.meta.url).href
                }
                alt="Havells LED Panel"
                className="mx-auto mb-3 sm:mb-4 h-12 sm:h-16"
              />
              <h4 className="text-sm sm:text-base font-semibold text-white mb-1">
                Decorative Lighting
              </h4>
              <p className="text-xs sm:text-sm text-gray-400 mb-2">
                Premium chandeliers and wall lights, limited stocks.
              </p>
              <p className="text-sm font-semibold text-yellow-300">
                Up to 30% OFF
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OffersSection;
