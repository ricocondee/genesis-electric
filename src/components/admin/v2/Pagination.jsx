import React from 'react';
import styles from '../../../styles/admin/v2/Pagination.module.css';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({ page, setPage, limit, setLimit, totalProducts }) => {
  const totalPages = Math.ceil(totalProducts / limit);

  const handlePrevious = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNext = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handleLimitChange = (e) => {
    setLimit(parseInt(e.target.value, 10));
    setPage(1);
  };

  return (
    <div className={styles.pagination}>
      <div className={styles.results}>
        Mostrando {Math.min((page - 1) * limit + 1, totalProducts)} - {Math.min(page * limit, totalProducts)} de {totalProducts} resultados
      </div>
      <div className={styles.controls}>
        <div className={styles.itemsPerPage}>
          <span>Resultados por página</span>
          <select value={limit} onChange={handleLimitChange}>
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
        </div>
        <div className={styles.pageControls}>
          <button className={styles.pageButton} onClick={handlePrevious} disabled={page === 1}>
            <ChevronLeft size={20} />
          </button>
          <span className={styles.pageInfo}>
            Página {page} de {totalPages}
          </span>
          <button className={styles.pageButton} onClick={handleNext} disabled={page === totalPages}>
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
