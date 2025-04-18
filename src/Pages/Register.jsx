import { useState } from "react";
import { register } from "../services/authService";
import RegisterStyles from "../styles/Register.module.css";
import AirUnit from "../assets/airunit.png";
import { TbAlertCircle } from "react-icons/tb";

const Register = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    const tokeni = localStorage.getItem("token");
    e.preventDefault();
    try {
      const res = await register(formData, tokeni);
      setMessage(res.message);
    } catch (error) {
      setMessage(error.message || "Error registering");
    }
  };

  return (
    <div className={RegisterStyles.container}>
      <div className={RegisterStyles.form__container}>
        <div className={RegisterStyles.background__container}>
            <img src={AirUnit} alt="Air Unit" />
        </div>
        <form onSubmit={handleSubmit} className={RegisterStyles.form}>
          <h2>Register</h2>
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />
          <div className={RegisterStyles.alert__message}>{message &&<TbAlertCircle/>}{message && <p>{message}</p>}</div>
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
