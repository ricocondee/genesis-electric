
import styles from '../../../../styles/admin/v2/layout/TopBar.module.css';
import { Search, Bell, Settings } from 'lucide-react';

const TopBar = () => {
  return (
    <div className={styles.topBar}>
      <div className={styles.searchBar}>
        <Search size={20} className={styles.searchIcon} />
        <input type="text" placeholder="Buscar..." />
      </div>
      <div className={styles.userActions}>
        <button className={styles.actionButton}><Bell size={20} /></button>
        <button className={styles.actionButton}><Settings size={20} /></button>
        <div className={styles.userProfile}>
          {/* <img src="/avatar.png" alt="User Avatar" /> */}
        </div>
      </div>
    </div>
  );
};

export default TopBar;
