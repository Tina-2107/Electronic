const BRANDS = [
  {
    name: "Havells",
    img: new URL("../../assets/images/brands/havels.png", import.meta.url).href,
  },
  {
    name: "Schneider",
    img: new URL("../../assets/images/brands/schneider.png", import.meta.url)
      .href,
  },
  {
    name: "Fybros",
    img: new URL("../../assets/images/brands/fybros.png", import.meta.url).href,
  },
  {
    name: "Carbtree",
    img: new URL("../../assets/images/brands/carbtree.png", import.meta.url)
      .href,
  },
  {
    name: "Philips",
    img: new URL("../../assets/images/brands/philips.png", import.meta.url)
      .href,
  },
  {
    name: "Usha",
    img: new URL("../../assets/images/brands/usha.png", import.meta.url).href,
  },
  {
    name: "Anchor",
    img: new URL("../../assets/images/brands/anchor.png", import.meta.url).href,
  },
  {
    name: "Crompton",
    img: new URL("../../assets/images/brands/crompton.png", import.meta.url)
      .href,
  },
];

const BrandSlider = () => {
  return (
    <section id="brands" className="bg-gray-950 py-8 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl font-semibold text-white">
            Popular Brands
          </h2>

          <span className="text-xs sm:text-sm text-gray-400">
            Genuine & trusted partners
          </span>
        </div>

        {/* Slider */}
        <div className="relative">
          <div className="flex gap-4 sm:gap-6 overflow-x-auto no-scrollbar py-2">
            {BRANDS.map((brand) => (
              <div
                key={brand.name}
                className="
                  flex-shrink-0
                  w-24 sm:w-28 md:w-32
                  h-20 sm:h-24 md:h-28
                  rounded-xl
                  bg-gray-900
                  border border-gray-800
                  flex items-center justify-center
                  p-3
                  hover:border-yellow-400/60
                  hover:bg-gray-800
                  transition-all duration-200
                "
              >
                <img
                  src={brand.img}
                  alt={brand.name}
                  className="
                    max-w-full
                    max-h-full
                    w-auto
                    h-auto
                    object-contain
                  "
                  loading="lazy"
                />
              </div>
            ))}
          </div>

          {/* Left fade */}
          <div
            className="
              pointer-events-none
              absolute inset-y-0 left-0
              w-6 sm:w-10
              bg-gradient-to-r
              from-gray-950
              to-transparent
            "
          />

          {/* Right fade */}
          <div
            className="
              pointer-events-none
              absolute inset-y-0 right-0
              w-6 sm:w-10
              bg-gradient-to-l
              from-gray-950
              to-transparent
            "
          />
        </div>
      </div>
    </section>
  );
};

export default BrandSlider;
