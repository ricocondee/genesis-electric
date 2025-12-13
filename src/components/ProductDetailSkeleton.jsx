
import styles from '../styles/Skeleton.module.css';

const ProductDetailSkeleton = () => {
  return (
    <div className={styles.productDetailContainer}>
      <div className={styles.productDetailImage} />
      <div className={styles.productDetailInfo}>
        <div className={styles.productDetailTitle} />
        <div className={styles.productDetailPrice} />
        <div className={styles.productDetailDescription} />
        <div className={styles.productDetailDescription} />
        <div className={styles.productDetailDescription} />
      </div>
    </div>
  );
};

export default ProductDetailSkeleton;
