import { useState } from 'react';
import AccordionMenu from './AccordionMenu';
import HeroSliderSettings from './HeroSliderSettings';
import StaffManagement from './StaffManagement';
import styles from '../../../styles/admin/v2/SettingsPage.module.css';

const Settings = () => {
  const [selectedSetting, setSelectedSetting] = useState('slides');

  const renderSetting = () => {
    switch (selectedSetting) {
      case 'slides':
        return <HeroSliderSettings />;
      case 'staff':
        return <StaffManagement />;
      default:
        return <HeroSliderSettings />;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <AccordionMenu onSelect={setSelectedSetting} />
      </div>
      <div className={styles.content}>
        {renderSetting()}
      </div>
    </div>
  );
};

export default Settings;
