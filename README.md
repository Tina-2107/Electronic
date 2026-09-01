# ⚡ D-Light

A modern e-commerce web application for browsing and managing electrical and electronic products, built with React, Firebase, Firestore, and Tailwind CSS.

D-Light provides a customer-facing storefront along with an admin dashboard for product, inventory, and order management.

> **Project Status:** Active Development
> The core e-commerce experience and admin workflows are implemented. Payment gateway integration, automated testing, advanced security rules, and some data architecture improvements are planned.

---

## 🚀 Features

### 🛍️ Customer Storefront

- Responsive e-commerce interface
- Product browsing and discovery
- Product categories and brands
- Product search and filtering
- Product details
- Shopping cart
- Wishlist
- Persistent cart using `localStorage`
- Persistent wishlist using `localStorage`
- User registration and login
- Password reset
- Checkout workflow
- Order creation
- Responsive design for desktop and mobile

### 🔐 Authentication

Authentication is implemented using **Firebase Authentication**.

Users can:

- Create an account
- Sign in with email and password
- Sign out
- Reset their password
- Maintain a Firestore-backed user profile

User profiles contain information such as:

```text
uid
email
displayName
phone
newsletter
role
createdAt
```

The application currently supports:

```text
user
admin
```

roles.

---

## 🛠️ Admin Dashboard

Authenticated administrators have access to a dedicated dashboard.

### Dashboard

Provides an overview of:

- Total products
- Total orders
- Total customers
- Revenue
- Recent orders
- Low-stock products

### Product Management

Admins can:

- Add products
- Edit products
- Delete products
- Search products
- Filter products by category
- Update product information

### Inventory Management

Admins can:

- View inventory
- Search inventory
- Filter products by stock status
- Update product stock
- Identify low-stock products

### Order Management

Admins can:

- View customer orders
- Search orders
- Filter orders
- Update order status

---

## 💳 Checkout

D-Light includes a multi-step checkout experience:

```text
Cart
  ↓
Shipping Information
  ↓
Payment Method
  ↓
Order Review
  ↓
Create Order
  ↓
Order Confirmation
```

The checkout currently supports payment-method selection such as:

- Card
- UPI
- Cash on Delivery

### Current limitation

The project currently **does not integrate a real payment gateway**.

The selected payment method is stored with the order, but card/UPI transactions are not processed by a payment provider yet.

A production payment implementation will require a payment gateway and server-side payment verification.

---

# 🏗️ Architecture

D-Light is currently implemented as a React single-page application with Firebase providing authentication and cloud database functionality.

```text
                         D-LIGHT
                            │
             ┌──────────────┴──────────────┐
             │                             │
             ▼                             ▼
       Customer Storefront            Admin Dashboard
             │                             │
      ┌──────┼──────┐              ┌───────┼────────┐
      │      │      │              │       │        │
   Products Cart Wishlist       Products Inventory Orders
      │      │      │              │       │        │
      └──────┼──────┘              └───────┼────────┘
             │                             │
             └──────────────┬──────────────┘
                            ▼
                       Firebase
                    ┌───────┴────────┐
                    │                │
                    ▼                ▼
              Authentication     Firestore
                                      │
                         ┌────────────┼────────────┐
                         │            │            │
                       users       products       orders
```

---

# 🔄 Authentication Flow

```text
User
 │
 ▼
Login / Signup
 │
 ▼
Firebase Authentication
 │
 ▼
Authenticated User
 │
 ▼
AuthProvider
 │
 ▼
users/{uid}
 │
 ▼
Read user profile + role
 │
 ├───────────────┐
 ▼               ▼
User          Admin
 │               │
 ▼               ▼
Storefront    Admin Dashboard
```

The application listens for Firebase authentication state changes through `onAuthStateChanged`.

After authentication, the corresponding Firestore user document is retrieved to determine the user's application role.

---

# 🛒 Cart Architecture

The cart is currently managed through React Context.

```text
Product
   │
   ▼
Add to Cart
   │
   ▼
CartContext
   │
   ├── cartItems
   ├── cartCount
   ├── cartTotal
   └── quantity management
          │
          ▼
     localStorage
```

Cart functionality includes:

- Add product
- Increase quantity
- Decrease quantity
- Remove product
- Clear cart
- Calculate total quantity
- Calculate cart total
- Stock-aware quantity limits

---

# ❤️ Wishlist Architecture

Wishlist state is managed through React Context and persisted using browser `localStorage`.

```text
Product
   │
   ▼
Toggle Wishlist
   │
   ▼
WishlistContext
   │
   ▼
localStorage
```

Users can:

- Add products to wishlist
- Remove products
- Check wishlist membership
- View wishlist count

---

# 📦 Order Flow

When a user completes checkout:

```text
Authenticated User
       │
       ▼
Checkout
       │
       ▼
Validate Shipping Information
       │
       ▼
Select Payment Method
       │
       ▼
Review Order
       │
       ▼
Create Firestore Order
       │
       ▼
Clear Cart
       │
       ▼
Order Created
```

An order contains information such as:

```text
userId
customerName
customerEmail
customerPhone
shippingAddress
items
total
paymentMethod
paymentStatus
orderStatus
createdAt
```

---

# 🗄️ Firestore Data Model

## Users

```text
users/{uid}

{
  uid,
  email,
  displayName,
  phone,
  newsletter,
  role,
  createdAt
}
```

## Products

The admin application uses a Firestore `products` collection.

```text
products/{productId}

{
  name,
  brand,
  category,
  price,
  mrp,
  stock,
  image,
  badge,
  description,
  createdAt,
  updatedAt
}
```

## Orders

```text
orders/{orderId}

{
  userId,
  customerName,
  customerEmail,
  customerPhone,

  shippingAddress: {
    address,
    city,
    pincode
  },

  items: [
    {
      productId,
      name,
      brand,
      price,
      quantity,
      image
    }
  ],

  total,
  paymentMethod,
  paymentStatus,
  orderStatus,
  createdAt
}
```

---

# 🧩 Project Structure

```text
Electronic/
│
├── public/
│
├── src/
│   │
│   ├── assets/
│   │   └── images/
│   │       ├── brands/
│   │       ├── categories/
│   │       └── prod/
│   │
│   ├── components/
│   │   ├── adminpage/
│   │   ├── common/
│   │   ├── homepage/
│   │   ├── modals/
│   │   └── products/
│   │
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   ├── AuthProvider.jsx
│   │   ├── CartContext.jsx
│   │   └── WishlistContext.jsx
│   │
│   ├── data/
│   │   └── products.js
│   │
│   ├── firebase/
│   │   └── config.jsx
│   │
│   ├── pages/
│   │   ├── admin/
│   │   ├── register/
│   │   ├── AllProducts.jsx
│   │   ├── Cart.jsx
│   │   ├── Home.jsx
│   │   ├── Orders.jsx
│   │   ├── ProductDetails.jsx
│   │   └── Wishlist.jsx
│   │
│   ├── redux/
│   │   ├── cartSlice.jsx
│   │   └── store.jsx
│   │
│   ├── utils/
│   │
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
│
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── postcss.config.js
└── README.md
```

---

# 🛣️ Application Routes

## Customer Routes

| Route           | Description       | Access        |
| --------------- | ----------------- | ------------- |
| `/`             | Homepage          | Public        |
| `/products`     | Product catalog   | Public        |
| `/product/:id`  | Product details   | Public        |
| `/cart`         | Shopping cart     | Public        |
| `/wishlist`     | Wishlist          | Public        |
| `/orders`       | User orders       | Authenticated |
| `/login`        | Login             | Guest         |
| `/signup`       | Registration      | Guest         |
| `/unauthorized` | Unauthorized page | Public        |

## Admin Routes

| Route                     | Description          | Access |
| ------------------------- | -------------------- | ------ |
| `/admin/dashboard`        | Admin dashboard      | Admin  |
| `/admin/products`         | Product management   | Admin  |
| `/admin/add-product`      | Add product          | Admin  |
| `/admin/edit-product/:id` | Edit product         | Admin  |
| `/admin/stock`            | Inventory management | Admin  |
| `/admin/orders`           | Order management     | Admin  |

---

# 🧰 Technology Stack

| Technology              | Purpose                                  |
| ----------------------- | ---------------------------------------- |
| React 19                | Frontend UI                              |
| Vite                    | Build tool and development server        |
| React Router            | Client-side routing                      |
| Tailwind CSS            | Styling                                  |
| Firebase Authentication | User authentication                      |
| Cloud Firestore         | Database                                 |
| React Context           | Authentication, cart, and wishlist state |
| Redux Toolkit           | Global state management setup            |
| Headless UI             | Accessible UI primitives                 |
| Heroicons               | UI icons                                 |
| React Icons             | Additional icons                         |
| ESLint                  | Code quality                             |
| GitHub Pages            | Deployment                               |

---

# ⚙️ Getting Started

## Prerequisites

Make sure you have:

- Node.js
- npm
- Git
- A Firebase project

---

## 1. Clone the repository

```bash
git clone https://github.com/Tina-2107/Electronic.git
```

```bash
cd Electronic
```

---

## 2. Install dependencies

```bash
npm install
```

---

## 3. Configure Firebase

Create a Firebase project and enable:

- Firebase Authentication
- Email/Password authentication
- Cloud Firestore

The application currently initializes Firebase through:

```text
src/firebase/config.jsx
```

For local development, Firebase configuration should eventually be moved to environment variables.

---

## 4. Start the development server

```bash
npm run dev
```

Vite will provide the local development URL in the terminal.

---

# 🧪 Available Scripts

### Development

```bash
npm run dev
```

Starts the Vite development server.

### Production Build

```bash
npm run build
```

Creates the production build.

### Preview

```bash
npm run preview
```

Runs the production build locally.

### Lint

```bash
npm run lint
```

Runs ESLint.

### Deployment

```bash
npm run deploy
```

Builds the application and deploys the `dist` directory through GitHub Pages.

---

# 🚀 Deployment

The project is configured for GitHub Pages deployment.

Configured homepage:

```text
https://tina-2107.github.io/Electronic
```

Deployment:

```bash
npm run deploy
```

The deployment architecture is:

```text
GitHub Repository
       │
       ▼
npm run build
       │
       ▼
dist/
       │
       ▼
GitHub Pages
       │
       ▼
React Application
       │
       ▼
Firebase
```

---

# 🔐 Security Considerations

Authentication is implemented using Firebase Authentication and admin access is currently checked through the authenticated user's Firestore role.

However, the frontend admin check should **not be considered the complete security boundary**.

For production deployment, Firestore Security Rules should independently enforce:

```text
Normal User
 ├── Read own profile
 └── Read own orders

Admin
 ├── Manage products
 ├── Manage inventory
 └── Manage orders
```

Client-side route protection can improve UX, but it cannot prevent a malicious client from directly attempting Firebase operations.

---

# ⚠️ Current Limitations

The project is actively being developed. The following areas are known limitations of the current implementation.

### Product data

The storefront currently uses product data from:

```text
src/data/products.js
```

while admin product management uses Firestore.

The planned architecture is to make Firestore the single source of truth for products.

### Product details

The `/product/:id` route exists, but the product-loading flow still needs to be connected properly to the route parameter and Firestore.

### Order history

The `/orders` route exists but the customer-facing order history requires further implementation.

### Payments

There is currently no real payment gateway integration.

The checkout flow creates an order but does not process real card or UPI payments.

### Authorization

Admin authorization currently includes client-side role checking. Production Firestore Security Rules still need to enforce the authorization boundary independently.

### State management

The project currently contains both:

```text
React Context
+
Redux Toolkit
```

The cart functionality currently relies on React Context, while Redux Toolkit is also configured in the application.

A future refactor will establish a clearer single source of truth for application state.

### Scalability

Some admin dashboard metrics currently depend on reading Firestore collections and calculating statistics on the client. This approach is suitable for a small project but should be replaced with scalable queries or aggregated statistics for a larger dataset.

# 📚 What I Learned

Building D-Light involved practical experience with:

- React component architecture
- React Router
- Firebase Authentication
- Cloud Firestore
- CRUD operations
- Role-based application flows
- React Context
- Redux Toolkit
- Browser persistence with `localStorage`
- Form validation
- E-commerce cart architecture
- Inventory management
- Order workflows
- Responsive UI development
- Git and GitHub
- Static deployment with GitHub Pages

The project also exposed several real-world engineering trade-offs around client-side authorization, state management, database design, scalability, and payment security.

---

# 🔮 Future Improvements

Potential future improvements include:

- Real payment integration
- Firestore-based product search and pagination
- Customer order tracking
- Product reviews and ratings
- Product image upload through Firebase Storage
- Better admin analytics
- Coupon and discount system
- Stock reservation during checkout
- Email order notifications
- Automated testing
- CI/CD pipeline
- Production monitoring
- Improved accessibility
- Performance optimization

---

# 🤝 Contributing

Contributions and suggestions are welcome.

### Development workflow

```bash
git checkout -b feature/your-feature
```

Make your changes, then validate:

```bash
npm run lint
npm run build
```

Commit your changes:

```bash
git add .
git commit -m "feat: describe your change"
```

Push the branch:

```bash
git push origin feature/your-feature
```

Then open a pull request.

---

# 👩‍💻 Author

**Tina Verma**

GitHub:
https://github.com/Tina-2107

Repository:
https://github.com/Tina-2107/Electronic

---

## 📄 License

A license file is not currently included in the repository.

Add a `LICENSE` file before explicitly presenting the project as open-source under a specific license.
