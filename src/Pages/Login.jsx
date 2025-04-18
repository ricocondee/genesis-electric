import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LoginStyles from "../Styles/Login.module.css";
import AirTech from "../assets/airtech.png";
import { TbAlertCircle } from "react-icons/tb";

const Login = ({ setToken }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        formData
      );

      if (!res.data.token) {
        throw new Error("No token received");
      }
      localStorage.setItem("token", res.data.token);
      setToken(res.data.token);
      navigate("/dashboard");
    } catch (err) {
        setError(err.response?.data?.message || err.message || "Login failed");
      }
  };

  return (
    <div className={LoginStyles.container}>
      <div className={LoginStyles.form__container}>
        <div className={LoginStyles.background__container}>
          <img src={AirTech} alt="Background" />
        </div>
        <form className={LoginStyles.form} onSubmit={handleSubmit}>
          <h2>Login</h2>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            onChange={handleChange}
            required
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={handleChange}
            required
          />
          <div className={LoginStyles.alert__message}>
            {error && <TbAlertCircle />}
            {error && <p>{error}</p>}
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
