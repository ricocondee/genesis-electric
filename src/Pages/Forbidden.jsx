
import { Link } from 'react-router-dom';
import styles from '../styles/Forbidden.module.css';
import forbiddenSvg from '../assets/403.svg';

const Forbidden = () => {
  return (
    <div className={styles.container}>
      <img src={forbiddenSvg} alt="Acceso denegado" className={styles.image} />
      <h1>403</h1>
      <h2>Acceso Denegado</h2>
      <p>No tienes permiso para acceder a esta página.</p>
      <Link to="/" className={styles.button}>Volver al inicio</Link>
    </div>
  );
};

export default Forbidden;
