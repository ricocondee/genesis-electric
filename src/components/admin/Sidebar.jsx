
import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from '../../styles/admin/Sidebar.module.css';
import { Home, Store, DollarSign, Users, BarChart2, Megaphone, Settings, ShoppingBag } from 'lucide-react';

const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
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
                <NavLink to="/admin/orders" className={({ isActive }) => isActive ? styles.active : ''}>
                  <DollarSign size={20} />
                  <span>Pedidos</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/admin/service-orders" className={({ isActive }) => isActive ? styles.active : ''}>
                  <ShoppingBag size={20} />
                  <span>Órdenes de Servicio</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/admin/inventory" className={({ isActive }) => isActive ? styles.active : ''}>
                  <Store size={20} />
                  <span>Inventario</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/admin/discounts" className={({ isActive }) => isActive ? styles.active : ''}>
                  <BarChart2 size={20} />
                  <span>Descuentos</span>
                </NavLink>
              </li>
            </ul>
          </li>
          <li>
            <NavLink to="/admin/finance" className={({ isActive }) => isActive ? styles.active : ''}>
              <DollarSign size={20} />
              <span>Finanzas</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/customers" className={({ isActive }) => isActive ? styles.active : ''}>
              <Users size={20} />
              <span>Clientes</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/analytics" className={({ isActive }) => isActive ? styles.active : ''}>
              <BarChart2 size={20} />
              <span>Reportes Analíticos</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/marketing" className={({ isActive }) => isActive ? styles.active : ''}>
              <Megaphone size={20} />
              <span>Mercadeo</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/settings" className={({ isActive }) => isActive ? styles.active : ''}>
              <Settings size={20} />
              <span>Configuración</span>
            </NavLink>
          </li>
          <li className={styles.navGroup}>
            <span className={styles.groupTitle}>Canales de Venta</span>
            <ul>
              <li>
                <NavLink to="/admin/online-store" className={({ isActive }) => isActive ? styles.active : ''}>
                  <Store size={20} />
                  <span>Tienda en Línea</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/admin/pos" className={({ isActive }) => isActive ? styles.active : ''}>
                  <ShoppingBag size={20} />
                  <span>Punto de Venta</span>
                </NavLink>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
