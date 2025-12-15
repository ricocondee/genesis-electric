import styles from '../styles/OrderSummary.module.css';
import { useCart } from '../context/CartContext';

const OrderSummary = () => {
  const { cart, cartTotal, totalItems, shippingCost } = useCart();

  const formatPrice = (price) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className={styles.container}>
      <h2>Resumen del Pedido</h2>
      <div className={styles.itemList}>
        {cart.items.map(item => (
          <div key={item.productId._id} className={styles.item}>
            <img src={item.productId.imageUrl} alt={item.productId.name} className={styles.itemImage} />
            <div className={styles.itemDetails}>
              <p className={styles.itemName}>{item.productId.name}</p>
              <p>Cant: {item.quantity}</p>
            </div>
            <p className={styles.itemPrice}>{formatPrice(item.productId.price * item.quantity)}</p>
          </div>
        ))}
      </div>
      <div className={styles.summaryFooter}>
        <div className={styles.summaryRow}>
          <span>Subtotal ({totalItems} productos)</span>
          <span>{formatPrice(cartTotal)}</span>
        </div>
        <div className={styles.summaryRow}>
          <span>Envío</span>
          <span>{shippingCost === 0 ? 'GRATIS' : formatPrice(shippingCost)}</span>
        </div>
        <div className={`${styles.summaryRow} ${styles.totalRow}`}>
          <span>Total</span>
          <span>{formatPrice(cartTotal + shippingCost)}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;