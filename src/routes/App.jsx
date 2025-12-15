import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Layout from "../layout/Layout";
import Home from "../Pages/Home";
import PrivacyPolicy from "../Pages/PrivacyPolicy";
import Products from "../Pages/Products";
import ScrollToSection from "../components/ScrollToSection";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import { motion } from "framer-motion";
import Product from "../components/Product";
import TermsAndConditions from "../Pages/TermsAndConditions";
import { CartProvider } from "../context/CartContext";
import { FavoritesProvider } from "../context/FavoritesContext";
import Cart from "../Pages/Cart";
import Favorites from "../Pages/Favorites";
import DashboardLayout from "../components/admin/v2/DashboardLayout";
import ProductDashboard from "../components/admin/v2/ProductDashboard";
import ServiceOrders from "../components/admin/v2/ServiceOrders";
import ServiceOrderDetail from "../components/admin/v2/ServiceOrderDetail";
import Customers from "../components/admin/v2/Customers";
import POS from "../components/admin/v2/POS";
import Settings from "../components/admin/v2/Settings";
import Inventory from "../Pages/admin/v2/Inventory";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ServiceOrder from "../Pages/ServiceOrder";
import Checkout from "../Pages/Checkout"; // import new page
import { useUser } from "../context/UserContext";
import { refreshToken } from "../services/authService";
import { initializeSession } from "../services/sessionService";
import BtuCalculatorPage from "../Pages/BtuCalculatorPage";
import ForgotPassword from "../Pages/ForgotPassword";
import ResetPassword from "../Pages/ResetPassword";
import ProtectedRoute from "./ProtectedRoute";
import AdminHome from "../Pages/admin/AdminHome";
import ProfileLayout from "../Pages/ProfileLayout";
import AccountOverview from "../Pages/AccountOverview";
import OrdersPage from "../Pages/OrdersPage";
import Security from "../Pages/Security";
import Signup from "../Pages/Signup";
import AddressesPage from "../Pages/AddressesPage";
import OrderStatus from "../Pages/OrderStatus";
import Support from "../Pages/Support";
import AdminOrders from "../Pages/admin/AdminOrders";
import AdminOrderDetail from "../Pages/admin/AdminOrderDetail";
import Plans from "../Pages/Plans";
import Loader from "../components/Loader";


const App = () => {
  const { token, login } = useUser();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initializeSession();
  }, []);

  useEffect(() => {
    const getAccessToken = async () => {
      try {
        const newAccessToken = await refreshToken();
        login(newAccessToken);
      } catch (error) {
        // The user doesn't have a valid refresh token, so they are not logged in.
      } finally {
        setLoading(false);
      }
    };

    getAccessToken();
  }, [login]);

  if (loading) {
    return <Loader />;
  }

  return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.5 }}
      >
        <BrowserRouter>
          <ToastContainer />
          <ScrollToSection />
          <CartProvider>
            <FavoritesProvider>
              <Routes>
                <Route
                  path="/"
                  element={
                    <Layout>
                      <Home />
                    </Layout>
                  }
                />
                <Route
                  exact
                  path="/privacy-policy"
                  element={
                    <Layout>
                      <PrivacyPolicy />
                    </Layout>
                  }
                />
                <Route
                  exact
                  path="/terms-and-conditions"
                  element={
                    <Layout>
                      <TermsAndConditions />
                    </Layout>
                  }
                />
                <Route
                  path="/support"
                  element={
                    <Layout>
                      <Support />
                    </Layout>
                  }
                />
                <Route
                  exact
                  path="/products"
                  element={
                    <Layout>
                      <Products />
                    </Layout>
                  }
                />
                <Route
                  exact
                  path="/products/:id"
                  element={
                    <Layout>
                      <Product />
                    </Layout>
                  }
                />
                <Route
                  path="/cart"
                  element={
                    <Layout>
                      <Cart />
                    </Layout>
                  }
                />
                <Route
                  path="/favorites"
                  element={
                    <Layout>
                      <Favorites />
                    </Layout>
                  }
                />
                <Route
                  path="/service-order"
                  element={
                    <Layout>
                      <ServiceOrder />
                    </Layout>
                  }
                />
                <Route
                  path="/checkout"
                  element={
                    <ProtectedRoute
                      allowedRoles={[
                        "admin",
                        "manager",
                        "technician",
                        "client",
                      ]}
                    >
                      <Layout>
                        <Checkout />
                      </Layout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/order-status"
                  element={
                    <Layout>
                      <OrderStatus />
                    </Layout>
                  }
                />
                <Route
                  path="/btu-calculator"
                  element={
                    <Layout>
                      <BtuCalculatorPage />
                    </Layout>
                  }
                />
                <Route
                  path="/plans"
                  element={
                    <Layout>
                      <Plans />
                    </Layout>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute
                      allowedRoles={[
                        "admin",
                        "manager",
                        "technician",
                        "client",
                      ]}
                    >
                      <Layout>
                        <ProfileLayout />
                      </Layout>
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<AccountOverview />} />
                  <Route path="orders" element={<OrdersPage />} />
                  <Route path="addresses" element={<AddressesPage />} />
                  <Route path="security" element={<Security />} />
                  {/* Add other profile sub-routes here */}
                </Route>
                <Route path="*" element={<h1>Not Found</h1>} />
                <Route exact path="/login" element={<Login login={login} />} />
                <Route exact path="/register" element={<Register />} />
                <Route exact path="/signup" element={<Signup />} />
                <Route
                  exact
                  path="/forgot-password"
                  element={<ForgotPassword />}
                />
                <Route
                  exact
                  path="/reset-password/:token"
                  element={<ResetPassword />}
                />
                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute
                      allowedRoles={["admin", "manager", "technician"]}
                    >
                      <DashboardLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route
                    index
                    element={
                      <ProtectedRoute
                        allowedRoles={["admin", "manager", "technician"]}
                      >
                        <AdminHome />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="products"
                    element={
                      <ProtectedRoute allowedRoles={["admin", "manager"]}>
                        <ProductDashboard />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="orders"
                    element={
                      <ProtectedRoute allowedRoles={["admin", "manager"]}>
                        <AdminOrders />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="orders/:id"
                    element={
                      <ProtectedRoute allowedRoles={["admin", "manager"]}>
                        <AdminOrderDetail />
                      </ProtectedRoute>
                    }
                  />

                  <Route
                    path="service-orders"
                    element={
                      <ProtectedRoute
                        allowedRoles={["admin", "manager", "technician"]}
                      >
                        <ServiceOrders />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="service-orders/:id"
                    element={
                      <ProtectedRoute
                        allowedRoles={["admin", "manager", "technician"]}
                      >
                        <ServiceOrderDetail />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="customers"
                    element={
                      <ProtectedRoute allowedRoles={["admin", "manager"]}>
                        <Customers />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="pos"
                    element={
                      <ProtectedRoute allowedRoles={["admin", "manager"]}>
                        <POS />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="inventory"
                    element={
                      <ProtectedRoute allowedRoles={["admin", "manager"]}>
                        <Inventory />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="settings"
                    element={
                      <ProtectedRoute allowedRoles={["admin", "manager"]}>
                        <Settings />
                      </ProtectedRoute>
                    }
                  />
                </Route>
              </Routes>
            </FavoritesProvider>
          </CartProvider>
        </BrowserRouter>
      </motion.div>
  );
};

export default App;
