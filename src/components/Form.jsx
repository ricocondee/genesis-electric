import {useState} from "react";
import { showToast } from "../utils/toast";
import ContactStyles from "../styles/Contact.module.css"
import axiosInstance from "../api/axios";

const Form = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [inquiry, setInquiry] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      name,
      email,
      phone,
      address,
      inquiry
    };

    try {
      const response = await axiosInstance.post('/contact', formData);
      if (response.status === 200) {
        setName("");
        setEmail("");
        setPhone("");
        setAddress("");
        setInquiry("");
        showToast("Mensaje enviado con éxito", "success");
      }
    } catch (error) {
      showToast("Error al enviar el mensaje", "error");
    }
  }

  return (
    <div className={ContactStyles.form__container}>
        <form onSubmit={handleSubmit}>
            <h2>Cont&aacute;ctanos</h2>
            <input type="text" id="name" name="name" placeholder="Nombre" value={name} onChange={(e) => setName(e.target.value)} />
            <input type="email" id="email" name="email" placeholder="Correo electr&oacute;nico" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="tel" id="phone" name="phone" placeholder="Tel&eacute;fono" value={phone} onChange={(e) => setPhone(e.target.value)} />
            <input type="text" id="address" name="address" placeholder="Direcci&oacute;n" value={address} onChange={(e) => setAddress(e.target.value)}/>
            <textarea id="inquiry" name="inquiry" placeholder="Describe brevemente tu problema" value={inquiry} onChange={(e) => setInquiry(e.target.value)}></textarea>
            <button type="submit">Enviar</button>
        </form>
      </div>
  )
}

export default Form