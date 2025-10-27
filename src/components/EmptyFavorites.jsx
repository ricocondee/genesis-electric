import { Link } from 'react-router-dom';
import styles from '../styles/EmptyCart.module.css'; // Reusing the same styles
import emptySvg from '../assets/emptyFavorites.svg';

const EmptyFavorites = () => {
  return (
    <div className={styles.container}>
      <img src={emptySvg} alt="No hay favoritos" className={styles.image} />
      <h2>No tienes productos favoritos</h2>
      <p>¡Agrega algunos productos a tus favoritos para verlos aquí!</p>
      <Link to="/products" className={styles.button}>Explorar productos</Link>
    </div>
  );
};

export default EmptyFavorites;
