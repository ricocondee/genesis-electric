import { useState, useEffect, useCallback } from 'react';
import { useCart } from '../context/CartContext';
import ColombiaLocationSelect from './ColombiaLocationSelect';
import styles from '../styles/ShippingCalculator.module.css';
import { calculateShippingCost } from '../utils/shipping';

const ShippingCalculator = ({ onShippingCostChange }) => {
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [shippingCost, setShippingCost] = useState(0);
  const { cart } = useCart();

  const handleSelectDepartment = useCallback((department) => {
    setSelectedDepartment(department);
    setSelectedCity('');
  }, []);

  const handleSelectCity = useCallback((city) => {
    setSelectedCity(city);
  }, []);

  useEffect(() => {
    // Calculate shipping cost whenever selectedDepartment, selectedCity, or cart changes
    const updateShippingCost = () => {
      if (!selectedCity) {
        setShippingCost(0);
        onShippingCostChange(0);
        return;
      }

      const cost = calculateShippingCost(selectedDepartment, cart?.items);
      setShippingCost(cost);
      onShippingCostChange(cost);
    };

    updateShippingCost();
  }, [selectedDepartment, selectedCity, cart, onShippingCostChange]); // Dependencies for useEffect

  return (
    <div className={styles.container}>
      <h3>Calcular Envío</h3>
      <div className={styles.formGroup}>
        <ColombiaLocationSelect
          selectedDepartment={selectedDepartment}
          selectedCity={selectedCity}
          onSelectDepartment={handleSelectDepartment}
          onSelectCity={handleSelectCity}
        />
      </div>
      {selectedCity && (
        <div className={styles.result}>
          <p>Costo de envío a {selectedCity}:</p>
          <p className={styles.cost}>${shippingCost.toLocaleString('es-CO')}</p>
        </div>
      )}
    </div>
  );
};

export default ShippingCalculator;