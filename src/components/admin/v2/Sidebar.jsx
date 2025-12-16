import { NavLink } from 'react-router-dom';
import styles from '../../../styles/admin/v2/Sidebar.module.css';
import { Home, Store, DollarSign, Users, BarChart2, Megaphone, Settings, ShoppingBag, LogOut, X } from 'lucide-react';
import { useUser } from '../../../context/UserContext';

const Sidebar = ({ onClose }) => {
  const { user, logout } = useUser();

  const canViewServiceOrders = user && (user.role === 'admin' || user.role === 'manager' || user.role === 'technician');
  const canManageStore = user && (user.role === 'admin' || user.role === 'manager');
  const canViewSettings = user && (user.role === 'admin' || user.role === 'manager');

  const handleLinkClick = () => {
      if (onClose) onClose();
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.header}>
        <div className={styles.logo}>
            <h2>Admin</h2>
        </div>
        {/* Close button for mobile */}
        <button className={styles.closeButton} onClick={onClose} aria-label="Close Sidebar">
            <X size={24} />
        </button>
      </div>

      <nav className={styles.nav}>
        <ul>
          <li>
            <NavLink to="/admin" onClick={handleLinkClick} className={({ isActive }) => isActive ? styles.active : ''} end>
              <Home size={20} />
              <span>Inicio</span>
            </NavLink>
          </li>
          {canManageStore && (
            <li className={styles.navGroup}>
              <span className={styles.groupTitle}>Mi Tienda</span>
              <ul>
                <li>
                  <NavLink to="/admin/products" onClick={handleLinkClick} className={({ isActive }) => isActive ? styles.active : ''}>
                    <ShoppingBag size={20} />
                    <span>Productos</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/admin/orders" onClick={handleLinkClick} className={({ isActive }) => isActive ? styles.active : ''}>
                    <DollarSign size={20} />
                    <span>Pedidos</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/admin/inventory" onClick={handleLinkClick} className={({ isActive }) => isActive ? styles.active : ''}>
                    <Store size={20} />
                    <span>Inventario</span>
                  </NavLink>
                </li>
              </ul>
            </li>
          )}
          {canViewServiceOrders && (
            <li>
              <NavLink to="/admin/service-orders" onClick={handleLinkClick} className={({ isActive }) => isActive ? styles.active : ''}>
                <ShoppingBag size={20} />
                <span>Órdenes de Servicio</span>
              </NavLink>
            </li>
          )}
          {canManageStore && (
            <li>
              <NavLink to="/admin/customers" onClick={handleLinkClick} className={({ isActive }) => isActive ? styles.active : ''}>
                <Users size={20} />
                <span>Clientes</span>
              </NavLink>
            </li>
          )}
          {canViewSettings && (
            <li>
              <NavLink to="/admin/settings" onClick={handleLinkClick} className={({ isActive }) => isActive ? styles.active : ''}>
                <Settings size={20} />
                <span>Configuración</span>
              </NavLink>
            </li>
          )}
          {canManageStore && (
            <li className={styles.navGroup}>
              <span className={styles.groupTitle}>Canales de Venta</span>
              <ul>
                <li>
                  <NavLink to="/admin/pos" onClick={handleLinkClick} className={({ isActive }) => isActive ? styles.active : ''}>
                    <ShoppingBag size={20} />
                    <span>Punto de Venta</span>
                  </NavLink>
                </li>
              </ul>
            </li>
          )}
        </ul>
      </nav>
      <div className={styles.userProfile}>
        <img src="https://placehold.co/40x40" alt="User avatar" />
        <NavLink to="/profile" onClick={handleLinkClick}>
          <span>{user ? user.name : 'Invitado'}</span>
        </NavLink>
      </div>
      <div className={styles.logoutSection}>
        <button onClick={logout} className={styles.logoutButton}>
          <LogOut size={20} />
          <span>Cerrar Sesión</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
