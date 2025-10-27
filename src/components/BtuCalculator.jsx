import AiSparks from './AiSparks';
import React, { useState } from 'react';
import styles from '../styles/BtuCalculator.module.css';
import { Link } from 'react-router-dom';
import axiosInstance from '../api/axios';

const BtuCalculator = () => {
  const [width, setWidth] = useState('');
  const [length, setLength] = useState('');
  const [occupants, setOccupants] = useState(2);
  const [sunlight, setSunlight] = useState('normal');
  const [recommendedBtu, setRecommendedBtu] = useState(null);
  const [recommendedProduct, setRecommendedProduct] = useState(null);
  const [showForm, setShowForm] = useState(true);
  const [originalBtu, setOriginalBtu] = useState(null);
  const [closestBtu, setClosestBtu] = useState(null);
  const [showSparks, setShowSparks] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowSparks(true);

    const area = width * length;
    let btu = area * 600;

    btu += occupants * 600;

    if (sunlight === 'sunny') {
      btu += btu * 0.1;
    }

    const calculatedBtu = Math.ceil(btu);
    setOriginalBtu(calculatedBtu);

    const standardBtuValues = [9000, 12000, 18000, 24000, 36000, 48000, 60000];
    let recommendedBtuValue = standardBtuValues[standardBtuValues.length - 1]; // Default to max

    for (let i = 0; i < standardBtuValues.length; i++) {
      const standardBtu = standardBtuValues[i];
      setClosestBtu(standardBtu);
      const nextStandardBtu = standardBtuValues[i + 1] || standardBtu; // Use current if it's the last one

      if (calculatedBtu <= standardBtu) {
        if (Math.abs(calculatedBtu - standardBtu) / standardBtu <= 0.1) {
          recommendedBtuValue = nextStandardBtu;
        } else {
          recommendedBtuValue = standardBtu;
        }
        break;
      }
    }

    setRecommendedBtu(recommendedBtuValue);

    setTimeout(async () => {
      try {
        const response = await axiosInstance.get(`/products/search-by-btu?btu=${recommendedBtuValue}`);
        setRecommendedProduct(response.data.data);
        setShowForm(false);
        setShowSparks(false);
      } catch (error) {
        console.error('Failed to fetch product:', error);
        setShowSparks(false);
      }
    }, 2000);
  };

  const handleRecalculate = () => {
    setShowForm(true);
    setRecommendedBtu(null);
    setRecommendedProduct(null);
    setOriginalBtu(null);
  };

  return (
    <div>
      {showSparks && <div className={styles.sparksOverlay}><AiSparks /></div>}
      {showForm ? (
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="width">Ancho de la habitación (metros)</label>
            <input
              type="number"
              id="width"
              value={width}
              onChange={(e) => setWidth(e.target.value)}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="length">Largo de la habitación (metros)</label>
            <input
              type="number"
              id="length"
              value={length}
              onChange={(e) => setLength(e.target.value)}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="occupants">Número de ocupantes</label>
            <input
              type="number"
              id="occupants"
              value={occupants}
              onChange={(e) => setOccupants(e.target.value)}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="sunlight">Exposición a la luz solar</label>
            <select id="sunlight" value={sunlight} onChange={(e) => setSunlight(e.target.value)}>
              <option value="sunny">Mucha sol</option>
              <option value="normal">Sol normal</option>
              <option value="shady">Poca sol</option>
            </select>
          </div>
          <button type="submit" className={styles.button}>Calcular</button>
        </form>
      ) : (
        <div className={styles.resultContainer}>
          {recommendedBtu && (
            <div className={styles.result}>
              <h3>Análisis de Genny</h3>
              {originalBtu !== recommendedBtu && (
                <p>El BTU calculado es <strong>{originalBtu}</strong>. Para evitar que un aire acondicionado de <strong>{closestBtu} BTU</strong> trabaje al límite, he determinado que necesitas un aire acondicionado con una capacidad de al menos <strong>{recommendedBtu} BTU</strong>.</p>
              )}
            </div>
          )}
          {recommendedProduct && (
            <div className={styles.recommendation}>
              <h3>Producto Recomendado</h3>
              {recommendedProduct.imageUrls && recommendedProduct.imageUrls.length > 0 && (
                <img src={recommendedProduct.imageUrls[0]} alt={recommendedProduct.name} />
              )}
              <h4>{recommendedProduct.name}</h4>
              <Link to={`/products/${recommendedProduct._id}`}>Ver producto</Link>
            </div>
          )}
          <button onClick={handleRecalculate} className={styles.button}>Recalcular</button>
        </div>
      )}
    </div>
  );
}

export default BtuCalculator;