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
      import.meta.url
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
      import.meta.url
    ).href,
    products: 38,
  },
  {
    name: "Decorative Lighting",
    img: new URL(
      "../../assets/images/categories/decorative.jpeg",
      import.meta.url
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
  return (
    <section id="categories" className="bg-gray-950 py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-semibold text-white">
            Shop by Category
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.name}
              onClick={() => onCategoryClick(cat.name)}
              className="flex flex-col items-center p-4 bg-gray-800/40 rounded-xl hover:bg-gray-800/60 hover:scale-105 transition-all group cursor-pointer w-full"
            >
              <img
                src={cat.img}
                alt={cat.name}
                className="w-[8rem] h-16 object-contain mb-3 group-hover:scale-110 transition-transform"
              />
              <h3 className="text-white text-sm font-semibold text-center group-hover:text-yellow-400 transition-colors">
                {cat.name}
              </h3>
              <p className="text-gray-400 text-xs">{cat.products} products</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
