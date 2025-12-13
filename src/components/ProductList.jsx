
import styles from '../styles/ProductList.module.css';
import Item from './Item';
import Void from './Void';

const ProductList = ({ products }) => {

  return (
    <div>
      {products.length > 0 ? (
        <div className={styles.container}>
          {products.map((product) => (
            <Item
                key={product._id}
                name={product.name}
                image={product.image}
                price={product.clientPrice}
                iva={product.IVA}
                netPrice={product.netPrice}
                description={product.description}
                urlID={product._id}
                status={product.status}
                stockQuantity={product.quantity}
                specs={product.specs}
            />
          ))}
        </div>
      ) : (
        <div className={styles.emptyContainer}>
          <Void
            message="No encontramos productos con estos filtros"
            suggestion="Intenta con una búsqueda diferente o ajusta los filtros."
          />
        </div>
      )}
    </div>
  );
};

export default ProductList;