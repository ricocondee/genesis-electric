import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../layout/Layout";
import Home from "../Pages/Home";
import PrivacyPolicy from "../Pages/PrivacyPolicy";

const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route exact path="/privacy-policy" element={<PrivacyPolicy/>} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;