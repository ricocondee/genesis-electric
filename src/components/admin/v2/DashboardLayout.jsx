import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import styles from '../../../styles/admin/v2/DashboardLayout.module.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={styles.dashboardLayout}>
      <Sidebar isOpen={isSidebarOpen} />
      <div className={`${styles.mainContent} ${isSidebarOpen ? styles.sidebarOpen : ''}`}>
        <Topbar onMenuClick={toggleSidebar} />
        <main className={styles.pageContent}>
          <Outlet />
        </main>
      </div>
      <div className={`${styles.overlay} ${isSidebarOpen ? styles.sidebarOpen : ''}`} onClick={toggleSidebar}></div>
      <ToastContainer />
    </div>
  );
};

export default DashboardLayout;
