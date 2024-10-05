import Contact_Styles from "../styles/Contact.module.css";
import Model from "../assets/model2.png"; 

const Contact = () => {
  return (
    <section className={Contact_Styles.container}>
      <div className={Contact_Styles.call__to__action__container}>
        <strong>Empieza solicitando tu visita</strong>
        <p>¡El principo a la soluci&oacute;n de tus problemas!</p>
        <strong>Especialistas en soluciones</strong>
      </div>
      <img src={Model} alt="T&eacute;cnico apuntando a tu derecha" />
      <div className={Contact_Styles.form__container}>
        <form action="/post">
            <label htmlFor="name">Nombre</label>
            <input type="text" id="name" name="name" />
            <label htmlFor="email">Correo electr&oacute;nico</label>
            <input type="email" id="email" name="email" />
            <label htmlFor="phone">Tel&eacute;fono</label>
            <input type="tel" id="phone" name="phone" />
            <label htmlFor="message">Mensaje</label>
            <textarea id="message" name="message"></textarea>
            <button type="submit">Enviar</button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
