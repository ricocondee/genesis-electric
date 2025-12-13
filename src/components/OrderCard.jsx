
import styles from '../styles/OrderCard.module.css';
import { Package, Calendar, MapPin, DollarSign } from 'lucide-react';

const OrderCard = ({ order }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'pending':
        return styles.statusPending;
      case 'processing':
        return styles.statusProcessing;
      case 'shipped':
        return styles.statusShipped;
      case 'delivered':
        return styles.statusDelivered;
      case 'cancelled':
        return styles.statusCancelled;
      default:
        return '';
    }
  };

  return (
    <div className={styles.orderCard}>
      <div className={styles.orderSummary}>
        <div className={styles.summaryItem}>
          <Package size={20} />
          <span>Pedido #{order.orderNumber}</span>
        </div>
        <div className={styles.summaryItem}>
          <Calendar size={20} />
          <span>{new Date(order.createdAt).toLocaleString()}</span>
        </div>
        <div className={styles.summaryItem}>
          <DollarSign size={20} />
          <span>{formatPrice(order.totalPrice)}</span>
        </div>
        <span className={`${styles.orderStatus} ${getStatusClass(order.status)}`}>
          {order.status}
        </span>
      </div>

      <div className={styles.orderDetails}>
        <p><strong>Productos:</strong> {order.items.length}</p>
        <p><strong>Fecha de Entrega:</strong> {order.deliveryDate ? new Date(order.deliveryDate).toLocaleDateString() : 'N/A'}</p>
        <p className={styles.address}><MapPin size={16} /> {order.shippingAddress.address}, {order.shippingAddress.city}</p>
      </div>

      <div className={styles.productList}>
        {order.items.map(item => (
          <div key={item._id} className={styles.productItem}>
            <img src={item.productId.imageUrl} alt={item.productId.name} className={styles.productImage} />
            <div className={styles.productInfo}>
              <h4>{item.productId.name}</h4>
              <p>Cantidad: {item.quantity}</p>
              <p>Precio: {formatPrice(item.price)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderCard;
