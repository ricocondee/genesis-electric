import React from 'react';
import styles from '../../../../styles/admin/v2/pos/POSCart.module.css';
import { Trash2, Plus, Minus } from 'lucide-react';

const POSCart = ({ cartItems, onUpdateQuantity, onRemoveItem, cartTotal }) => {

  const formatPrice = (price) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className={styles.container}>
      <h3>Orden Actual</h3>
      <div className={styles.cartItems}>
        {cartItems.map(item => (
          <div key={item.productId} className={styles.cartItem}>
            <div className={styles.itemInfo}>
              <span>{item.name}</span>
              <span>{formatPrice(item.price)}</span>
            </div>
            <div className={styles.itemControls}>
              <button onClick={() => onUpdateQuantity(item.productId, item.quantity - 1)} disabled={item.quantity === 1}>
                <Minus size={16} />
              </button>
              <span>{item.quantity}</span>
              <button onClick={() => onUpdateQuantity(item.productId, item.quantity + 1)}>
                <Plus size={16} />
              </button>
              <button onClick={() => onRemoveItem(item.productId)}>
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.totalContainer}>
        <h4>Total:</h4>
        <span>{formatPrice(cartTotal)}</span>
      </div>
    </div>
  );
};

export default POSCart;
