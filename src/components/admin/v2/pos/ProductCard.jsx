import React from 'react';
import styles from '../../../../styles/admin/v2/pos/ProductCard.module.css';
import { ShoppingCart } from 'lucide-react';

const ProductCard = ({ product, onAddProduct }) => {
  console.log('Product in ProductCard:', product); // Add this line

  const formatPrice = (price) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getImageUrl = (product) => {
    if (product.imageUrls && product.imageUrls.length > 0) {
      return product.imageUrls[0];
    }
    if (product.imageUrl) {
      return product.imageUrl;
    }
    return 'https://via.placeholder.com/150';
  };

  const priceWithIva = product.netPrice * 1.19;

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img src={getImageUrl(product)} alt={product.name} />
        {product.quantity > 0 ? (
          <span className={`${styles.badge} ${styles.inStock}`}>{product.quantity} in stock</span>
        ) : (
          <span className={`${styles.badge} ${styles.outOfStock}`}>Agotado</span>
        )}
      </div>
      <div className={styles.cardContent}>
        <h4>{product.name}</h4>
        <p>{formatPrice(priceWithIva)}</p>
        <button 
          onClick={() => onAddProduct(product)} 
          disabled={product.quantity === 0}
          className={styles.addToCartButton}
        >
          <ShoppingCart size={16} />
          Agregar
        </button>
      </div>
    </div>
  );
};

export default ProductCard;