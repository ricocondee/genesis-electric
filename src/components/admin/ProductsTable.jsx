
import styles from '../../styles/admin/ProductsTable.module.css';
import { MoreVertical, Pencil, Trash2 } from 'lucide-react';

const ProductsTable = ({ products, onEdit, onDelete }) => {

  const capitalizeWords = (str) => {
    if (!str) return '';
    return str.replace(/\b\w/g, char => char.toUpperCase());
  };

  const categoryTranslations = {
    'Inverter': 'Inverter',
    'Convencional': 'Convencional',
    'AirConditioner': 'Aire Acondicionado',
    // Add more translations as needed
  };

  const translateCategory = (category) => {
    return categoryTranslations[category] || category;
  };

  const getStatusClass = (status) => {
    const capitalizedStatus = capitalizeWords(status);
    switch (capitalizedStatus) {
      case 'Publicado':
        return styles.statusPublished;
      case 'Borrador':
        return styles.statusDraft;
      case 'Inactivo':
        return styles.statusInactive;
      case 'Agotado':
        return styles.statusStockOut;
      default:
        return '';
    }
  };

  const getStockClass = (stock) => {
    if (stock === 0) {
      return styles.stockOut;
    }
    if (stock < 10) {
      return styles.lowStock;
    }
    return styles.inStock;
  };

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th><input type="checkbox" /></th>
            <th>Producto</th>
            <th>Categoría</th>
            <th>Inventario</th>
            <th>Precio</th>
            <th>Estado</th>
            <th>Especificaciones</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td><input type="checkbox" /></td>
              <td>
                <div className={styles.productCell}>
                  <img src={product.image} alt={product.name} className={styles.productImage} />
                  <span>{capitalizeWords(product.name)}</span>
                </div>
              </td>
              <td>{translateCategory(capitalizeWords(product.category))}</td>
              <td>
                <span className={getStockClass(product.quantity)}>
                  {product.quantity === 0 ? 'Agotado' : product.quantity < 10 ? `Poco Inventario (${product.quantity})` : product.quantity}
                </span>
              </td>
              <td>{product.price.toLocaleString('es-CO')}</td>
              <td>
                <span className={`${styles.statusLabel} ${getStatusClass(product.status)}`}>
                  {capitalizeWords(product.status)}
                </span>
              </td>
              <td>
                <ul className={styles.specsList}>
                  {product.specs && Object.entries(product.specs).map(([key, value]) => (
                    <li key={key}>{key}: {value}</li>
                  ))}
                </ul>
              </td>
              <td>
                <div className={styles.actionsCell}>
                  <button className={styles.actionButton} onClick={() => onEdit(product)}>
                    <Pencil size={20} />
                  </button>
                  <button className={styles.actionButton} onClick={() => onDelete(product.id)}>
                    <Trash2 size={20} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsTable;