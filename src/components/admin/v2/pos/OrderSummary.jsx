import React from 'react';
import styles from '../../../../styles/admin/v2/pos/OrderSummary.module.css';
import { Trash2, ShoppingCart } from 'lucide-react';
import Payment from './Payment';

const OrderSummary = ({ cartItems, onUpdateQuantity, onRemoveItem, cartTotal, discount, setDiscount, onProcessPayment, selectedPaymentMethod, setSelectedPaymentMethod }) => {

  const formatPrice = (price) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const subtotal = cartTotal;
  const tax = (subtotal - discount) * 0.19;
  const total = subtotal - discount + tax;

  return (
    <div className={styles.container}>
      <h3>Orden Actual</h3>
      <div className={styles.cartItems}>
        {cartItems.length === 0 ? (
          <div className={styles.emptyCart}>
            <ShoppingCart size={48} />
            <p>Tu carrito está vacío</p>
          </div>
        ) : (
          cartItems.map(item => (
            <div key={item._id} className={styles.cartItem}>
              <img src={(item.imageUrls && item.imageUrls.length > 0) ? item.imageUrls[0] : (item.imageUrl || 'https://via.placeholder.com/40')} alt={item.name} className={styles.itemImage} />
              <div className={styles.itemInfo}>
                <span>{item.name}</span>
                <div className={styles.quantityControls}>
                  <button onClick={() => onUpdateQuantity(item._id, item.quantity - 1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => onUpdateQuantity(item._id, item.quantity + 1)}>+</button>
                </div>
              </div>
              <div className={styles.itemPrice}>
                <span>{formatPrice(item.netPrice * item.quantity)}</span>
                <button onClick={() => onRemoveItem(item._id)}><Trash2 size={16} /></button>
              </div>
            </div>
          ))
        )}
      </div>
      <div className={styles.summaryDetails}>
        <div className={styles.summaryRow}>
          <span>Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        <div className={styles.summaryRow}>
          <span>Descuento</span>
          <input type="number" value={discount} onChange={(e) => setDiscount(parseFloat(e.target.value) || 0)} className={styles.summaryInput} />
        </div>
        <div className={styles.summaryRow}>
          <span>IVA (19%)</span>
          <span>{formatPrice(tax)}</span>
        </div>
        <div className={`${styles.summaryRow} ${styles.total}`}>
          <span>Total</span>
          <span>{formatPrice(total)}</span>
        </div>
      </div>
      <Payment 
        selectedPaymentMethod={selectedPaymentMethod} 
        setSelectedPaymentMethod={setSelectedPaymentMethod} 
      />
      <button 
        className={styles.processPaymentButton} 
        onClick={() => onProcessPayment(selectedPaymentMethod)}
        disabled={!selectedPaymentMethod || cartItems.length === 0}
      >
        Procesar Pago
      </button>
    </div>
  );
};

export default OrderSummary;