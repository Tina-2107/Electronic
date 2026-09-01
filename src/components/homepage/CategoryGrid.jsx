const CATEGORIES = [
  {
    name: "Fans",
    img: new URL("../../assets/images/categories/fan.jpeg", import.meta.url)
      .href,
    products: 250,
  },
  {
    name: "Lighting",
    img: new URL("../../assets/images/categories/lights.jpeg", import.meta.url)
      .href,
    products: 538,
  },
  {
    name: "Switches",
    img: new URL(
      "../../assets/images/categories/switches.jpeg",
      import.meta.url,
    ).href,
    products: 760,
  },
  {
    name: "Wires",
    img: new URL("../../assets/images/categories/wires.jpeg", import.meta.url)
      .href,
    products: 154,
  },
  {
    name: "Appliances",
    img: new URL(
      "../../assets/images/categories/appliances.jpeg",
      import.meta.url,
    ).href,
    products: 38,
  },
  {
    name: "Decorative Lighting",
    img: new URL(
      "../../assets/images/categories/decorative.jpeg",
      import.meta.url,
    ).href,
    products: 121,
  },
  {
    name: "Switch Gear",
    img: new URL("../../assets/images/categories/gear.jpeg", import.meta.url)
      .href,
    products: 969,
  },
  {
    name: "Relays",
    img: new URL("../../assets/images/categories/relays.jpeg", import.meta.url)
      .href,
    products: 112,
  },
];

const CategoryGrid = ({ onCategoryClick }) => {
  const handleCategoryClick = (categoryName) => {
    if (typeof onCategoryClick === "function") {
      onCategoryClick(categoryName);
    }
  };

  return (
    <section id="categories" className="bg-gray-950 py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold text-white">
              Shop by Category
            </h2>

            <p className="text-sm text-gray-400 mt-1">
              Find the right electrical products for your needs
            </p>
          </div>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.name}
              type="button"
              onClick={() => handleCategoryClick(cat.name)}
              className="
                group
                flex flex-col items-center
                w-full
                p-4 sm:p-5
                rounded-2xl
                bg-gray-900
                border border-gray-800
                hover:border-yellow-400/60
                hover:bg-gray-800
                hover:-translate-y-1
                transition-all duration-200
                focus:outline-none
                focus:ring-2
                focus:ring-yellow-400/60
              "
            >
              {/* Image */}
              <div
                className="
                  w-full
                  h-24 sm:h-28
                  flex items-center justify-center
                  rounded-xl
                  bg-gray-800/60
                  overflow-hidden
                  mb-4
                "
              >
                <img
                  src={cat.img}
                  alt={cat.name}
                  loading="lazy"
                  className="
                    w-28 sm:w-32
                    h-20 sm:h-24
                    object-contain
                    group-hover:scale-110
                    transition-transform duration-200
                  "
                />
              </div>

              {/* Name */}
              <h3
                className="
                  text-white
                  text-sm sm:text-base
                  font-semibold
                  text-center
                  group-hover:text-yellow-400
                  transition-colors
                "
              >
                {cat.name}
              </h3>

              {/* Product Count */}
              <p className="text-gray-400 text-xs mt-1">
                {cat.products} products
              </p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
