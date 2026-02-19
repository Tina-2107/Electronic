import { useState, useEffect } from "react";

const HeroBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Best Deals on Electrical Products",
      subtitle: "Up to 70% OFF on MCBs, Fans & Lighting",
      cta: "Shop Deals Now",
      badge: "Today's Best Deals",
    },
    {
      title: "Premium Havells Collection",
      subtitle: "Genuine Products with Fast Delivery",
      cta: "Explore Havells",
      badge: "Featured Products",
    },
  ];

  const OFFERS = [
    {
      name: "Schneider MCB 6A",
      price: 757,
      oldPrice: 2373,
      img: new URL("../../assets/images/SchMCB.jpeg", import.meta.url).href,
      gradient: "from-yellow-400 to-orange-400",
      tilt: "hover:rotate-1",
    },
    {
      name: "Havells LED Panel",
      price: 680,
      oldPrice: 1182,
      img: new URL("../../assets/images/HavelLED.jpeg", import.meta.url).href,
      gradient: "from-blue-400 to-indigo-400",
      tilt: "-rotate-2",
    },
    {
      name: "Havells LED Panel",
      price: 680,
      oldPrice: 1182,
      img: new URL("../../assets/images/HavelLED.jpeg", import.meta.url).href,
      gradient: "from-blue-400 to-indigo-400",
      tilt: "-rotate-2",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]); // add slides.length as dependency

  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-gray-900 via-blue-900/20 to-gray-900 min-h-[500px] sm:min-h-[600px] lg:min-h-[700px]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,#fbbf24_0%,transparent_50%)] opacity-20 animate-pulse" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-center">
          {/* Content */}
          <div className="lg:pr-12 text-center lg:text-left order-2 lg:order-1">
            <div className="inline-flex items-center px-3 sm:px-4 py-2 rounded-full bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 text-sm font-semibold mb-6 sm:mb-8 backdrop-blur-sm max-w-max mx-auto lg:mx-0">
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              {slides[currentSlide].badge} [attached_file:1]
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent leading-tight mb-4 sm:mb-6">
              {slides[currentSlide].title}
            </h1>

            <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 sm:mb-10 leading-relaxed max-w-lg mx-auto lg:mx-0">
              {slides[currentSlide].subtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8 sm:mb-12">
              <a
                href="#deals"
                className="group inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 font-semibold text-base sm:text-lg rounded-xl shadow-2xl hover:shadow-yellow-500/25 transform hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto backdrop-blur-sm border border-yellow-400/20"
              >
                {slides[currentSlide].cta}
                <svg
                  className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>
              <a
                href="#featured"
                className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 border-2 border-gray-600/50 hover:border-yellow-400/50 bg-gray-900/50 backdrop-blur-sm text-white font-semibold text-base sm:text-lg rounded-xl hover:bg-gray-800/50 transition-all duration-300 w-full sm:w-auto"
              >
                View All Products
              </a>
            </div>
          </div>

          {/* Image Section */}
          <div className="relative h-64 sm:h-80 lg:h-[500px] xl:h-[600px] order-1 lg:order-2 flex items-center justify-center lg:justify-end">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 to-blue-500/5 rounded-3xl backdrop-blur-xl border border-yellow-400/20 shadow-2xl w-full h-full" />

            <div className="relative grid grid-cols-2 gap-4 sm:gap-6 max-w-sm sm:max-w-md mx-auto lg:mr-0">
              {OFFERS.map((item, index) => (
                <div
                  key={index}
                  className={`group relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-gray-700/50 hover:border-yellow-400/50 transition-all duration-500 hover:scale-105 ${item.tilt} h-28 sm:h-32 lg:h-40`}
                >
                  <div
                    className={`w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r ${item.gradient} rounded-xl mb-3 sm:mb-4 shadow-lg mx-auto`}
                  >
                    <img
                      src={item.img}
                      alt={item.name}
                      className="mx-auto mb-3 sm:mb-4 h-10 sm:h-16 object-contain"
                    />
                  </div>

                  <h4 className="font-semibold text-white text-xs sm:text-sm mb-1 text-center">
                    {item.name}
                  </h4>

                  <p className="text-lg sm:text-2xl font-bold text-yellow-400 text-center">
                    ₹{item.price}
                  </p>

                  <span className="text-xs text-gray-400 text-center block">
                    ₹{item.oldPrice}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 lg:hidden animate-bounce">
        <svg
          className="w-5 h-8 text-white/60"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  );
};

export default HeroBanner;
