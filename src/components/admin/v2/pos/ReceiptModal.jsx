
import Modal from 'react-modal';
import styles from '../../../../styles/admin/v2/pos/ReceiptModal.module.css';

const ReceiptModal = ({ isOpen, onRequestClose, receiptData }) => {

  const formatPrice = (price) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handlePrint = () => {
    window.print();
  };

  if (!receiptData) {
    return null;
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName={styles.overlay}
      className={styles.modal}
    >
      <div className={styles.receiptContainer}>
        <h2>Recibo de Venta</h2>
        <p><strong>Orden #:</strong> {receiptData.orderId}</p>
        <p><strong>Fecha:</strong> {new Date(receiptData.date).toLocaleString('es-CO')}</p>
        <hr />
        <h4>Cliente:</h4>
        <p>{receiptData.customer.name}</p>
        <hr />
        <h4>Items:</h4>
        <table className={styles.itemsTable}>
          <tbody>
            {receiptData.items.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.quantity} x {formatPrice(item.price)}</td>
                <td>{formatPrice(item.total)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <hr />
        <div className={styles.totalSection}>
          <p><strong>Total:</strong> {formatPrice(receiptData.total)}</p>
          <p><strong>Método de Pago:</strong> {receiptData.paymentMethod}</p>
        </div>
      </div>
      <div className={styles.buttonGroup}>
        <button onClick={onRequestClose} className={styles.closeButton}>Cerrar</button>
        <button onClick={handlePrint} className={styles.printButton}>Imprimir Recibo</button>
      </div>
    </Modal>
  );
};

export default ReceiptModal;
