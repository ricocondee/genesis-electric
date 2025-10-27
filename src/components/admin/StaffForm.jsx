import React, { useState, useEffect } from 'react';
import styles from '../../styles/admin/ProductForm.module.css';
import { X } from 'lucide-react';

const StaffForm = ({ onSave, staffMember, onClose }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'technician',
  });

  useEffect(() => {
    if (staffMember) {
      setFormData({
        email: staffMember.email,
        role: staffMember.role,
        password: '' // Password should not be pre-filled
      });
    } else {
      setFormData({
        email: '',
        password: '',
        role: 'technician',
      });
    }
  }, [staffMember]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <button onClick={onClose} className={styles.closeButton}><X size={24} /></button>
        <h2 className={styles.title}>{staffMember ? 'Editar Miembro del Personal' : 'Agregar Miembro del Personal'}</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGrid}>
            <div className={styles.formField}>
              <label className={styles.label}>Correo Electrónico</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Correo Electrónico" required className={styles.inputField} />
            </div>
            <div className={styles.formField}>
              <label className={styles.label}>Contraseña</label>
              <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder={staffMember ? 'Dejar en blanco para no cambiar' : 'Contraseña'} required={!staffMember} className={styles.inputField} />
            </div>
            <div className={styles.formField}>
              <label className={styles.label}>Rol</label>
              <select name="role" value={formData.role} onChange={handleChange} className={styles.inputField}>
                <option value="technician">Técnico</option>
                <option value="manager">Gerente</option>
                <option value="admin">Administrador</option>
              </select>
            </div>
          </div>
          <div className={styles.buttonContainer}>
            <button type="button" onClick={onClose} className={styles.cancelButton}>Cancelar</button>
            <button type="submit" className={styles.submitButton}>Guardar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StaffForm;
