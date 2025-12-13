
import { Link } from 'react-router-dom';
import styles from '../styles/FavoriteCard.module.css';
import { Trash2 } from 'lucide-react';

const FavoriteCard = ({ product, onRemove }) => {
  const { _id, name, imageUrl, price, specs } = product;

  const handleRemove = () => {
    onRemove(_id);
  };

  return (
    <div className={styles.card}>
      <button className={styles.removeButton} onClick={handleRemove}>
        <Trash2 size={20} />
      </button>
      <Link to={`/products/${_id}`} className={styles.imageContainer}>
        <img src={imageUrl} alt={name} />
      </Link>
      <div className={styles.cardContent}>
        <Link to={`/products/${_id}`}>
          <h3 className={styles.productName}>{name}</h3>
        </Link>
        <div className={styles.specs}>
          {specs && Object.entries(specs).slice(0, 2).map(([key, value]) => (
            <div key={key} className={styles.spec}>
              <strong>{key}:</strong> {value}
            </div>
          ))}
        </div>
        <div className={styles.footer}>
          <span className={styles.price}>${price.toLocaleString('es-CO')}</span>
          <button className={styles.buyButton}>Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default FavoriteCard;
