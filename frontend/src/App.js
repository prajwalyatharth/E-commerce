import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "antd/dist/reset.css";
import "./App.css";
import Footer from "./components/footer/Footer";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/home/Home";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import PageNotFound from "./pages/notFound/PageNotFound";
import { AuthProvider } from "./context/auth";
import Dashboard from "./pages/user/Dashboard";
import PrivetRoute from "./components/routes/Privet";
import Forgotpassword from "./pages/forgotpassword/Forgotpassword";
import AdminRoute from "./components/routes/AdminRoute";
import AdminDashboard from "./pages/user/AdminDashboard";
import CreateProduct from "./components/admin/CreateProduct";
import CreateCategory from "./components/admin/CreateCategory";
import UsersPage from "./components/admin/UsersPage";
import Profile from "./pages/user/Profile";
import Orders from "./pages/user/Orders";
import Products from "./components/admin/Products";
import UpdateProduct from "./components/admin/UpdateProduct";
import AllProducts from "./pages/allProducts/AllProducts";
import { SearchProvider } from "./context/search";
import SearchPage from "./pages/searchpage/SearchPage";
import ProductDetails from "./pages/productdetails/ProductDetails";
import CategoriesPage from "./pages/allProducts/CategoriesPage";
import CategoryProduct from "./pages/allProducts/CategoryProduct";
import CartPage from "./pages/user/CartPage";

function App() {
  return (
    <div>
      <Router>
        <Navbar />

        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/products/:slug" element={<ProductDetails />} />
          <Route exact path="/categories" element={<CategoriesPage />} />
          <Route exact path="/cart" element={<CartPage />} />
          <Route exact path="/category/:slug" element={<CategoryProduct />} />
          <Route exact path="/search" element={<SearchPage />} />

          <Route exact path="/dashboard" element={<PrivetRoute />}>
            <Route exact path="user" element={<Dashboard />} />
            <Route exact path="/dashboard/user/profile" element={<Profile />} />
            <Route exact path="/dashboard/user/orders" element={<Orders />} />
          </Route>

          <Route exact path="/dashboard" element={<AdminRoute />}>
            <Route exact path="admin" element={<AdminDashboard />} />
            <Route
              exact
              path="/dashboard/admin/create-product"
              element={<CreateProduct />}
            />
            <Route
              exact
              path="/dashboard/admin/product/:slug"
              element={<UpdateProduct />}
            />
            <Route
              exact
              path="/dashboard/admin/create-category"
              element={<CreateCategory />}
            />
            <Route
              exact
              path="/dashboard/admin/products"
              element={<Products />}
            />
            <Route exact path="/dashboard/admin/user" element={<UsersPage />} />
          </Route>

          <Route exact path="/register" element={<Register />} />
          <Route exact path="/all-products" element={<AllProducts />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/forgot-password" element={<Forgotpassword />} />
          <Route exact path="*" element={<PageNotFound />} />
        </Routes>

        <Footer />
      </Router>
    </div>
  );
}

export default App;
