
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/FavoritesTable.module.css';
import { Snowflake, Zap, Leaf, Wifi, X } from 'lucide-react';

const FavoritesTable = ({ products, onRemove }) => {
  const { addItem } = useCart();
  const navigate = useNavigate();

  const handleBuyNow = (product) => {
    addItem(product);
    const token = localStorage.getItem('token');
    if (token && token !== "undefined") {
      navigate('/checkout');
    } else {
      navigate('/login', { state: { from: '/checkout' } });
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Imagen</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Especificaciones</th>
            <th>Precio</th>
            <th>Acción</th>
            <th>Quitar</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>
                <img src={product.imageUrl} alt={product.name} className={styles.productImage} />
              </td>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>
                <div className={styles.specs}>
                  <div className={styles.spec}>
                    <Snowflake className={styles.icon} size={20} />
                    <span>{product.btu} BTU</span>
                  </div>
                  <div className={styles.spec}>
                    <Zap className={styles.icon} size={20} />
                    <span>{product.voltage}V</span>
                  </div>
                  {(product.seer || product.energyType) && (
                    <div className={styles.spec}>
                      <Leaf className={styles.icon} size={20} />
                      <span>{product.seer ? `${product.seer} SEER` : product.energyType}</span>
                    </div>
                  )}
                  {product.wifi && (
                    <div className={styles.spec}>
                      <Wifi className={styles.icon} size={20} />
                      <span>Wifi</span>
                    </div>
                  )}
                </div>
              </td>
              <td>
                {product.status === 'agotado' ? (
                  <span className={styles.outOfStockLabel}>Agotado</span>
                ) : (
                  formatPrice(product.price)
                )}
              </td>
              <td>
                <button 
                  className={styles.buyButton} 
                  onClick={() => handleBuyNow(product)} 
                  disabled={product.status === 'agotado'}
                >
                  Comprar ahora
                </button>
              </td>
              <td>
                <button className={styles.removeButton} onClick={() => onRemove(product._id)}>
                  <X size={20} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FavoritesTable;
