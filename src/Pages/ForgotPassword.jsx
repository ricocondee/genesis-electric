import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/ForgotPassword.module.css';
import { showToast } from '../utils/toast';
import axiosInstance from '../api/axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      await axiosInstance.post('/auth/forgot-password', { email });
      setMessage('Si existe una cuenta con ese correo, se ha enviado un enlace para restablecer la contraseña.');
      showToast('Correo enviado', 'success');
    } catch (error) {
      // Even if the email doesn't exist, you might not want to reveal that.
      // It's often better to show a generic success message to prevent user enumeration.
      setMessage('Si existe una cuenta con ese correo, se ha enviado un enlace para restablecer la contraseña.');
      showToast('Error al enviar el correo', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <h2 className={styles.title}>Restablecer Contraseña</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formField}>
            <label className={styles.label}>Correo Electrónico</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Correo Electrónico"
              required
              className={styles.inputField}
            />
          </div>
          <div className={styles.buttonContainer}>
            <button type="submit" className={styles.submitButton} disabled={loading}>
              {loading ? 'Enviando...' : 'Enviar Enlace'}
            </button>
          </div>
          {message && <p className={styles.successMessage}>{message}</p>}
        </form>
        <div className={styles.linksContainer}>
          <Link to="/login">Volver a Iniciar Sesión</Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
