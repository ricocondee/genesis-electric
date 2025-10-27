import React, { useState } from 'react';
import Modal from 'react-modal';
import styles from '../../../../styles/admin/v2/pos/PaymentConfirmationModal.module.css';

const PaymentConfirmationModal = ({ isOpen, onRequestClose, onConfirm, cartTotal, paymentMethod }) => {
  const [paymentDetails, setPaymentDetails] = useState({ transactionId: '', cardNumber: '', cardFranchise: '' });

  const handleDetailChange = (e) => {
    setPaymentDetails({ ...paymentDetails, [e.target.name]: e.target.value });
  };

  const handleConfirm = () => {
    onConfirm({ ...paymentDetails, paymentType: paymentMethod });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName={styles.overlay}
      className={styles.modal}
    >
      <h2>Confirmar Pago</h2>
      <p><strong>Total a Pagar:</strong> {formatPrice(cartTotal)}</p>
      <p><strong>Método de Pago:</strong> {paymentMethod}</p>
      
      {paymentMethod === 'Credit Card' && (
        <div className={styles.detailsForm}>
          <input name="transactionId" value={paymentDetails.transactionId} onChange={handleDetailChange} placeholder="ID de Transacción" />
          <input name="cardNumber" value={paymentDetails.cardNumber} onChange={handleDetailChange} placeholder="Últimos 4 dígitos" />
          <input name="cardFranchise" value={paymentDetails.cardFranchise} onChange={handleDetailChange} placeholder="Franquicia de la Tarjeta" />
        </div>
      )}

      <div className={styles.buttonGroup}>
        <button onClick={onRequestClose} className={styles.cancelButton}>Cancelar</button>
        <button onClick={handleConfirm} className={styles.confirmButton}>Confirmar Pago Recibido</button>
      </div>
    </Modal>
  );
};

export default PaymentConfirmationModal;
