import { useNavigate } from "react-router-dom";
import ProductsGrid from "../products/ProductGrid";
import { useCart } from "../../context/useCart";

const FEATURED_PRODUCTS = [
  {
    id: "featured-1",
    name: "Havells Gracia Alkaline Water Purifier",
    price: 21998,
    mrp: 32999,
    badge: "Featured",
    brand: "Havells",
    stock: 10,
    img: new URL(
      "../../assets/images/prod/HavellsPurifier.jpeg",
      import.meta.url,
    ).href,
  },

  {
    id: "featured-2",
    name: "Havells Hyaline Chandelier 10 Lamp",
    price: 199999,
    mrp: 240000,
    badge: "Bestseller",
    brand: "Havells",
    stock: 5,
    img: new URL("../../assets/images/prod/deco.jpeg", import.meta.url).href,
  },

  {
    id: "featured-3",
    name: "Havells Sphero Wall Light 1 Lamp",
    price: 2799,
    mrp: 3100,
    badge: "New",
    brand: "Havells",
    stock: 15,
    img: new URL("../../assets/images/prod/HavellsLamp.jpeg", import.meta.url)
      .href,
  },

  {
    id: "featured-4",
    name: "Fybros NEX 10 Way SPN DB",
    price: 849,
    mrp: 1590,
    badge: "Top Deal",
    brand: "Fybros",
    stock: 20,
    img: new URL("../../assets/images/prod/FybrosDB.jpeg", import.meta.url)
      .href,
  },
];

const FeaturedProducts = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const featuredProducts = FEATURED_PRODUCTS.map((product) => ({
    id: product.id,
    image: product.img,
    name: product.name,
    price: product.price,
    mrp: product.mrp,
    badge: product.badge,
    brand: product.brand,
    stock: product.stock,
  }));

  const handleAddToCart = (product) => {
    const success = addToCart(product, 1);

    if (success) {
      console.log(`${product.name} added to cart`);
    } else {
      console.log(`${product.name} is out of stock`);
    }
  };

  return (
    <section id="featured" className="bg-gray-900 py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-semibold text-white">
            Featured Products
          </h2>

          <button
            type="button"
            onClick={() => navigate("/products")}
            className="
              text-sm
              text-yellow-400
              hover:text-yellow-300
              transition-colors
            "
          >
            View all →
          </button>
        </div>

        {/* Products */}
        <div className="mt-4">
          <ProductsGrid
            products={featuredProducts}
            onAddToCart={handleAddToCart}
          />
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
