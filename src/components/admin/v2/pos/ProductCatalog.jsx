import { useState, useEffect, useMemo } from 'react';
import axiosInstance from '../../../../api/axios';
import styles from '../../../../styles/admin/v2/pos/ProductCatalog.module.css';
import SearchBar from '../../../SearchBar';
import CategoryFilters from './CategoryFilters';
import ProductCard from './ProductCard';
import { useDebounce } from '../../../../hooks/useDebounce';
import { showToast } from '../../../../utils/toast';

const ProductCatalog = ({ onAddProduct }) => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({ q: '' });
  const [selectedCategory, setSelectedCategory] = useState('Todos los productos');
  const [sortBy, setSortBy] = useState('name');
  const debouncedQuery = useDebounce(filters.q, 300);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const params = {
          search: debouncedQuery,
          category: selectedCategory === 'Todos los productos' ? '' : selectedCategory,
        };
        const response = await axiosInstance.get('/products/search', { params });
        if (Array.isArray(response.data)) {
          setProducts(response.data);
        } else {
          setProducts([]);
        }
      } catch (error) {
        showToast('Error fetching products:' + error.message, "error");
      }
    };

    fetchProducts();
  }, [debouncedQuery, selectedCategory]);

  const sortedProducts = useMemo(() => {
    const sorted = [...products];
    if (sortBy === 'name') {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'price') {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'stock') {
      sorted.sort((a, b) => b.quantity - a.quantity);
    }
    return sorted;
  }, [products, sortBy]);

  return (
    <div className={styles.container}>
      <div className={styles.controlsHeader}>
        <div className={styles.searchContainer}>
          <SearchBar filters={filters} setFilters={setFilters} placeholder="Buscar productos..." />
        </div>
        <div className={styles.productCount}>
          {sortedProducts.length} productos
        </div>
        <div className={styles.sortContainer}>
          <label htmlFor="sort">Ordenar por:</label>
          <select id="sort" value={sortBy} onChange={(e) => setSortBy(e.target.value)} className={styles.sortDropdown}>
            <option value="name">Nombre</option>
            <option value="price">Precio</option>
            <option value="stock">Stock</option>
          </select>
        </div>
      </div>
      <CategoryFilters selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />
      <div className={styles.productGrid}>
        {sortedProducts.map(product => (
          <ProductCard key={product._id} product={product} onAddProduct={onAddProduct} />
        ))}
      </div>
    </div>
  );
};

export default ProductCatalog;