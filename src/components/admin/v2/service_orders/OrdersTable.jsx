import { useState } from 'react';
import styles from '../../../../styles/admin/v2/service_orders/OrdersTable.module.css';
import { Edit, Trash, MoreVertical } from 'lucide-react';

const OrdersTable = ({ orders }) => {
  const [activeRow, setActiveRow] = useState(null);

  const handleMoreClick = (orderId) => {
    setActiveRow(activeRow === orderId ? null : orderId);
  };

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Fecha</th>
            <th>Técnico</th>
            <th className={styles.actionsHeader}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order._id}>
              <td data-label="Cliente">{order.firstName} {order.lastName}</td>
              <td data-label="Fecha">{new Date(order.createdAt).toLocaleDateString()}</td>
              <td data-label="Técnico">{order.username}</td>
              <td className={styles.actionsCell}>
                {activeRow === order._id && (
                  <>
                    <button className={styles.actionButton}><Edit size={16} /></button>
                    <button className={styles.actionButton}><Trash size={16} /></button>
                  </>
                )}
                <button className={styles.actionButton} onClick={() => handleMoreClick(order._id)}><MoreVertical size={16} /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersTable;