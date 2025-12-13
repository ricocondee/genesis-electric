import { useState, useEffect, useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axiosInstance from '../api/axios';
import { useCart } from '../context/CartContext';
import styles from '../styles/OrderStatus.module.css';
import Loader from '../components/Loader';
import { showToast } from '../utils/toast';
import { CheckCircle2, Download, ArrowLeft } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const OrderStatus = () => {
  console.log('Styles object:', styles);
  const [status, setStatus] = useState('loading');
  const [orderData, setOrderData] = useState(null);
  const [transactionIdFromUrl, setTransactionIdFromUrl] = useState(null);
  const location = useLocation();
  const { clearCart } = useCart();
  const receiptRef = useRef(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const transactionId = searchParams.get('id');
    setTransactionIdFromUrl(transactionId);

    if (!transactionId) {
      setStatus('error');
      return;
    }

    const verifyPayment = async () => {
      try {
        const response = await axiosInstance.get(`/wompi/verify-payment/${transactionId}`);
        setOrderData(response.data.data);
        if (response.data.data.transaction.status === 'APPROVED') {
          setStatus('approved');
          clearCart();
        } else {
          setStatus('declined');
        }
      } catch (error) {
        setStatus('error');
        showToast(error.response?.data?.message || 'Error al verificar el pago.', 'error');
      }
    };

    verifyPayment();
  }, [location, clearCart]);

  const handleDownloadPdf = () => {
    const input = receiptRef.current;
    html2canvas(input, { backgroundColor: '#FFFFFF' })
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`comprobante-orden-${orderData.transaction.reference}.pdf`);
      });
  };

  if (status === 'loading') {
    return <Loader />;
  }

  console.log('Current Status:', status);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  return (
    <div className={styles.pageContainer}>
      {status === 'approved' && orderData && (
        <div className={styles.card} ref={receiptRef}>
          <div className={styles.header}>
            <CheckCircle2 size={64} className={styles.successIcon} />
            <h1 className={styles.title}>¡Pago Exitoso!</h1>
            <p className={styles.subtitle}>Tu pago ha sido realizado exitosamente.</p>
            <p className={styles.reference}>Referencia: {orderData.transaction.reference}</p>
          </div>

          <div className={styles.content}>
            <div className={styles.infoGrid}>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Pago Total</span>
                <span className={styles.infoValue}>${orderData.order?.totalPrice.toLocaleString('es-CO')}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>ID de Transacción</span>
                <span className={styles.infoValue}>{orderData.transaction.id}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Fecha y Hora del Pago</span>
                <span className={styles.infoValue}>{formatDate(orderData.transaction.created_at)}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Método de Pago</span>
                <span className={styles.infoValue}>{orderData.transaction.payment_method_type}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Nombre del Remitente</span>
                <span className={styles.infoValue}>{orderData.order?.shippingAddress.fullName}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Monto</span>
                <span className={styles.infoValue}>${(orderData.transaction.amount_in_cents / 100).toLocaleString('es-CO')}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Tarifa Administrativa</span>
                <span className={styles.infoValue}>$0</span>
              </div>
            </div>

            <button onClick={handleDownloadPdf} className={styles.downloadButton}>
              <Download size={20} />
              Obtener Recibo en PDF
            </button>
          </div>
        </div>
      )}
      {status === 'declined' && orderData && (
        <div className={styles.card}>
          <div className={`${styles.header} ${styles.declinedHeader}`}>
            <ArrowLeft size={64} className={styles.declinedIcon} />
            <h1 className={styles.title}>Pago Rechazado</h1>
            <p className={styles.subtitle}>Lo sentimos, tu pago ha sido rechazado.</p>
            <p className={styles.reference}>Referencia: {orderData.transaction.reference}</p>
          </div>

          <div className={styles.content}>
            <div className={styles.infoGrid}>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>ID de Transacción</span>
                <span className={styles.infoValue}>{orderData.transaction.id}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Estado</span>
                <span className={styles.infoValue}>{orderData.transaction.status_message || orderData.transaction.status}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Monto</span>
                <span className={styles.infoValue}>${(orderData.transaction.amount_in_cents / 100).toLocaleString('es-CO')}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Método de Pago</span>
                <span className={styles.infoValue}>{orderData.transaction.payment_method_type}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Fecha del Intento</span>
                <span className={styles.infoValue}>{formatDate(orderData.transaction.created_at)}</span>
              </div>
            </div>

            <Link to="/checkout" className={styles.retryButton}>
              <ArrowLeft size={20} />
              Intentar de nuevo
            </Link>
          </div>
        </div>
      )}
      {status === 'error' && (
        <div className={styles.error}>
          <h2>Error</h2>
          <p>Ocurrió un error al procesar tu pago.</p>
          <Link to="/checkout">Intentar de nuevo</Link>
        </div>
      )}
    </div>
  );
};

export default OrderStatus;
