import About_Styles from "../styles/About.module.css";
import Tech from "../assets/tech2.png";
import { TbBuildingFactory, TbHome } from "react-icons/tb";
import CEO from "../assets/ceo.png";

const About = () => {
  return (
    <section className={About_Styles.container} id="about">
      <div className={About_Styles.image__container}>
        <img src={Tech} alt=""  className={About_Styles.tech}/>
      </div>
      <div className={About_Styles.text__container}>
        <h2 translate="no" >Somos G&eacute;nesis Electric</h2>
        <strong>El principio de la soluci&oacute;n de climatizaci&oacute;n</strong>
        <p className={About_Styles.highlighted}>Tu hogar o negocio en las mejores manos.</p>
        <p className={About_Styles.mission}>
          Buscamos que nuestros clientes est&eacute;n satisfechos con cada trabajo que
          realizamos y trabajamos para garantizar que se cumplan todas sus
          necesidades.
        </p>
        <div className={About_Styles.icons}>
          <TbBuildingFactory />
          <span>Servicio Industrial</span>
          <TbHome />
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
