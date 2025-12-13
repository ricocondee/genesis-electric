import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import styles from '../styles/AccountOverview.module.css';
import { showToast } from '../utils/toast';
import axiosInstance from '../api/axios';

const AccountOverview = () => {
  const { user, setUser } = useUser();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    nationalId: '',
    phone: '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        nationalId: user.nationalId || '',
        phone: user.phone || '',
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.patch('/auth/profile', formData);
      setUser(response.data.data);
      showToast('Perfil actualizado exitosamente', 'success');
    } catch (error) {
      showToast('Error al actualizar el perfil', 'error');
    }
  };

  if (!user) {
    return <div>Cargando...</div>;
  }

  return (
    <div className={styles.container}>
      <h2>Mi Perfil</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="name">Nombre</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="email">Correo Electrónico</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="nationalId">Cédula/NIT</label>
          <input
            type="text"
            id="nationalId"
            name="nationalId"
            value={formData.nationalId}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="phone">Teléfono</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className={styles.submitButton}>Guardar Cambios</button>
      </form>
      <div className={styles.securityLink}>
        <Link to="/profile/security">Configuración de Seguridad</Link>
      </div>
    </div>
  );
};

export default AccountOverview;
