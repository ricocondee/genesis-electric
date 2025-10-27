import React from 'react';
import styles from '../../../../styles/admin/v2/service_orders/FilterBar.module.css';
import { Search } from 'lucide-react';

const FilterBar = () => {
  return (
    <div className={styles.filterBar}>
      <div className={styles.searchBar}>
        <Search size={20} className={styles.searchIcon} />
        <input type="text" placeholder="Buscar por cliente, técnico o estado..." />
      </div>
      <div className={styles.filters}>
        <input type="date" />
        <button className={styles.filterButton}>Filtrar</button>
      </div>
    </div>
  );
};

export default FilterBar;
