
import { NavLink } from 'react-router-dom';
import styles from '../../../styles/admin/v2/BottomNavBar.module.css';
import { Home, ShoppingCart, ClipboardList, User } from 'lucide-react';

const BottomNavBar = () => {
  return (
    <nav className={styles.bottomNav}>
      <NavLink to="/admin" className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink} end>
        <Home size={24} />
        <span>Home</span>
      </NavLink>
      <NavLink to="/admin/products" className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}>
        <ShoppingCart size={24} />
        <span>Products</span>
      </NavLink>
      <NavLink to="/admin/service-orders" className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}>
        <ClipboardList size={24} />
        <span>Orders</span>
      </NavLink>
      <NavLink to="/profile" className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}>
        <User size={24} />
        <span>Profile</span>
      </NavLink>
    </nav>
  );
};

export default BottomNavBar;
