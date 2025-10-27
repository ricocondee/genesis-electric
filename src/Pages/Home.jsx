import HomeStyles from "../styles/Home.module.css";
import About from "./About";
import Services from "./Services";
import Contact from "./Contact";
import HeroSlider from "../components/HeroSlider";
import ProductCarousel from "../components/ProductCarousel";
import CookieCons from "../components/CookieConsent"
import ClientCarousel from "../components/ClientCarousel";
import Reviews from "../components/Reviews";

const Home = () => {
  return (
    <article id="home">
      <HeroSlider />
      <ProductCarousel />
      <About />
      <Services />
      <ClientCarousel />
      <Reviews layout='carousel'/>
      <Contact />
      <CookieCons/>
    </article>
  );
};

export default Home;
