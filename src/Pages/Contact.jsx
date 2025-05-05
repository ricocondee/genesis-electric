import ContactStyles from "../styles/Contact.module.css";
import Model from "../assets/model2.png"; 
import Form from "../components/Form";
import ServiceOrderButton from "../components/ServiceOrderButton";

const Contact = () => {

  return (
    <section className={ContactStyles.container} id="contact">
      <div className={ContactStyles.call__to__action__container}>
        <strong>Empieza solicitando tu visita</strong>
        <p>¡Somos el principo a la soluci&oacute;n de tus problemas!</p>
        <strong>Especialistas en soluciones</strong>
      </div>
      <img src={Model} alt="T&eacute;cnico apuntando a tu derecha" />
      <Form />
      <ServiceOrderButton/>
    </section>
  );
};

export default Contact;
