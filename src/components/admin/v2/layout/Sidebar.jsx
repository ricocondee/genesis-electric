
import styles from '../../../../styles/admin/v2/layout/Sidebar.module.css';
import { Home, ShoppingCart, ClipboardList, Wrench, Archive, Tag, DollarSign, Users, BarChart2, Megaphone, Settings, Store, Laptop } from 'lucide-react';

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.logoContainer}>
        {/* <img src="/logo.png" alt="Logo" className={styles.logo} /> */}
        <h2>Admin</h2>
      </div>
      <nav className={styles.nav}>
        <h3 className={styles.navSectionTitle}>Principal</h3>
        <ul>
          <li><a href="#" className={styles.navLink}><Home size={20} /> <span>Inicio</span></a></li>
          <li><a href="#" className={styles.navLink}><ShoppingCart size={20} /> <span>Productos</span></a></li>
          <li><a href="#" className={styles.navLink}><ClipboardList size={20} /> <span>Pedidos</span></a></li>
          <li><a href="#" className={`${styles.navLink} ${styles.active}`}><Wrench size={20} /> <span>Órdenes de Servicio</span></a></li>
          <li><a href="#" className={styles.navLink}><Archive size={20} /> <span>Inventario</span></a></li>
          <li><a href="#" className={styles.navLink}><Tag size={20} /> <span>Descuentos</span></a></li>
        </ul>
        <h3 className={styles.navSectionTitle}>Gesti&oacute;n</h3>
        <ul>
          <li><a href="#" className={styles.navLink}><DollarSign size={20} /> <span>Finanzas</span></a></li>
          <li><a href="#" className={styles.navLink}><Users size={20} /> <span>Clientes</span></a></li>
          <li><a href="#" className={styles.navLink}><BarChart2 size={20} /> <span>Reportes Analíticos</span></a></li>
          <li><a href="#" className={styles.navLink}><Megaphone size={20} /> <span>Mercadeo</span></a></li>
          <li><a href="#" className={styles.navLink}><Settings size={20} /> <span>Configuración</span></a></li>
        </ul>
        <h3 className={styles.navSectionTitle}>Canales de Venta</h3>
        <ul>
          <li><a href="#" className={styles.navLink}><Store size={20} /> <span>Tienda en Línea</span></a></li>
          <li><a href="#" className={styles.navLink}><Laptop size={20} /> <span>Punto de Venta</span></a></li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
