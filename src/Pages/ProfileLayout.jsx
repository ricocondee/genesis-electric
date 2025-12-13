
import { Outlet } from 'react-router-dom';
import ProfileSidebar from '../components/ProfileSidebar';
import styles from '../styles/ProfileLayout.module.css';

const ProfileLayout = () => {
  return (
    <div className={styles.profileLayoutContainer}>
      <ProfileSidebar />
      <div className={styles.profileContent}>
        <Outlet />
      </div>
    </div>
  );
};

export default ProfileLayout;
