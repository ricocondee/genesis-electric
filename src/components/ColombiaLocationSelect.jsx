import { useState, useEffect } from 'react';
import { colombiaLocations } from '../data/colombiaLocations';
import styles from '../styles/ColombiaLocationSelect.module.css';

const ColombiaLocationSelect = ({ onSelectDepartment, onSelectCity, selectedDepartment, selectedCity }) => {
  const [departments, setDepartments] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    setDepartments(colombiaLocations.map(location => location.department));
  }, []);

  useEffect(() => {
    if (selectedDepartment) {
      const departmentData = colombiaLocations.find(location => location.department === selectedDepartment);
      setCities(departmentData ? departmentData.cities : []);
    } else {
      setCities([]);
    }
  }, [selectedDepartment]);

  return (
    <div className={styles.locationSelectContainer}>
      <select value={selectedDepartment} onChange={(e) => onSelectDepartment(e.target.value)} className={styles.selectField}>
        <option value="">Selecciona un Departamento</option>
        {departments.map(department => (
          <option key={department} value={department}>{department}</option>
        ))}
      </select>

      <select value={selectedCity} onChange={(e) => onSelectCity(e.target.value)} disabled={!selectedDepartment} className={styles.selectField}>
        <option value="">Selecciona una Ciudad</option>
        {cities.map(city => (
          <option key={city} value={city}>{city}</option>
        ))}
      </select>
    </div>
  );
};

export default ColombiaLocationSelect;
