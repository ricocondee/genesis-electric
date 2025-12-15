import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from '../styles/ResetPassword.module.css';
import { showToast } from '../utils/toast';
import axiosInstance from '../api/axios';

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await axiosInstance.post(`/auth/reset-password/${token}`, { password });
      showToast('Contraseña actualizada exitosamente', 'success');
      navigate('/login');
    } catch (error) {
      setError('El enlace es inválido o ha expirado.');
      showToast('Error al restablecer la contraseña', 'error');
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
            <label className={styles.label}>Nueva Contraseña</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Nueva Contraseña"
              required
              className={styles.inputField}
            />
          </div>
          <div className={styles.formField}>
            <label className={styles.label}>Confirmar Contraseña</label>
            <input
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirmar Contraseña"
              required
              className={styles.inputField}
            />
          </div>
          {error && <p className={styles.errorMessage}>{error}</p>}
          <div className={styles.buttonContainer}>
            <button type="submit" className={styles.submitButton} disabled={loading}>
              {loading ? 'Restableciendo...' : 'Restablecer Contraseña'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
