import { TbTool, TbShoppingCart, TbPaint, TbHammer } from "react-icons/tb";
import Services_Styles from "../Styles/Services.module.css";

const Services = () => {
  return (
    <section className={Services_Styles.container} id="services" >
      <h2>Nuestros Servicios</h2>
      <div className={Services_Styles.services__cards}>
        <div className={Services_Styles.card}>
          <TbPaint />
          <strong>Mantenimiento</strong>
        </div>
        <div className={Services_Styles.card}>
          <TbTool />
          <strong>Reparacion</strong>
        </div>
        <div className={Services_Styles.card}>
          <TbHammer />
          <strong>Instalacion</strong>
        </div>
        <div className={Services_Styles.card}>
          <TbShoppingCart />
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
