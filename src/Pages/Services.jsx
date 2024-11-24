import { TbTool, TbShoppingCart, TbPaint, TbHammer } from "react-icons/tb";
import ServicesStyles from "../styles/Services.module.css";

const Services = () => {
  return (
    <section className={ServicesStyles.container} id="services" >
      <h2>Nuestros Servicios</h2>
      <div className={ServicesStyles.services__cards}>
        <div className={ServicesStyles.card}>
          <TbPaint />
          <strong>Mantenimiento</strong>
        </div>
        <div className={ServicesStyles.card}>
          <TbTool />
          <strong>Reparacion</strong>
        </div>
        <div className={ServicesStyles.card}>
          <TbHammer />
          <strong>Instalacion</strong>
        </div>
        <div className={ServicesStyles.card}>
          <TbShoppingCart />
          <strong>Venta</strong>
        </div>
      </div>
      <div className={ServicesStyles.p__container}>
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
