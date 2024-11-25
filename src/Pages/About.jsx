import AboutStyles from "../styles/About.module.css";
import Tech from "../assets/tech2.png";
import { TbBuildingFactory, TbHome } from "react-icons/tb";
import CEO from "../assets/ceo.png";

const About = () => {
  return (
    <section className={AboutStyles.container} id="about">
      <div className={AboutStyles.image__container}>
        <img src={Tech} alt=""  className={AboutStyles.tech}/>
      </div>
      <div className={AboutStyles.text__container}>
        <h2 translate="no" >Somos G&eacute;nesis Electric</h2>
        <strong>El principio de la soluci&oacute;n de climatizaci&oacute;n</strong>
        <p className={AboutStyles.highlighted}>Tu hogar o negocio en las mejores manos.</p>
        <p className={AboutStyles.mission}>
          Buscamos que nuestros clientes est&eacute;n satisfechos con cada trabajo que
          realizamos y trabajamos para garantizar que se cumplan todas sus
          necesidades.
        </p>
        <div className={AboutStyles.icons}>
          <TbBuildingFactory />
          <span>Servicio Industrial</span>
          <TbHome />
          <span>Servicio Residencial</span>
        </div>
        <div className={AboutStyles.profile}>
          <img
            className={AboutStyles.ceo}
            src={CEO}
            alt="Fundador Wilson Nu&ntilde;ez"
          />
          <div className={AboutStyles.profile__text}>
            <strong>Wilson Nu&ntilde;ez</strong>
            <p>Director y Fundador</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
