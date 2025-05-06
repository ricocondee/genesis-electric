import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { TbAlertCircle } from "react-icons/tb";
import loginIllustration from "../assets/loginIllustration.svg";
import styles from "../styles/Login.module.css";

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
        `/api/auth/login`,
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
    <div className={styles.container}>
      <div className={styles.card}>
        <img src={loginIllustration} alt="Login" className={styles.illustration} />
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
          {error && (
            <div className={styles.errorMessage}>
              <TbAlertCircle className={styles.errorIcon} />
              <p>{error}</p>
            </div>
          )}
          <button type="submit" className={styles.button}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;