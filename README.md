# D-Light ⚡

D-Light is a fully responsive e-commerce frontend for electrical & electronic products, built with **React 19**, **Vite**, **Tailwind CSS**, and **Firebase**. It includes a customer-facing storefront (home page, product listing/details, cart, wishlist, checkout) and a separate admin panel for managing products, stock, and orders.

> ⚠️ **Status: Work in progress.** Several features (product detail fetching, admin/storefront data sync, search filtering) are still incomplete — see [Known Issues](#known-issues) below before relying on this in production.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Routing Overview](#routing-overview)
- [State Management](#state-management)
- [Known Issues](#known-issues)
- [Roadmap / Suggested Next Steps](#roadmap--suggested-next-steps)
- [Contributing](#contributing)

---

## Features

**Storefront**
- Responsive home page with hero banner, category grid, brand slider, offers, and featured products
- Product listing with category/brand/search filters (via URL query params)
- Product details page
- Cart with quantity controls and totals
- Wishlist
- Multi-step checkout modal (address → payment → review)
- Email/password authentication (sign up, log in) via Firebase Auth

**Admin Panel** (`/admin`)
- Dashboard with basic stats
- Add / edit / delete products (Firestore-backed)
- Manage stock (placeholder)
- Manage orders (placeholder)
- Role-based access — only users with `role: "admin"` in Firestore can reach `/admin/*`

---

## Tech Stack

| Layer            | Technology                                  |
|-------------------|----------------------------------------------|
| Framework          | React 19 + Vite 7                            |
| Routing            | React Router 7                               |
| Styling            | Tailwind CSS 3                               |
| UI Components      | Headless UI, Heroicons, React Icons          |
| State Management   | React Context (Cart, Wishlist, Auth) + Redux Toolkit (partially wired, see [Known Issues](#known-issues)) |
| Backend / Data      | Firebase (Auth + Firestore)                  |
| Deployment          | GitHub Pages (`gh-pages`)                    |
| Linting             | ESLint 9 (flat config)                        |

---

## Project Structure

```
src/
├── assets/               # Images, logos, category/product images
├── components/
│   ├── adminpage/         # Admin layout, sidebar, navbar
│   ├── cart/               # Cart-related components (WIP)
│   ├── common/             # Navbar, Footer, Layout, ProtectedRoute
│   ├── homepage/           # Hero, categories, brands, offers, safety highlights
│   ├── modals/              # CheckoutModal
│   └── products/            # ProductCard, ProductGrid, filters (WIP)
├── context/                # Cart, Wishlist, Auth context + hooks
├── data/                   # Static product data (storefront demo data)
├── firebase/                # Firebase app initialization
├── pages/
│   ├── admin/                # AdminDashboard, AddProduct, EditProduct, ManageProducts, ManageStock, AdminOrders
│   ├── register/              # Login, Signup
│   └── ...                    # Home, AllProducts, ProductDetails, Cart, Wishlist, Checkout, Orders
├── redux/                   # Redux Toolkit store + cart slice (currently unused by the UI)
├── utils/                    # Auth helpers, Firestore seed script
├── App.jsx                   # Route definitions
└── main.jsx                  # App entry point / provider tree
```

---

## Getting Started

### Prerequisites
- Node.js `^20.19.0` or `>=22.12.0` (required by Vite 7 / `@vitejs/plugin-react`)
- npm
- A Firebase project (Auth + Firestore enabled)

### Installation

```bash
git clone <repo-url>
cd electronic
npm install
```

### Configure Firebase

Update `src/firebase/config.jsx` with your own Firebase project credentials (or, preferably, move these into environment variables — see [Environment Variables](#environment-variables)).

You'll need a Firestore `products` collection and a `users` collection where each user document has a `role` field (`"admin"` or `"user"`) so the admin panel's access check works.

### Run the dev server

```bash
npm run dev
```

The app will be available at `http://localhost:5173` (default Vite port).

### Build for production

```bash
npm run build
npm run preview   # preview the production build locally
```

---

## Environment Variables

The project currently hardcodes Firebase config in `src/firebase/config.jsx`. It's recommended to move these into a `.env` file (not committed) and read them via `import.meta.env`:

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

Then in `firebase/config.jsx`:

```js
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};
```

Remember to add `.env` to `.gitignore`.

---

## Available Scripts

| Script            | Description                                  |
|--------------------|------------------------------------------------|
| `npm run dev`        | Start the Vite dev server                        |
| `npm run build`       | Type-check-free production build via Vite        |
| `npm run preview`     | Preview the production build locally               |
| `npm run lint`        | Run ESLint across the project                       |
| `npm run deploy`       | Build and deploy to GitHub Pages (`gh-pages`)        |

---

## Routing Overview

**Public / storefront**

| Path              | Page              |
|--------------------|---------------------|
| `/`                  | Home                 |
| `/products`           | AllProducts (filterable by `category`, `brand`, `search` query params) |
| `/product/:id`         | ProductDetails         |
| `/cart`                | Cart                    |
| `/wishlist`             | Wishlist                 |
| `/checkout`              | Checkout                  |
| `/orders`                 | Orders                     |
| `/login`, `/signup`        | Auth pages                   |
| `/unauthorized`             | Access-denied page             |
| `*`                          | 404 (NoPage)                     |

**Admin** (nested under `/admin`, guarded by `AdminLayout`)

| Path                         | Page              |
|--------------------------------|---------------------|
| `/admin/dashboard`               | AdminDashboard        |
| `/admin/products`                 | ManageProducts          |
| `/admin/add-product`                | AddProduct                |
| `/admin/edit-product/:id`             | EditProduct                  |
| `/admin/stock`                          | ManageStock                    |
| `/admin/orders`                          | AdminOrders                      |

---

## State Management

- **Cart** — `src/context/CartContext.jsx` (`useCart()`), used throughout the storefront (Navbar badge, ProductCard, Cart page, Checkout).
- **Wishlist** — `src/context/WishlistContext.jsx` (`useWishlist()`).
- **Auth** — `src/context/AuthProvider.jsx` + `authContextValue.js` (`useAuth()`), backed by Firebase Auth + a Firestore `users` collection for role lookup.
- **Redux Toolkit** — `src/redux/store.jsx` + `cartSlice.jsx` are configured and provided at the root (`main.jsx`), but no component currently dispatches to or reads from this store. It's effectively unused right now — see [Known Issues](#known-issues).

---

## Known Issues

This project is mid-development. Notable open issues:

- **Product details page** doesn't fetch a product by route param — visiting `/product/:id` currently renders an empty page. `ProductDetails.jsx` also references an undestructured `name` variable.
- **Two disconnected product sources**: the admin panel writes to Firestore, but the storefront's `/products` page reads from the static `src/data/products.js` file. Products added via the admin panel won't appear on the storefront.
- **Category filters don't line up** between the homepage `CategoryGrid` labels and the categories used in `data/products.js`, so some category clicks return zero results.
- **Search box on the admin "Manage Products" page** doesn't actually filter the list yet.
- **Pagination counts on "Manage Products"** are inaccurate (total product count isn't fetched separately from the paginated query).
- **Signup form** doesn't persist `fullName`/`phone`/`role` to Firestore, so that data is lost after account creation.
- **Redux store is unused** — cart state lives entirely in `CartContext`.
- A few placeholder strings (`[attached_file:1]`) are still present in `Footer.jsx` and `HeroBanner.jsx` and need to be removed.

---

## Roadmap / Suggested Next Steps

1. Unify product data on Firestore (remove the static `data/products.js` in favor of a shared `services/products.js`).
2. Fix `ProductDetails` to fetch by `useParams().id`.
3. Align category names across `CategoryGrid`, `AllProducts` filters, and the product schema.
4. Wire up search/filter logic in `ManageProducts`.
5. Decide on Redux vs. Context for cart state and remove the unused one.
6. Move Firebase config to environment variables and add Firestore security rules restricting writes to admins.
7. Add a test setup (e.g. Vitest + React Testing Library) for context reducers and key components.

---

## Contributing

1. Fork the repo and create a feature branch.
2. Run `npm run lint` before committing.
3. Keep components small and colocate feature-specific components under their relevant folder (`components/products`, `components/homepage`, etc.).
4. Open a PR with a clear description of the change and any relevant screenshots for UI changes.

---

## License

This project is licensed under the [MIT License](./LICENSE).
