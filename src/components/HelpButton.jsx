import React from 'react';
import styles from '../styles/HelpButton.module.css';
import asesora from '../assets/asesoraP.png';

const HelpButton = () => {
  return (
    <a href="https://wa.me/573005515224" target="_blank" rel="noopener noreferrer" className={styles.floatingButton}>
      <img src={asesora} alt="Asesora" className={styles.avatar} />
      <span className={styles.text}>¿Necesitas ayuda? Habla con un especialista &gt;</span>
    </a>
  );
};

export default HelpButton;