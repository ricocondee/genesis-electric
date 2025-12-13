
import styles from '../../../styles/admin/v2/ProductsTable.module.css';
import { MoreVertical, Pencil, Trash2, Thermometer, Zap, Palette, Leaf, Wind, Cpu, Wifi, Building2, Plug, Package } from 'lucide-react';

const specIcons = {
  btu: <Thermometer size={16} />,
  voltage: <Zap size={16} />,
  color: <Palette size={16} />,
  seer: <Leaf size={16} />,
  refrigerant: <Wind size={16} />,
  system: <Cpu size={16} />,
  wifi: <Wifi size={16} />,
  brand: <Building2 size={16} />,
  energyType: <Plug size={16} />,
  default: <Package size={16} />,
};

const specTranslations = {
  btu: "BTU",
  voltage: "Voltaje",
  color: "Color",
  seer: "SEER",
  refrigerant: "Refrigerante",
  system: "Sistema",
  wifi: "Wi-Fi",
  brand: "Marca",
  energyType: "Tipo de energía",
};

const ProductsTable = ({ products, onEdit, onDelete, canDelete, onStatusChange }) => {

  const getStatusClass = (status) => {
    switch (status) {
      case 'publicado':
        return styles.statusPublished;
      case 'borrador':
        return styles.statusDraft;
      case 'inactivo':
        return styles.statusInactive;
      case 'agotado':
        return styles.statusStockOut;
      default:
        return '';
    }
  };

  const getStockClass = (quantity) => {
    if (quantity === 0) {
      return styles.stockOut;
    }
    if (quantity < 10) {
      return styles.lowStock;
    }
    return styles.inStock;
  };

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th><input type="checkbox" className={styles.checkbox} /></th>
            <th>Nombre del Producto</th>
            <th>SKU</th>
            <th>Marca</th>
            <th>Categoría</th>
            <th>Inventario</th>
            <th>Precio Proveedor</th>
            <th>Estado</th>
            <th>Especificaciones</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className={styles.productRow}>
              {/* Mobile Card View */}
              <td className={styles.mobileCardCell}>
                <div className={styles.mobileCard}>
                  <img src={product.image} alt={product.name} className={styles.productImage} />
                  <div className={styles.productInfo}>
                    <span className={styles.productName}>{product.name}</span>
                    <span className={styles.productPrice}>${product.providersPrice.toLocaleString('es-CO')}</span>
                  </div>
                  <div className={styles.productActions}>
                    <button className={styles.editButton} onClick={() => onEdit(product)}>
                      Editar
                    </button>
                    {canDelete && (
                      <button className={styles.deleteButton} onClick={() => onDelete(product.id)}>
                        <Trash2 size={20} />
                      </button>
                    )}
                  </div>
                  <div className={styles.productStock}>
                    <span className={getStockClass(product.quantity)}>
                      {product.quantity > 0 ? 'En stock' : 'Agotado'}
                    </span>
                    <div 
                      className={`${styles.toggleSwitch} ${product.status === 'publicado' ? styles.toggleOn : ''}`}
                      onClick={() => onStatusChange(product.id, product.status === 'publicado' ? 'inactivo' : 'publicado')}
                    ></div>
                  </div>
                </div>
              </td>

              {/* Desktop Table Row */}
              <td className={styles.desktopCell}><input type="checkbox" className={styles.checkbox} /></td>
              <td className={styles.desktopCell} data-label="Nombre del Producto">
                <div className={styles.productCell}>
                  <img src={product.image} alt={product.name} className={styles.productImage} />
                  <span>{product.name}</span>
                </div>
              </td>
              <td className={styles.desktopCell} data-label="SKU">{product.SKU}</td>
              <td className={styles.desktopCell} data-label="Marca">{product.brand}</td>
              <td className={styles.desktopCell} data-label="Categoría">{product.category}</td>
              <td className={styles.desktopCell} data-label="Inventario">
                <span className={getStockClass(product.quantity)}>
                  {product.quantity === 0 ? 'Agotado' : product.quantity < 10 ? `Poco Inventario (${product.quantity})` : product.quantity}
                </span>
              </td>
              <td className={styles.desktopCell} data-label="Precio Proveedor">${product.providersPrice.toLocaleString('es-CO')}</td>
              <td className={styles.desktopCell} data-label="Estado">
                <span className={`${styles.statusLabel} ${getStatusClass(product.status)}`}>
                  {product.status}
                </span>
              </td>
              <td className={styles.desktopCell} data-label="Especificaciones">
                <ul className={styles.specsList}>
                  {product.specs && Object.entries(product.specs).filter(([_, value]) => value).map(([key, value]) => (
                    <li key={key} title={specTranslations[key] || key}>
                      {specIcons[key] || specIcons.default}
                      <span>{value}</span>
                    </li>
                  ))}
                </ul>
              </td>
              <td className={styles.desktopCell} data-label="Acciones">
                <div className={styles.actionsCell}>
                  <button className={styles.actionButton} onClick={() => onEdit(product)}>
                    <Pencil size={20} />
                  </button>
                  {canDelete && (
                    <button className={styles.actionButton} onClick={() => onDelete(product.id)}>
                      <Trash2 size={20} />
                    </button>
                  )}
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
