import { Link } from 'react-router-dom';
import styles from '../styles/EmptyCart.module.css';
import emptyCartSvg from '../assets/emptyCart.svg'; // Assuming this is the correct path

const EmptyCart = () => {
  return (
    <div className={styles.container}>
      <img src={emptyCartSvg} alt="Carrito vacío" className={styles.image} />
      <h2>Tu carrito está vacío</h2>
      <p>Parece que todavía no has añadido nada a tu carrito.</p>
      <Link to="/products" className={styles.button}>Ir a la tienda</Link>
    </div>
  );
};

export default EmptyCart;
