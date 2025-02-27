import HomeStyles from "../styles/Home.module.css";
import Model from "../assets/model.png";
import About from "./About";
import Services from "./Services";
import Contact from "./Contact";
import MyLink from "../components/MyLink";
import CookieCons from "../components/CookieConsent"
import { TbBrandWhatsapp } from "react-icons/tb";
import Reviews from "../components/Reviews";
import {motion} from "framer-motion";

const Home = () => {
  return (
    <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} transition={{duration: 1.5}}>
    <article id="home">
      <section className={HomeStyles.container}>
        <div className={HomeStyles.text__container}>
          <div className={HomeStyles.title}>
            <h1 translate="no">G&eacute;nesis Electric</h1>
            <strong>Somos calidad en Servicios de refrigeraci&oacute;n</strong>
          </div>
          <p>
            El calor de Barranquilla ya no ser&aacute; un problema. Brindamos servicio de instalaci&oacute;n, mantenimiento y venta de aires
            acondicionados.
          </p>
          <div><MyLink text="Whatsapp" url="https://api.whatsapp.com/send?phone=573005515224" icon={<TbBrandWhatsapp/>}/></div>
        </div>
        <div className={HomeStyles.image__container}>
          <div className={HomeStyles.image__background}>
            <img src={Model} alt="Tecnico posando con brazos cruzados" />
          </div>
        </div>
      </section>
      <About />
      <Services />
      <Reviews layout='carousel'/>
      <Contact />
      <CookieCons/>
    </article>
    </motion.div>
  );
};

export default Home;
