// src/data/products.js

const products = [
  {
    id: 1,
    name: "Havells Gracia Alkaline Water Purifier",
    brand: "Havells",
    price: 21998,
    mrp: 32999,
    badge: "Featured",
    category: "Water Purifiers",
    image: new URL(
      "../assets/images/prod/HavellsPurifier.jpeg",
      import.meta.url
    ).href,
  },
  {
    id: 2,
    name: "Havells Hyaline Chandelier 10 Lamp",
    brand: "Havells",
    price: 199999,
    mrp: 240000,
    badge: "Bestseller",
    category: "Lighting",
    image: new URL("../assets/images/prod/deco.jpeg", import.meta.url).href,
  },
  {
    id: 3,
    name: "Havells Sphero Wall Light 1 Lamp",
    brand: "Havells",
    price: 2799,
    mrp: 3100,
    badge: "New",
    category: "Wall Lights",
    image: new URL("../assets/images/prod/HavellsLamp.jpeg", import.meta.url)
      .href,
  },
  {
    id: 4,
    name: "Fybros NEX 10 Way SPN DB",
    brand: "Fybros",
    price: 849,
    mrp: 1590,
    badge: "Top Deal",
    category: "Distribution Boards",
    image: new URL("../assets/images/prod/FybrosDB.jpeg", import.meta.url).href,
  },
  {
    id: 5,
    name: "Philips LED Panel 18W Round",
    brand: "Philips",
    price: 899,
    mrp: 1200,
    badge: "Popular",
    category: "LED Panels",
    image: new URL("../assets/images/prod/PhilipsPanel.jpeg", import.meta.url)
      .href,
  },
  {
    id: 6,
    name: "Crompton Aura Ceiling Fan 1200mm",
    brand: "Crompton",
    price: 2599,
    mrp: 3400,
    badge: "Hot",
    category: "Fans",
    image: new URL("../assets/images/prod/CromptonFan.jpeg", import.meta.url)
      .href,
  },
  {
    id: 7,
    name: "Anchor Roma Classic Switch 16A",
    brand: "Anchor",
    price: 149,
    mrp: 210,
    badge: "Value",
    category: "Switches",
    image: new URL("../assets/images/prod/AnchorSwitch.jpeg", import.meta.url)
      .href,
  },
  {
    id: 8,
    name: "Usha Mist Air Pedestal Fan",
    brand: "Usha",
    price: 3299,
    mrp: 4200,
    badge: "Trending",
    category: "Pedestal Fans",
    image: new URL("../assets/images/prod/UshaFan.jpeg", import.meta.url).href,
  },
];

export default products;
