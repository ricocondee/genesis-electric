import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../layout/Layout";
import Home from "../Pages/Home";
import PrivacyPolicy from "../Pages/PrivacyPolicy";
import Products from "../Pages/Products";
import ScrollToSection from "../components/ScrollToSection";

const App = () => {
  return (
    <BrowserRouter>
    <ScrollToSection />
      <Layout>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route exact path="/privacy-policy" element={<PrivacyPolicy/>} />
          <Route exact path="/products" element={<Products />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;