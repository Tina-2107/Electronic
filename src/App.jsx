import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { WishlistProvider } from "./context/WishlistContext";

// USER PAGES
import Home from "./pages/Home";
import AllProducts from "./pages/AllProducts";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Checkout from "./pages/Checkout";
import Login from "./pages/register/Login";
import Signup from "./pages/register/Signup";
import Orders from "./pages/Orders";
import NoPage from "./pages/NoPage";

// ADMIN PAGES
import AdminLayout from "./components/adminpage/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AddProduct from "./pages/admin/AddProduct";
import EditProduct from "./pages/admin/EditProduct";
import ManageProducts from "./pages/admin/ManageProducts";
import ManageStock from "./pages/admin/ManageStock";
import AdminOrders from "./pages/admin/AdminOrders";

// COMMON COMPONENTS
import Unauthorized from "./pages/Unauthorized";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";

function App() {
  return (
    <WishlistProvider>
      <Router>
        {/* Navbar on all non-admin pages */}

        <Routes>
          {/* USER ROUTES */}
          <Route path="/" element={<Home />} />
          <Route
            path="/products"
            element={<AllProducts categoriesEnabled={true} />}
          />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/orders" element={<Orders />} />
          {/* AUTH */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* ADMIN ROUTES */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="products" element={<ManageProducts />} />
            <Route path="add-product" element={<AddProduct />} />
            <Route path="edit-product/:id" element={<EditProduct />} />
            <Route path="stock" element={<ManageStock />} />
            <Route path="orders" element={<AdminOrders />} />
          </Route>
          {/* NO PAGE */}
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/*" element={<NoPage />} />
        </Routes>

        {/* Footer on all non-admin pages */}
      </Router>
    </WishlistProvider>
  );
}

export default App;
