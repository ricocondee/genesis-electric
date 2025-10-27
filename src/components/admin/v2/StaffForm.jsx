import React, { useState, useEffect } from 'react';
import styles from '../../../styles/admin/v2/ProductForm.module.css';
import { X } from 'lucide-react';

const StaffForm = ({ onSave, staffMember, onClose }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'technician',
    name: '',
    lastname: '',
    dob: '',
    nationalId: '',
  });
  const [dobError, setDobError] = useState('');

  useEffect(() => {
    if (staffMember) {
      setFormData({
        email: staffMember.email,
        role: staffMember.role,
        name: staffMember.name || '',
        lastname: staffMember.lastname || '',
        dob: staffMember.dob ? new Date(staffMember.dob).toISOString().split('T')[0] : '',
        nationalId: staffMember.nationalId || '',
        password: '' // Password should not be pre-filled
      });
    } else {
      setFormData({
        email: '',
        password: '',
        role: 'technician',
        name: '',
        lastname: '',
        dob: '',
        nationalId: '',
      });
    }
  }, [staffMember]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'dob') {
      const today = new Date();
      const birthDate = new Date(value);
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      if (age < 18) {
        setDobError('El usuario debe ser mayor de 18 años.');
      } else {
        setDobError('');
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (dobError) {
      return;
    }
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
              <label className={styles.label}>Nombre</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Nombre" className={styles.inputField} />
            </div>
            <div className={styles.formField}>
              <label className={styles.label}>Apellido</label>
              <input type="text" name="lastname" value={formData.lastname} onChange={handleChange} placeholder="Apellido" className={styles.inputField} />
            </div>
            <div className={styles.formField}>
              <label className={styles.label}>Correo Electrónico</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Correo Electrónico" required className={styles.inputField} />
            </div>
            <div className={styles.formField}>
              <label className={styles.label}>Contraseña</label>
              <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder={staffMember ? 'Dejar en blanco para no cambiar' : 'Contraseña'} required={!staffMember} className={styles.inputField} />
            </div>
            <div className={styles.formField}>
              <label className={styles.label}>Fecha de Nacimiento</label>
              <input type="date" name="dob" value={formData.dob} onChange={handleChange} className={styles.inputField} />
              {dobError && <span className={styles.error}>{dobError}</span>}
            </div>
            <div className={styles.formField}>
              <label className={styles.label}>Cédula</label>
              <input type="text" name="nationalId" value={formData.nationalId} onChange={handleChange} placeholder="Cédula" className={styles.inputField} />
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
            <button type="submit" className={styles.submitButton} disabled={dobError}>Guardar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StaffForm;
