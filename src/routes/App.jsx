import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../layout/Layout";
import { useState } from "react";
import Home from "../Pages/Home";
import PrivacyPolicy from "../Pages/PrivacyPolicy";
import Products from "../Pages/Products";
import ScrollToSection from "../components/ScrollToSection";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Dashboard from "../Pages/Dashboard";
import { Navigate } from "react-router-dom";
import {motion} from "framer-motion";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  return (
    <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} transition={{duration: 1.5}}>
    <BrowserRouter>
    <ScrollToSection />
      <Layout>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route exact path="/privacy-policy" element={<PrivacyPolicy/>} />
          <Route exact path="/products" element={<Products />} />
          <Route path="*" element={<h1>Not Found</h1>} />
          <Route exact path="/login" element={<Login setToken={setToken}/>} />
          <Route exact path="/register" element={<Register/>} />
          <Route exact path="/dashboard" element={token ? <Dashboard /> : <Navigate to="/login"/>} />
        </Routes>
      </Layout>
    </BrowserRouter>
    </motion.div>
  );
};

export default App;