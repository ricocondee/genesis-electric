import Home_Styles from "../styles/Home.module.css";
import Model from "../assets/model.png";
import Client1 from "../assets/client1.png";
import Client2 from "../assets/client2.png";
import Client3 from "../assets/client3.png";
import Client4 from "../assets/client4.png";
import About from "./About";
import Services from "./Services";
import Contact from "./Contact";

const Home = () => {
  return (
    <article>
      <section className={Home_Styles.container}>
        <div className={Home_Styles.text__container}>
          <div className={Home_Styles.title}>
            <h1>G&eacute;nesis Electric</h1>
            <strong>Somos calidad en Servicios de refrigeraci&oacute;n</strong>
          </div>
          <p>
            No est&eacute;s pasando calores, escogenos y soluciona ese problema.
            Servicio de instalaci&oacute;n, mantenimiento y venta de aires
            acondicionados.
          </p>
          <button className={Home_Styles.button}>Pide tu visita</button>
        </div>
        <div className={Home_Styles.image__container}>
          <img src={Model} alt="Tecnico posando con brazos cruzados" />
        </div>
        <div className={Home_Styles.client__container}>
          <div className={Home_Styles.client__title}>
            <h2>Ellos conf&iacute;an</h2>
          </div>
          <div className={Home_Styles.client__logos}>
            <img src={Client1} alt="" />
            <img src={Client2} alt="" />
            <img src={Client3} alt="" />
            <img src={Client4} alt="" />
          </div>
        </div>
      </section>
      <About />
      <Services />
      <Contact />
    </article>
  );
};

export default Home;
