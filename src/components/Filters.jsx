import React, { useState } from 'react';
import styles from '../styles/Filters.module.css';
import { ChevronDown } from 'lucide-react';

const FilterSection = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className={styles.filterSection}>
      <h3 className={styles.filterTitle} onClick={() => setIsOpen(!isOpen)}>
        {title}
        <ChevronDown style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }} />
      </h3>
      <div className={`${styles.filterContent} ${isOpen ? styles.open : ''}`}>
        {children}
      </div>
    </div>
  );
};

const Filters = ({ filters, setFilters, availableBrands, availableCategories }) => {

  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === 'brand') {
        const newBrands = checked ? [...filters.brand, value] : filters.brand.filter(b => b !== value);
        setFilters({ ...filters, brand: newBrands });
    } else {
        setFilters({ ...filters, [name]: value });
    }
  };

  return (
    <div className={styles.container}>
      <FilterSection title="Categorías">
        <ul className={styles.filterList}>
          <li><button className={filters.category === '' ? styles.active : ''} onClick={() => setFilters({ ...filters, category: '' })}>Todas</button></li>
          {Array.isArray(availableCategories) && availableCategories.map(category => (
            <li key={category}><button className={filters.category === category ? styles.active : ''} onClick={() => setFilters({ ...filters, category })}>{category}</button></li>
          ))}
        </ul>
      </FilterSection>

      <FilterSection title="Marcas">
        <div className={styles.checkboxGroup}>
          {Array.isArray(availableBrands) && availableBrands.map(brand => (
            <label key={brand} className={styles.customCheckbox}>
              <input type="checkbox" name="brand" value={brand} onChange={handleFilterChange} checked={filters.brand.includes(brand)} />
              <span className={styles.checkmark}></span>
              {brand}
            </label>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Capacidad (BTU)">
        <div className={styles.radioGroup}>
          <label className={styles.customRadio}>
            <input type="radio" name="spec_btu" value="" onChange={handleFilterChange} checked={filters.spec_btu === ''} />
            <span className={styles.radiomark}></span>
            Todos
          </label>
          <label className={styles.customRadio}>
            <input type="radio" name="spec_btu" value="12000" onChange={handleFilterChange} checked={filters.spec_btu === '12000'} />
            <span className={styles.radiomark}></span>
            12000 BTU
          </label>
          <label className={styles.customRadio}>
            <input type="radio" name="spec_btu" value="18000" onChange={handleFilterChange} checked={filters.spec_btu === '18000'} />
            <span className={styles.radiomark}></span>
            18000 BTU
          </label>
          <label className={styles.customRadio}>
            <input type="radio" name="spec_btu" value="24000" onChange={handleFilterChange} checked={filters.spec_btu === '24000'} />
            <span className={styles.radiomark}></span>
            24000 BTU
          </label>
        </div>
      </FilterSection>

      <FilterSection title="Voltaje">
        <div className={styles.radioGroup}>
          <label className={styles.customRadio}>
            <input type="radio" name="spec_voltage" value="" onChange={handleFilterChange} checked={filters.spec_voltage === ''} />
            <span className={styles.radiomark}></span>
            Todos
          </label>
          <label className={styles.customRadio}>
            <input type="radio" name="spec_voltage" value="110" onChange={handleFilterChange} checked={filters.spec_voltage === '110'} />
            <span className={styles.radiomark}></span>
            110V
          </label>
          <label className={styles.customRadio}>
            <input type="radio" name="spec_voltage" value="220" onChange={handleFilterChange} checked={filters.spec_voltage === '220'} />
            <span className={styles.radiomark}></span>
            220V
          </label>
        </div>
      </FilterSection>

      <FilterSection title="Precio">
        <div className={styles.priceSlider}>
          <input 
            type="range" 
            min={0} 
            max={10000000} 
            value={filters.maxPrice} 
            onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
          />
          <div className={styles.priceInputs}>
            <input type="number" name="minPrice" value={filters.minPrice} onChange={handleFilterChange} />
            <input type="number" name="maxPrice" value={filters.maxPrice} onChange={handleFilterChange} />
          </div>
        </div>
      </FilterSection>
    </div>
  );
};

export default Filters;
