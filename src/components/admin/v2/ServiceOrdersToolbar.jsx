import React, { useRef } from 'react';
import styles from '../../../styles/admin/v2/Toolbar.module.css';
import { Search, ChevronDown, Plus } from 'lucide-react';

const ServiceOrdersToolbar = ({ searchTerm, setSearchTerm, status, setStatus, onAddClick }) => {
  return (
    <div className={styles.toolbar}>
      <div className={styles.left}>
        <div className={styles.searchBar}>
          <Search size={20} className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Buscar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className={styles.filters}>
          <div className={styles.datePicker}>
            <span>11 Oct, 2025 - 10 Nov, 2025</span>
            <ChevronDown size={20} />
          </div>
          <div className={styles.dropdownFilter}>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="All">Estado</option>
              <option value="publicado">Publicado</option>
              <option value="borrador">Borrador</option>
              <option value="inactivo">Inactivo</option>
              <option value="agotado">Agotado</option>
            </select>
          </div>
          <button className={styles.filterButton}>Filtrar</button>
        </div>
      </div>
      <div className={styles.actions}>
        <button className={styles.addProductButton} onClick={onAddClick}>
          <Plus size={20} />
          <span>Crear Orden</span>
        </button>
      </div>
    </div>
  );
};

export default ServiceOrdersToolbar;
