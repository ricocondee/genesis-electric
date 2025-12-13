import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../styles/Login.module.css'; // Reusing login styles for now
import { showToast } from '../utils/toast';
import axiosInstance from '../api/axios';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    lastname: '',
    email: '',
    password: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await axiosInstance.post('/auth/register', formData);
      showToast('Registro exitoso. Por favor, inicia sesión.', 'success');
      navigate('/login');
    } catch (error) {
      showToast(error.response?.data?.message || 'Error en el registro', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>¡Únete a Génesis Electric!</h2>
        <p className={styles.subtitle}>Crea tu cuenta para acceder a nuestros servicios.</p>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Nombre" required className={styles.input} />
          <input type="text" name="lastname" value={formData.lastname} onChange={handleChange} placeholder="Apellido" required className={styles.input} />
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Correo Electrónico" required className={styles.input} />
          <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Contraseña" required className={styles.input} />
          <button type="submit" className={styles.button} disabled={isSubmitting}>
            {isSubmitting ? 'Registrando...' : 'Registrarse'}
          </button>
        </form>
        <div className={styles.linksContainer}>
          <Link to="/login">¿Ya tienes una cuenta? Inicia Sesión</Link>
        </div>
      </div>
      <footer className={styles.footer}>
        <p>&copy; 2025 Genesis Electric S.A.S</p>
      </footer>
    </div>
  );
};

export default Signup;
