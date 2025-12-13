
import { NavLink } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import styles from '../styles/ProfileSidebar.module.css';
import { Package, MapPin, Lock, CreditCard, Archive, Heart, LifeBuoy, LogOut } from 'lucide-react';

const ProfileSidebar = () => {
  const { user, logout } = useUser();

  return (
    <div className={styles.sidebar}>
      <div className={styles.userInfo}>
        <h3>{user?.name} {user?.lastname}</h3>
        <p>{user?.email}</p>
      </div>
      <nav className={styles.navigation}>
        <ul>
          <li>
            <NavLink to="/profile/orders" className={({ isActive }) => isActive ? styles.active : ''}>
              <Package size={20} />
              <span>Mis Pedidos</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/profile/addresses" className={({ isActive }) => isActive ? styles.active : ''}>
              <MapPin size={20} />
              <span>Mis Direcciones</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/profile/security" className={({ isActive }) => isActive ? styles.active : ''}>
              <Lock size={20} />
              <span>Login & Seguridad</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/profile/archived-orders" className={({ isActive }) => isActive ? styles.active : ''}>
              <Archive size={20} />
              <span>Pedidos Archivados</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/favorites" className={({ isActive }) => isActive ? styles.active : ''}>
              <Heart size={20} />
              <span>Mis Favoritos</span>
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className={styles.bottomSection}>
        <NavLink to="/support" className={({ isActive }) => isActive ? styles.active : ''}>
          <LifeBuoy size={20} />
          <span>Soporte al Cliente</span>
        </NavLink>
        <button onClick={logout} className={styles.logoutButton}>
          <LogOut size={20} />
          <span>Cerrar Sesión</span>
        </button>
      </div>
    </div>
  );
};

export default ProfileSidebar;
