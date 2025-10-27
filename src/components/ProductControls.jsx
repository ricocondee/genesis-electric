import React from 'react';
import styles from '../styles/ProductControls.module.css';
import SortFilter from './SortFilter';
import SearchBar from './SearchBar';
import { Grid, List, Filter } from 'lucide-react';

const ProductControls = ({ sortOption, setSortOption, filters, setFilters, view, setView, onFilterClick }) => {
  return (
    <div className={styles.container}>
      <div className={styles.leftControls}>
        <SortFilter sortOption={sortOption} setSortOption={setSortOption} />
        <SearchBar filters={filters} setFilters={setFilters} />
      </div>
      <div className={styles.rightControls}>
        <button 
          aria-label="Grid view"
          className={`${styles.viewToggleBtn} ${view === 'grid' ? styles.active : ''}`}
          onClick={() => setView('grid')}
        >
          <Grid />
        </button>
        <button 
          aria-label="List view"
          className={`${styles.viewToggleBtn} ${view === 'list' ? styles.active : ''}`}
          onClick={() => setView('list')}
        >
          <List />
        </button>
        <button 
          aria-label="Filters"
          className={styles.filterBtn}
          onClick={onFilterClick}
        >
          <Filter />
        </button>
      </div>
    </div>
  );
};

export default ProductControls;
