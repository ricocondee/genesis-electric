import React from 'react';
import styles from '../../styles/admin/AccordionMenu.module.css';

const AccordionMenu = ({ onSelect }) => {
  return (
    <div className={styles.container}>
      <ul>
        <li onClick={() => onSelect('slides')}>Configuración del Hero Slider</li>
        <li onClick={() => onSelect('staff')}>Gestión de Personal</li>
      </ul>
    </div>
  );
};

export default AccordionMenu;
