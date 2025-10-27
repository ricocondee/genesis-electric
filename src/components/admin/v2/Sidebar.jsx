import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from '../../../styles/admin/v2/Sidebar.module.css';
import { Home, Store, DollarSign, Users, BarChart2, Megaphone, Settings, ShoppingBag, LogOut } from 'lucide-react';
import { useUser } from '../../../context/UserContext';

const Sidebar = ({ isOpen }) => {
  const { user, logout } = useUser();

  const canViewServiceOrders = user && (user.role === 'admin' || user.role === 'manager' || user.role === 'technician');
  const canManageStore = user && (user.role === 'admin' || user.role === 'manager');
  const canViewSettings = user && (user.role === 'admin' || user.role === 'manager');

  return (
    <aside className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
      <div className={styles.logo}>
        <h2>Admin</h2>
      </div>
      <nav className={styles.nav}>
        <ul>
          <li>
            <NavLink to="/admin/home" className={({ isActive }) => isActive ? styles.active : ''}>
              <Home size={20} />
              <span>Inicio</span>
            </NavLink>
          </li>
          {canManageStore && (
            <li className={styles.navGroup}>
              <span className={styles.groupTitle}>Mi Tienda</span>
              <ul>
                <li>
                  <NavLink to="/admin/products" className={({ isActive }) => isActive ? styles.active : ''}>
                    <ShoppingBag size={20} />
                    <span>Productos</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/admin/inventory" className={({ isActive }) => isActive ? styles.active : ''}>
                    <Store size={20} />
                    <span>Inventario</span>
                  </NavLink>
                </li>
              </ul>
            </li>
          )}
          {canViewServiceOrders && (
            <li>
              <NavLink to="/admin/service-orders" className={({ isActive }) => isActive ? styles.active : ''}>
                <ShoppingBag size={20} />
                <span>Órdenes de Servicio</span>
              </NavLink>
            </li>
          )}
          {canManageStore && (
            <li>
              <NavLink to="/admin/customers" className={({ isActive }) => isActive ? styles.active : ''}>
                <Users size={20} />
                <span>Clientes</span>
              </NavLink>
            </li>
          )}
          {canViewSettings && (
            <li>
              <NavLink to="/admin/settings" className={({ isActive }) => isActive ? styles.active : ''}>
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
                  <NavLink to="/admin/pos" className={({ isActive }) => isActive ? styles.active : ''}>
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
        <span>{user ? user.name : 'Invitado'}</span>
        <button onClick={logout} className={styles.logoutButton}>
          <LogOut size={20} />
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
