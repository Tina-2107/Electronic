// src/utils/seedProducts.js (Run once to populate)
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/config";

const products = [
  {
    id: 1,
    name: "Havells Gracia Alkaline Water Purifier",
    brand: "Havells",
    category: "water purifiers",
    price: 21998,
    mrp: 32999,
    badge: "Featured",
    image: "https://your-image-url.com/havells-purifier.jpg",
    stock: 25,
  },
  {
    name: "Havells Hyaline Chandelier 10 Lamp",
    brand: "Havells",
    category: "lighting",
    price: 199999,
    mrp: 240000,
    badge: "Bestseller",
    image: "https://your-image-url.com/chandelier.jpg",
    stock: 12,
  },
  // ... add all your products
];

export const seedProducts = async () => {
  try {
    const productsRef = collection(db, "products");
    for (const product of products) {
      await addDoc(productsRef, product);
      console.log(`Added: ${product.name}`);
    }
    console.log("✅ All products seeded!");
  } catch (error) {
    console.error("Error seeding products:", error);
  }
};
