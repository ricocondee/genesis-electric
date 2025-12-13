
import styles from '../../../styles/admin/v2/Topbar.module.css';
import { Search, Bell, MessageSquare, Settings, Menu } from 'lucide-react';

const Topbar = ({ onMenuClick }) => {
  return (
    <header className={styles.topbar}>
      <div className={styles.leftActions}>
        <button className={styles.menuButton} onClick={onMenuClick}>
          <Menu size={20} />
        </button>
        <div className={styles.searchBar}>
          <Search size={20} className={styles.searchIcon} />
          <input type="text" placeholder="Search..." />
        </div>
      </div>
      <div className={styles.rightActions}>
        <button className={styles.actionButton}>
          <Bell size={20} />
        </button>
        <button className={styles.actionButton}>
          <MessageSquare size={20} />
        </button>
        <button className={styles.actionButton}>
          <Settings size={20} />
        </button>
      </div>
    </header>
  );
};

export default Topbar;
