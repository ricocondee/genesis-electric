import About_Styles from "../styles/About.module.css";
import Model3 from "../assets/model3.png";
import Model4 from "../assets/model4.png";
import Model5 from "../assets/model5.png";
import Industrial from "../assets/industrial.svg";
import Residential from "../assets/residential.svg";
import CEO from "../assets/ceo.png";

const About = () => {
  return (
    <section className={About_Styles.container}>
      <div className={About_Styles.image__container}>
        <img
          src={Model3}
          className={About_Styles.model3}
          alt="T&eacute;cnico revisando una nevera"
        />
        <img
          src={Model4}
          className={About_Styles.model4}
          alt="T&eacute;cnico reparando una unidad de aire acondicionado"
        />
        <img
          src={Model5}
          className={About_Styles.model5}
          alt="T&eacute;cnico lavando un aire acondicionado"
        />
      </div>
      <div className={About_Styles.text__container}>
        <h2>Somos G&eacute;nesis Electric</h2>
        <strong>El principio de la soluci&oacute;n de climatizaci&oacute;n</strong>
        <p className={About_Styles.highlighted}>Tu hogar o negocio en las mejores manos.</p>
        <p className={About_Styles.mission}>
          Buscamos que nuestros clientes est&eacute;n satisfechos con cada trabajo que
          realizamos y trabajamos para garantizar que se cumplan todas sus
          necesidades.
        </p>
        <div className={About_Styles.icons}>
          <img src={Industrial} alt="Icono de industria" />
          <span>Servicio Industrial</span>
          <img src={Residential} alt="Icono de casa" />
          <span>Servicio Residencial</span>
        </div>
        <div className={About_Styles.profile}>
          <img
            className={About_Styles.ceo}
            src={CEO}
            alt="Fundador Wilson Nu&ntilde;ez"
          />
          <div className={About_Styles.profile__text}>
            <span>Wilson Nu&ntilde;ez</span>
            <p>Director y Fundador</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
