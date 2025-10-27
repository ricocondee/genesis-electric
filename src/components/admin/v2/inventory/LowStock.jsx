import React, { useState, useEffect } from 'react';
import { productService } from '../../../../services/productService';
import styles from '../../../../styles/admin/v2/inventory/LowStock.module.css';
import Loader from '../../Loader';
import { showToast } from '../../../../utils/toast';

const LowStock = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await productService.getAllProducts({ quantity_lt: 10 });
        const productsData = Array.isArray(response.data) ? response.data : [];
        setProducts(productsData);
      } catch (err) {
        showToast('Error al cargar los productos con poco inventario.', "error");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Productos con Poco Inventario</h2>
      <div className={styles.productList}>
        {products.map(product => (
          <div key={product._id} className={styles.productCard}>
            <img src={product.imageUrls[0]} alt={product.name} className={styles.productImage} />
            <div className={styles.productInfo}>
              <h3 className={styles.productName}>{product.name}</h3>
              <p className={styles.productQuantity}>Cantidad: {product.quantity}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LowStock;
