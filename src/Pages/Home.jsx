import HomeStyles from "../styles/Home.module.css";
import Model from "../assets/model.png";
import About from "./About";
import Services from "./Services";
import Contact from "./Contact";
import Button from "../components/Button";
import CookieCons from "../components/CookieConsent"

const Home = () => {
  return (
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
          <Button text="Contactanos" url="#contact" />
        </div>
        <div className={HomeStyles.image__container}>
          <div className={HomeStyles.image__background}>
            <img src={Model} alt="Tecnico posando con brazos cruzados" />
          </div>
        </div>
      </section>
      <About />
      <Services />
      <Contact />
      <CookieCons/>
    </article>
  );
};

export default Home;
