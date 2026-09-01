import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { WishlistProvider } from "./context/WishlistContext";
import { useAuth } from "./context/AuthContext";

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
import UserLayout from "./components/common/UserLayout";

function App() {
  const { user } = useAuth();

  return (
    <WishlistProvider>
      <Router>
        <Routes>
          {/* PUBLIC ROUTES */}
          <Route element={<UserLayout />}>
            <Route path="/" element={<Home />} />
            <Route
              path="/products"
              element={<AllProducts categoriesEnabled={true} />}
            />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route
              path="/checkout"
              element={user ? <Checkout /> : <Navigate to="/login" replace />}
            />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/orders"
              element={user ? <Orders /> : <Navigate to="/login" replace />}
            />
          </Route>
          {/* LOGIN ROUTE */}
          <Route
            path="/login"
            element={
              !user ? (
                <Login />
              ) : user.role === "admin" ? (
                <Navigate to="/admin/dashboard" replace />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />

          {/* PROTECTED USER ROUTE */}
          <Route
            path="/orders"
            element={user ? <Orders /> : <Navigate to="/login" replace />}
          />

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

          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </Router>
    </WishlistProvider>
  );
}

export default App;
