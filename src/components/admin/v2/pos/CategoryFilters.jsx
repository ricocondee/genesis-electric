import React, { useState, useEffect } from 'react';
import styles from '../../../../styles/admin/v2/pos/CategoryFilters.module.css';
import axiosInstance from '../../../../api/axios';
import { showToast } from '../../../../utils/toast';

const CategoryFilters = ({ selectedCategory, onSelectCategory }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get('/products/categories');
        const categoryNames = response.data.data || [];
        const categoryObjects = categoryNames.map(name => ({ name }));
        setCategories([{ name: 'All Products' }, ...categoryObjects]);
      } catch (error) {
        showToast('Error fetching categories:' + error.message, "error");
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className={styles.container}>
      {categories.map(category => (
        <button 
          key={category.name} 
          onClick={() => onSelectCategory(category.name)} 
          className={`${styles.pill} ${category.name === selectedCategory ? styles.active : ''}`}>
          {category.name}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilters;