import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axiosInstance from "../api/axios";
import { showToast } from "../utils/toast";
import logo from "../assets/logo.png";
import styles from "../styles/Login.module.css";

const Login = ({ login }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axiosInstance.post(
        `/auth/login`,
        formData
      );

      if (!res.data.accessToken) {
        throw new Error("No token received");
      }

      login(res.data.accessToken);
      navigate("/admin");
    } catch (err) {
      showToast(err.response?.data?.message || err.message || "Login failed", "error");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <img src={logo} alt="Logo" className={styles.logo} />
        <div className={styles.textContainer}>
          <h2>¡Bienvenido de nuevo!</h2>
          <p>Inicia sesión para continuar</p>
        </div>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
            className={styles.input}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
            className={styles.input}
          />
          <button type="submit" className={styles.button}>
            Login
          </button>
          <div className={styles.linksContainer}>
            <Link to="/forgot-password">¿Olvidaste tu contraseña?</Link>
          </div>
        </form>
      </div>
      <footer className={styles.footer}>
        <p>&copy; 2025 Genesis Electric S.A.S</p>
      </footer>
    </div>
  );
};

export default Login;