import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import BottomNavBar from './BottomNavBar';
import styles from '../../../styles/admin/v2/DashboardLayout.module.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DashboardLayout = () => {
  return (
    <div className={styles.dashboardLayout}>
      <div className={styles.mobileHidden}>
        <Sidebar />
      </div>
      <div className={styles.mainContent}>
        <main className={styles.pageContent}>
          <Outlet />
        </main>
      </div>
      <BottomNavBar />
      <ToastContainer />
    </div>
  );
};

export default DashboardLayout;
