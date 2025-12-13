import { useState, useEffect, useCallback } from 'react';
import styles from '../styles/AddressForm.module.css';
import { X } from 'lucide-react';
import ColombiaLocationSelect from './ColombiaLocationSelect';

const AddressForm = ({ address, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    street: '',
    city: '',
    department: '',
    country: 'Colombia',
  });

  useEffect(() => {
    if (address) {
      setFormData({
        street: address.street || '',
        city: address.city || '',
        department: address.department || '',
        country: address.country || 'Colombia',
      });
    }
  }, [address]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectDepartment = useCallback((dept) => {
    setFormData(prev => ({ ...prev, department: dept, city: '' }));
  }, []);

  const handleSelectCity = useCallback((city) => {
    setFormData(prev => ({ ...prev, city }));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button onClick={onClose} className={styles.closeButton}><X size={24} /></button>
        <h2 className={styles.title}>{address ? 'Editar Dirección' : 'Agregar Dirección'}</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="street">Dirección</label>
            <input type="text" id="street" name="street" value={formData.street} onChange={handleChange} required />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="department">Departamento</label>
            <ColombiaLocationSelect
              selectedDepartment={formData.department}
              selectedCity={formData.city}
              onSelectDepartment={handleSelectDepartment}
              onSelectCity={handleSelectCity}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="country">País</label>
            <input type="text" id="country" name="country" value={formData.country} onChange={handleChange} required />
          </div>
          <div className={styles.buttonContainer}>
            <button type="button" onClick={onClose} className={styles.cancelButton}>Cancelar</button>
            <button type="submit" className={styles.submitButton}>Guardar Dirección</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddressForm;