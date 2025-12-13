import { useState } from 'react';
import styles from '../../../styles/admin/v2/AccordionMenu.module.css';

const AccordionMenu = ({ onSelect }) => {
  const [selected, setSelected] = useState('slides');

  const handleSelect = (setting) => {
    setSelected(setting);
    onSelect(setting);
  };

  return (
    <div className={styles.container}>
      <ul>
        <li><button onClick={() => handleSelect('slides')} className={selected === 'slides' ? styles.active : ''}>Configuración del Hero Slider</button></li>
        <li><button onClick={() => handleSelect('staff')} className={selected === 'staff' ? styles.active : ''}>Gestión de Personal</button></li>
      </ul>
    </div>
  );
};

export default AccordionMenu;
