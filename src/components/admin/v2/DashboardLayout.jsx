import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import BottomNavBar from './BottomNavBar';
import styles from '../../../styles/admin/v2/DashboardLayout.module.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className={styles.dashboardLayout}>
      <div className={`${styles.sidebarWrapper} ${isSidebarOpen ? styles.open : ''}`}>
        <Sidebar onClose={() => setIsSidebarOpen(false)} />
      </div>
      
      {/* Overlay for mobile when sidebar is open */}
      {isSidebarOpen && (
        <div className={styles.overlay} onClick={() => setIsSidebarOpen(false)} />
      )}

      <div className={styles.mainContent}>
        <main className={styles.pageContent}>
          <Outlet />
        </main>
      </div>
      <BottomNavBar onMenuClick={() => setIsSidebarOpen(true)} />
      <ToastContainer />
    </div>
  );
};

export default DashboardLayout;
