import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../api/axios';
import { showToast } from '../../utils/toast';
import styles from '../../styles/admin/v2/AdminOrderDetail.module.css';
import Loader from '../../components/Loader';

const AdminOrderDetail = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(`/orders/${id}`);
        setOrder(response.data);
      } catch (error) {
        showToast('Error al cargar el pedido.', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  const formatDate = (dateString, includeTime = false) => {
    if (!dateString) return 'N/A';
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    if (includeTime) {
      options.hour = 'numeric';
      options.minute = 'numeric';
    }
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  if (loading) {
    return <Loader />;
  }

  if (!order) {
    return <div>No se encontró el pedido.</div>;
  }

  return (
    <div className={styles.container}>
      <h1>Detalle del Pedido #{order.orderNumber}</h1>
      <div className={styles.grid}>
        <div className={styles.customerDetails}>
          <h2>Información del Cliente</h2>
          <p><strong>Nombre:</strong> {order.userId.name}</p>
          <p><strong>Email:</strong> {order.userId.email}</p>
          <p><strong>Dirección:</strong> {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.department}, {order.shippingAddress.country}</p>
        </div>
        <div className={styles.orderDetails}>
          <h2>Detalles del Pedido</h2>
          <p><strong>ID Pedido:</strong> {order._id}</p>
          <p><strong>Número de Pedido:</strong> {order.orderNumber}</p>
          <p><strong>Estado:</strong> <span className={`${styles.status} ${styles[order.status.toLowerCase()]}`}>{order.status}</span></p>
          <p><strong>Total:</strong> ${order.totalPrice.toLocaleString('es-CO')}</p>
          <p><strong>Método de Pago:</strong> {order.paymentInfo?.paymentType}</p>
          {order.paymentInfo?.paymentType === 'Wompi' && order.paymentInfo?.transactionId && (
            <>
              <p><strong>ID Transacción Wompi:</strong> {order.paymentInfo.transactionId}</p>
              <p><strong>Fecha Pago:</strong> {formatDate(order.paidAt, true)}</p>
            </>
          )}
          <p><strong>Fecha Creación:</strong> {formatDate(order.createdAt, true)}</p>
          <p><strong>Última Actualización:</strong> {formatDate(order.updatedAt, true)}</p>
        </div>
      </div>
      <div className={styles.itemsContainer}>
        <h2>Items del Pedido</h2>
        <table className={styles.itemsTable}>
          <thead>
            <tr>
              <th>Producto</th>
              <th>Cantidad</th>
              <th>Precio Unitario</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map(item => (
              <tr key={item._id}>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>${item.price.toLocaleString('es-CO')}</td>
                <td>${item.subtotal.toLocaleString('es-CO')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrderDetail;
