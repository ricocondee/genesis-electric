import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../../api/axios';
import styles from '../../../styles/admin/ServiceOrderDetail.module.css';
import logo from '../../../assets/logo.png';
import { showToast } from '../../../utils/toast';

const ServiceOrderDetail = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axiosInstance.get(`/service-orders/${id}`);
        setOrder(response.data);
      } catch (error) {
        showToast('Error fetching service order:' + error.message, "error");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-CO', options);
  };

  const formatNationalId = (id) => {
    return id; // Placeholder for now
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(value);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!order) {
    return <div>Order not found.</div>;
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
          <div>
            <h1>Orden de Servicio #{order.orderNumber}</h1>
                      <p><strong>Fecha:</strong> {formatDate(order.createdAt)}</p>
                    </div>
                    <img src={logo} alt="Génesis Electric Logo" />        </header>

        <div className={styles.sectionTitle}>Información del Cliente</div>
        <table className={styles.infoSection}>
          <tbody>
            <tr>
              <th>Nombre</th><td>{order.firstName} {order.lastName}</td>
              <th>Cédula / NIT</th><td>{formatNationalId(order.natId)}</td>
            </tr>
            <tr>
              <th>Correo Electrónico</th><td>{order.email || "N/A"}</td>
              <th>Teléfono</th><td>{order.phone || "N/A"}</td>
            </tr>
            <tr>
              <th>Dirección</th><td colSpan="3">{order.address || "N/A"}</td>
            </tr>
          </tbody>
        </table>

        <div className={styles.sectionTitle}>Detalles del Servicio</div>
        <table className={styles.detailsTable}>
          <tbody>
            <tr><th>Tipo de Servicio</th><td>{order.serviceType || "N/A"}</td></tr>
            <tr><th>Tipo de Equipo</th><td>{order.equipmentType || "N/A"}</td></tr>
            <tr><th>Marca</th><td>{order.brand || "N/A"}</td></tr>
            <tr><th>Capacidad</th><td>{order.capacity || "N/A"}</td></tr>
            <tr><th>Voltaje</th><td>{order.voltage || "N/A"}</td></tr>
            <tr><th>Refrigerante</th><td>{order.refrigerant || "N/A"}</td></tr>
            <tr><th>Amperaje</th><td>{order.amperage || "N/A"}</td></tr>
            <tr><th>Temperatura</th><td>{order.temperature || "N/A"}</td></tr>
            <tr><th>Presión</th><td>{order.pressure ? order.pressure + " PSI" : "N/A"}</td></tr>
            <tr><th>Ubicación</th><td>{order.location || "N/A"}</td></tr>
            <tr><th>Técnico Asignado</th><td>{order.username || "N/A"}</td></tr>
          </tbody>
        </table>

        <div className={styles.sectionTitle}>Descripción y Costo</div>
        <table className={`${styles.detailsTable} ${styles.highlight}`}>
          <tbody>
            <tr><th>Descripción</th><td>{order.description || "N/A"}</td></tr>
            <tr><th>Costo Total</th><td><strong>{formatCurrency(order.cost)}</strong></td></tr>
          </tbody>
        </table>

        <div className={styles.signatureBlock}>
          {order.signature ? <img src={order.signature} alt="Firma del Cliente" /> : "<p>Sin firma registrada</p>"}
          <div className={styles.signatureLine}></div>
          <p><strong>{order.firstName} {order.lastName}</strong></p>
          <p>C.C. {formatNationalId(order.natId)}</p>
        </div>

        <div className={styles.footer}>
          <p>Documento generado automáticamente por <strong>Génesis Electric S.A.S.</strong></p>
          <p>Usuario: {order.username || "N/A"} | Fecha: {new Date(order.createdAt).toLocaleString("es-CO")} | IP: {order.ip || "N/A"}</p>
          <p>Barranquilla, Colombia</p>
        </div>
      </div>
  );
};

export default ServiceOrderDetail;
