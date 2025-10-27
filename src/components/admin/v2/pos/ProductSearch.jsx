import React, { useState, useEffect, useRef } from 'react';
import axiosInstance from '../../../../api/axios';
import { useDebounce } from '../../../../hooks/useDebounce';
import useClickOutside from '../../../../hooks/useClickOutside';
import styles from '../../../../styles/admin/v2/pos/ProductSearch.module.css';
import { showToast } from '../../../../utils/toast';

const ProductSearch = ({ onAddProduct }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const searchContainerRef = useRef(null);

  useClickOutside(searchContainerRef, () => {
    setResults([]);
  });

  useEffect(() => {
    if (debouncedSearchTerm) {
      axiosInstance.get(`/products/search?query=${debouncedSearchTerm}`)
        .then(response => {
          setResults(response.data);
        })
        .catch(error => {
          showToast('Error searching products:' + error.message, "error");
        });
    } else {
      setResults([]);
    }
  }, [debouncedSearchTerm]);

  return (
    <div className={styles.container} ref={searchContainerRef}>
      <input 
        type="text"
        placeholder="Buscar productos por nombre o SKU..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={styles.searchInput}
      />
      {results.length > 0 && (
        <div className={styles.resultsContainer}>
          {results.map(product => (
            <div 
              key={product._id} 
              className={`${styles.resultItem} ${product.quantity === 0 ? styles.outOfStock : ''}`}
              onClick={() => product.quantity > 0 && onAddProduct(product)}
            >
              <span>{product.name}</span>
              <div className={styles.productDetails}>
                <span>{product.SKU}</span>
                {product.quantity === 0 && <span className={styles.outOfStockLabel}>Agotado</span>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductSearch;
