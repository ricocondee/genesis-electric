
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import axiosInstance from '../api/axios';
import { cities } from '../data/cities';
import styles from '../styles/ShippingCalculator.module.css';
import { showToast } from '../utils/toast';

const ShippingCalculator = ({ onShippingCostChange }) => {
  const [selectedCity, setSelectedCity] = useState('');
  const [shippingCost, setShippingCost] = useState(0);
  const { cart, cartTotal } = useCart();

  const handleCityChange = async (e) => {
    const cityId = e.target.value;
    setSelectedCity(cityId);

    if (!cityId) {
      setShippingCost(0);
      onShippingCostChange(0);
      return;
    }

    if (!cart || !cart.items || cart.items.length === 0) {
      // Handle empty cart case if necessary
      return;
    }

    const totalWeight = cart.items.reduce((acc, item) => acc + (item.productId.weight || 0) * item.quantity, 0);
    const totalHeight = cart.items.reduce((acc, item) => acc + (item.productId.height || 0) * item.quantity, 0);
    const totalWidth = cart.items.reduce((acc, item) => acc + (item.productId.width || 0) * item.quantity, 0);
    const totalLength = cart.items.reduce((acc, item) => acc + (item.productId.length || 0) * item.quantity, 0);

    const params = {
      origin: '11001000', // Bogota
      destination: cityId,
      weight: totalWeight,
      height: totalHeight,
      width: totalWidth,
      length: totalLength,
      value: cartTotal,
    };

    try {
      const response = await axiosInstance.get('/quote', { params });
      const cost = response.data.price;
      setShippingCost(cost);
      onShippingCostChange(cost);
    } catch (error) {
      showToast('Error fetching shipping quote:' + error.message, "error");
      // Handle error case, maybe set a default cost or show an error message
      setShippingCost(0);
      onShippingCostChange(0);
    }
  };

  return (
    <div className={styles.container}>
      <h3>Calcular Envío</h3>
      <div className={styles.formGroup}>
        <label htmlFor="city">Selecciona tu ciudad:</label>
        <select id="city" value={selectedCity} onChange={handleCityChange} className={styles.select}>
          <option value="">Seleccionar ciudad</option>
          {cities.map((city) => (
            <option key={city.id} value={city.id}>
              {city.name}
            </option>
          ))}
        </select>
      </div>
      {selectedCity && (
        <div className={styles.result}>
          <p>Costo de envío a {cities.find(c => c.id === selectedCity)?.name}:</p>
          <p className={styles.cost}>${shippingCost.toLocaleString('es-CO')}</p>
        </div>
      )}
    </div>
  );
};

export default ShippingCalculator;
