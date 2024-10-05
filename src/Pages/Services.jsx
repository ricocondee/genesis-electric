import Services_Styles from "../Styles/Services.module.css";
import Service1 from "../assets/service1.svg";
import Service2 from "../assets/service2.svg";
import Service3 from "../assets/service3.svg";
import Service4 from "../assets/service4.svg";

const Services = () => {
  return (
    <section className={Services_Styles.container}>
      <h2>Nuestros Servicios</h2>
      <div className={Services_Styles.services__cards}>
        <div className={Services_Styles.card}>
          <img src={Service1} alt="" />
          <strong>Mantenimiento</strong>
        </div>
        <div className={Services_Styles.card}>
          <img src={Service2} alt="" />
          <strong>Reparacion</strong>
        </div>
        <div className={Services_Styles.card}>
          <img src={Service3} alt="" />
          <strong>Instalacion</strong>
        </div>
        <div className={Services_Styles.card}>
          <img src={Service4} alt="" />
          <strong>Venta</strong>
        </div>
      </div>
      <div className={Services_Styles.p__container}>
        <p>
          Ofrecemos una gama completa de servicios para satisfacer todas tus
          necesidades de aire acondicionado. Nuestro equipo de t&eacute;cnicos
          certificados est&aacute; preparado para brindarte el mejor servicio.
        </p>
      </div>
    </section>
  );
};

export default Services;
