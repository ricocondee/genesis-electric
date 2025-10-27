import React from 'react';
import styles from '../../../../styles/admin/v2/layout/Pagination.module.css';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({ page, setPage, limit, setLimit, totalProducts }) => {
  const totalPages = Math.ceil(totalProducts / limit);

  return (
    <div className={styles.pagination}>
      <div className={styles.resultsText}>
        Mostrando {Math.min((page - 1) * limit + 1, totalProducts)}–{Math.min(page * limit, totalProducts)} de {totalProducts} resultados
      </div>
      <div className={styles.controls}>
        <div className={styles.rowsPerPage}>
          <span>Resultados por página:</span>
          <select value={limit} onChange={(e) => setLimit(Number(e.target.value))}>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
        <div className={styles.pageControls}>
          <button onClick={() => setPage(page - 1)} disabled={page === 1}><ChevronLeft size={20} /></button>
          <span>Página {page} de {totalPages}</span>
          <button onClick={() => setPage(page + 1)} disabled={page === totalPages}><ChevronRight size={20} /></button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
