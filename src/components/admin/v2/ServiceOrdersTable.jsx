import React from 'react';
import styles from '../../../styles/admin/v2/ServiceOrdersTable.module.css';
import { MoreVertical, Pencil, Trash2 } from 'lucide-react';

const ServiceOrdersTable = ({ orders }) => {

  const getStatusClass = (status) => {
    switch (status) {
      case 'Pendiente':
        return styles.statusDraft;
      case 'En progreso':
        return styles.statusPublished;
      case 'Completado':
        return styles.statusStockOut;
      default:
        return '';
    }
  };

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th><input type="checkbox" className={styles.checkbox} /></th>
            <th>Cliente</th>
            <th>Fecha</th>
            <th>Técnico</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td><input type="checkbox" className={styles.checkbox} /></td>
              <td>{order.customer ? order.customer.name : `${order.firstName} ${order.lastName}`}</td>
              <td>{new Date(order.createdAt).toLocaleDateString()}</td>
              <td>{order.technician}</td>
              <td>
                <span className={`${styles.statusLabel} ${getStatusClass(order.status)}`}>
                  {order.status}
                </span>
              </td>
              <td>
                <div className={styles.actionsCell}>
                  <button className={styles.actionButton}>
                    <Pencil size={20} />
                  </button>
                  <button className={styles.actionButton}>
                    <Trash2 size={20} />
                  </button>
                  <button className={styles.actionButton}>
                    <MoreVertical size={20} />
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

export default ServiceOrdersTable;
