import React from 'react';
import styles from '../styles/Pagination.module.css';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={`${styles.pageNumber} ${currentPage === i ? styles.active : ''}`}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  return (
    <div className={styles.pagination}>
      <button onClick={handlePrevious} disabled={currentPage === 1} className={styles.navButton}>
        Anterior
      </button>
      {renderPageNumbers()}
      <button onClick={handleNext} disabled={currentPage === totalPages} className={styles.navButton}>
        Siguiente
      </button>
    </div>
  );
};

export default Pagination;
