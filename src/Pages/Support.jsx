import styles from '../styles/Support.module.css';
import asesora from '../assets/asesoraP.png';
import { MessageCircle } from 'lucide-react';

const Support = () => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.avatarContainer}>
          <img src={asesora} alt="Asesora de Soporte" className={styles.avatar} />
          <div className={styles.statusIndicator} title="En línea"></div>
        </div>
        
        <h1 className={styles.title}>¿Necesitas ayuda?</h1>
        
        <p className={styles.description}>
          Nuestro equipo de expertos está listo para asesorarte. 
          Escríbenos directamente a WhatsApp para resolver tus dudas al instante.
        </p>

        <a 
          href="https://wa.me/573005515224" 
          target="_blank" 
          rel="noopener noreferrer" 
          className={styles.whatsappButton}
        >
          <MessageCircle size={24} />
          Ir a WhatsApp
        </a>

        <div className={styles.schedule}>
          <p>Horario de atención: Lun - Vie, 8:00 AM - 6:00 PM</p>
        </div>
      </div>
    </div>
  );
};

export default Support;
