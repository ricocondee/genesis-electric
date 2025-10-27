import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/NotFound.module.css';
import notFoundSvg from '../assets/404.svg';

const NotFound = () => {
  return (
    <div className={styles.container}>
      <img src={notFoundSvg} alt="Página no encontrada" className={styles.image} />
      <h1>404</h1>
      <h2>No encontramos esa página, pero podemos encontrar una solución para tu aire acondicionado.</h2>
      <Link to="/" className={styles.button}>Volver al inicio</Link>
    </div>
  );
};

export default NotFound;
