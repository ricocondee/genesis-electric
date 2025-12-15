import { useState, useEffect, useMemo } from 'react';
import { colombiaLocations } from '../data/colombiaLocations';
import styles from '../styles/ColombiaLocationSelect.module.css';

const ColombiaLocationSelect = ({ onSelectDepartment, onSelectCity, selectedDepartment, selectedCity, required = false }) => {
  const [departments, setDepartments] = useState([]);
  const [cities, setCities] = useState([]);

  // Define allowed locations
  const allowedDepartments = useMemo(() => ([
    { department: "Atlántico", cities: [] }, // All cities from Atlántico
    { department: "Magdalena", cities: ["Santa Marta"] },
    { department: "Bolívar", cities: ["Cartagena"] },
  ]), []);

  const filteredColombiaLocations = useMemo(() => {
    return colombiaLocations
      .filter(location => allowedDepartments.some(allowed => allowed.department === location.department))
      .map(location => {
        const allowedDept = allowedDepartments.find(allowed => allowed.department === location.department);
        if (allowedDept && allowedDept.cities.length > 0) {
          // If specific cities are defined for this allowed department, filter them
          return {
            ...location,
            cities: location.cities.filter(city => allowedDept.cities.includes(city))
          };
        }
        return location; // Otherwise, include all cities for the department (e.g., Atlántico)
      });
  }, [allowedDepartments]);

  useEffect(() => {
    setDepartments(filteredColombiaLocations.map(location => location.department));
  }, [filteredColombiaLocations]);

  useEffect(() => {
    if (selectedDepartment) {
      const departmentData = filteredColombiaLocations.find(location => location.department === selectedDepartment);
      setCities(departmentData ? departmentData.cities : []);
    } else {
      setCities([]);
    }
  }, [selectedDepartment, filteredColombiaLocations]);

  return (
    <div className={styles.locationSelectContainer}>
      <select 
        value={selectedDepartment} 
        onChange={(e) => onSelectDepartment(e.target.value)} 
        className={styles.selectField}
        required={required}
      >
        <option value="">Selecciona un Departamento</option>
        {departments.map(department => (
          <option key={department} value={department}>{department}</option>
        ))}
      </select>

      <select 
        value={selectedCity} 
        onChange={(e) => onSelectCity(e.target.value)} 
        disabled={!selectedDepartment} 
        className={styles.selectField}
        required={required}
      >
        <option value="">Selecciona una Ciudad</option>
        {cities.map(city => (
          <option key={city} value={city}>{city}</option>
        ))}
      </select>
    </div>
  );
};

export default ColombiaLocationSelect;
