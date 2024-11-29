import {useState} from "react";
import emailjs from "emailjs-com";
import Success from "./Success"
import ContactStyles from "../styles/Contact.module.css"

const Form = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const send = (e) => { 
    e.preventDefault();

    const serviceID = import.meta.env.VITE_SERVICE_ID;
    const templateID = import.meta.env.VITE_TEMPLATE_ID;
    const userID = import.meta.env.VITE_PUBLIC_KEY;

    const templateParams = {
      name: e.target.name.value,
      email: e.target.email.value,
      phone: e.target.phone.value,
      address: e.target.address.value,
      message: e.target.message.value
    }

    emailjs.send(serviceID, templateID, templateParams, userID)
      .then((result) => {
        setName("");
        setEmail("");
        setPhone("");
        setAddress("");
        setMessage("");
      }, (error) => {
        console.log(error.text);
      });
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
  }

  return (
    <div className={ContactStyles.form__container}>
        {success && <Success />}
        <form onSubmit={send}>
            <h2>Cont&aacute;ctanos</h2>
            <input type="text" id="name" name="name" placeholder="Nombre" value={name} onChange={(e) => setName(e.target.value)} />
            <input type="email" id="email" name="email" placeholder="Correo electr&oacute;nico" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="tel" id="phone" name="phone" placeholder="Tel&eacute;fono" value={phone} onChange={(e) => setPhone(e.target.value)} />
            <input type="text" id="address" name="address" placeholder="Direcci&oacute;n" value={address} onChange={(e) => setAddress(e.target.value)}/>
            <textarea id="message" name="message" placeholder="Describe brevemente tu problema" value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
            <button type="submit">Enviar</button>
        </form>
      </div>
  )
}

export default Form