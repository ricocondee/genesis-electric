
import styles from '../styles/AddressCard.module.css';
import { MapPin, Edit, Trash2 } from 'lucide-react';

const AddressCard = ({ address, onEdit, onDelete }) => {
  return (
    <div className={styles.addressCard}>
      <div className={styles.addressInfo}>
        <MapPin size={20} />
        <p>{address.street}, {address.city}, {address.department}, {address.country}</p>
      </div>
      <div className={styles.actions}>
        <button onClick={() => onEdit(address)} className={styles.actionButton}>
          <Edit size={18} />
        </button>
        <button onClick={() => onDelete(address._id)} className={styles.actionButton}>
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
};

export default AddressCard;
