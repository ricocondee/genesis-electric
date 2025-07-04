import FooterStyles from "../styles/Footer.module.css";
import Logo from "../assets/logo_footer.png";
import {
  TbBrandFacebook,
  TbBrandInstagram,
  TbBrandWhatsapp,
  TbBrandLinkedin,
  TbHome,
  TbClock,
} from "react-icons/tb";
import Reviews from "./Reviews";

const today = new Date();
const year = today.getFullYear();

const Footer = () => {
  return (
    <footer className={FooterStyles.footer}>
      <div className={FooterStyles.footer__container}>
        <div className={FooterStyles.footer__content}>
          <div className={FooterStyles.footer__items}>
            <img src={Logo} alt="Logo" />
            <div className={FooterStyles.social__media}>
              <a
                href="https://www.facebook.com/profile.php?id=100089745155648"
                target="blank"
              >
                <TbBrandFacebook />
              </a>
              <a
                href="https://www.instagram.com/genesiselectricsas/"
                target="blank"
              >
                <TbBrandInstagram />
              </a>
              <a
                href="https://api.whatsapp.com/send?phone=573005515224"
                target="blank"
              >
                <TbBrandWhatsapp />
              </a>
              <a
                href="https://www.linkedin.com/company/genesiselectricsas/"
                target="blank"
              >
                <TbBrandLinkedin />
              </a>
            </div>
            <p>
              Mantenimiento, reparaci&oacute;n, instalaci&oacute;n y venta de
              aires acondicionados. Somos G&eacute;nesis Electric, el principio
              de la soluci&oacute;n de climatizaci&oacute;n en tu hogar o
              negocio.
            </p>
          </div>
          <div className={FooterStyles.footer__items}>
            <h3>Navegaci&oacute;n r&aacute;pida</h3>
            <nav>
              <ul>
                <li>
                  <a href="/">Inicio</a>
                </li>
                <li>
                  <a href="/#about">Nosotros</a>
                </li>
                <li>
                  <a href="/#services">Servicios</a>
                </li>
                <li>
                  <a href="/#contact">Contacto</a>
                </li>
              </ul>
            </nav>
          </div>
          <div className={FooterStyles.footer__items}>
            <h3>Ubicaci&oacute;n</h3>
            <div className={FooterStyles.address}>
              <TbHome />
              <a href="https://maps.app.goo.gl/WFEkHxTJoMzssAVK6" target="blank">
                <span>Calle 45 #7H-16. Barranquilla, Atlántico.</span>
              </a>
            </div>
            <div className={FooterStyles.service__hours}>
              <TbClock />
              <span>Lunes a viernes: 8:00 am - 6:00 pm</span>
              <span className={FooterStyles.saturday}>
                Sábados: 8:00 am - 12:00 pm
              </span>
            </div>
          </div>
          <div className={FooterStyles.footer__items}>
            <h3>Contacto</h3>
            <div className={FooterStyles.contact}>
              <span>
                Telefono: <a href="tel:+573005515224">+57 300 5515224</a>
              </span>
              <span>
                Correo:
                <a href="mailto:contacto@genesiselectricsas.com">
                  contacto@genesiselectricsas.com
                </a>
              </span>
            </div>
            <Reviews layout="badge" />
          </div>
          <div className={FooterStyles.footer__info}>
            <p>
              &copy; {year} Génesis Electric SAS. Developed by
              <a href="https://www.ricocondee.dev/" target="_blank">
                {" "}
                @ricocondee
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
