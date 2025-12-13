

import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../components/admin/Sidebar';
import styles from '../styles/admin/DashboardLayout.module.css';
import BackButton from '../components/BackButton.jsx';

const DashboardLayout = () => {
  const location = useLocation();
  const rootAdminPaths = ['/admin', '/admin/products', '/admin/service-orders', '/admin/settings'];
  const showBackButton = !rootAdminPaths.includes(location.pathname);

  return (
    <div className={styles.dashboardLayout}>
      <Sidebar />
      <main className={styles.mainContent}>
        {showBackButton && <BackButton />}
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
