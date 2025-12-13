
import styles from '../styles/Void.module.css';
import NotFoundImage from '../assets/emptyBox.svg';
import { Link } from 'react-router-dom';

const Void = ({ message, suggestion, showHomeButton = false }) => {
  return (
    <div className={styles.container}>
      <img src={NotFoundImage} alt="No encontrado" className={styles.image} />
      <h2 className={styles.title}>{message || 'No se encontraron productos'}</h2>
      <p className={styles.suggestion}>
        {suggestion || 'Intenta ajustar tu búsqueda o filtros para encontrar lo que buscas.'}
      </p>
      {showHomeButton && (
        <Link to="/" className={styles.homeButton}>
          Volver al inicio
        </Link>
      )}
    </div>
  );
};

export default Void;