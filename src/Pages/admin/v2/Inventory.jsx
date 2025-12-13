
import LowStock from '../../../components/admin/v2/inventory/LowStock';
import styles from '../../../styles/admin/v2/Inventory.module.css';

const Inventory = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Inventario</h1>
      <LowStock />
    </div>
  );
};

export default Inventory;
