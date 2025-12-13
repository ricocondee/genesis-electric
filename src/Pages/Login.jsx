import { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import axiosInstance from "../api/axios";
import { showToast } from "../utils/toast";
import { useUser } from "../context/UserContext";
import logo from "../assets/logo.png";
import styles from "../styles/Login.module.css";

const Login = ({ login }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useUser();

  const from = location.state?.from || "/"; // Default to home page for clients

  useEffect(() => {
    // If user is already logged in and on the login page, redirect them based on their role
    if (user && location.pathname === '/login') {
      if (user.role === 'admin' || user.role === 'manager' || user.role === 'technician') {
        navigate("/admin", { replace: true });
      } else if (user.role === 'client') {
        navigate(from, { replace: true });
      }
    }
  }, [user, navigate, from, location]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous errors

    try {
      const res = await axiosInstance.post(
        `/auth/login`,
        formData
      );

      if (!res.data.accessToken) {
        throw new Error("No token received");
      }

      login(res.data.accessToken);
      // Redirection will be handled by the useEffect after user context is updated
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || "Login failed";
      setError(errorMessage);
      showToast(errorMessage, "error");
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
          {error && <p className={styles.error}>{error}</p>}
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
            <Link to="/signup">¿No tienes una cuenta? Regístrate</Link>
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