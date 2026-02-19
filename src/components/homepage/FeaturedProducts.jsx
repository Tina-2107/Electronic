import { useNavigate } from "react-router-dom";
import ProductsGrid from "../products/ProductGrid";
import { useCart } from "../../context/useCart";
const FEATURED_PRODUCTS = [
  {
    name: "Havells Gracia Alkaline Water Purifier",
    price: 21998,
    mrp: 32999,
    badge: "Featured",
    img: new URL(
      "../../assets/images/prod/HavellsPurifier.jpeg",
      import.meta.url
    ).href,
  },
  {
    name: "Havells Hyaline Chandelier 10 Lamp",
    price: 199999,
    mrp: 240000,
    badge: "Bestseller",
    img: new URL("../../assets/images/prod/deco.jpeg", import.meta.url).href,
  },
  {
    name: "Havells Sphero Wall Light 1 Lamp",
    price: 2799,
    mrp: 3100,
    badge: "New",
    img: new URL("../../assets/images/prod/HavellsLamp.jpeg", import.meta.url)
      .href,
  },
  {
    name: "Fybros NEX 10 Way SPN DB",
    price: 849,
    mrp: 1590,
    badge: "Top Deal",
    img: new URL("../../assets/images/prod/FybrosDB.jpeg", import.meta.url)
      .href,
  },
];

// helper removed: prices are passed through product objects directly and
// rendered by the ProductsGrid component's layout

const FeaturedProducts = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  return (
    <section id="featured" className="bg-gray-900 py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-semibold text-white">
            Featured Products
          </h2>
          <button
            onClick={() => navigate("/products")}
            className="text-sm text-yellow-400 hover:text-yellow-300"
          >
            View all
          </button>
        </div>

        <div className="mt-4">
          <ProductsGrid
            products={FEATURED_PRODUCTS.map((p, i) => ({
              id: `featured-${i}`,
              image: p.img,
              name: p.name,
              price: p.price,
              mrp: p.mrp,
              badge: p.badge,
              brand: p.brand || "",
            }))}
            onAddToCart={(prod) => addToCart(prod, 1)}
            /* allow ProductsGrid to manage wishlist via context */
          />
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
