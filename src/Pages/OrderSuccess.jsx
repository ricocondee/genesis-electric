
import { Link } from 'react-router-dom';
import styles from '../styles/OrderSuccess.module.css';

const OrderSuccess = () => {
  return (
    <div className={styles.container}>
      <h2>¡Gracias por tu compra!</h2>
      <p>Tu pedido ha sido realizado con éxito.</p>
      <Link to="/products" className={styles.continueShopping}>Seguir Comprando</Link>
    </div>
  );
};

export default OrderSuccess;