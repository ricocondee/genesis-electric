
import styles from '../../../../styles/admin/v2/pos/Payment.module.css';

const Payment = ({ selectedPaymentMethod, setSelectedPaymentMethod }) => {
  const paymentMethods = ['cash', 'credit_card', 'Wompi', 'Other'];

  return (
    <div className={styles.container}>
      <h3>Método de Pago</h3>
      <div className={styles.buttonGroup}>
        {paymentMethods.map(method => (
          <button 
            key={method}
            onClick={() => setSelectedPaymentMethod(method)}
            className={`${styles.paymentButton} ${selectedPaymentMethod === method ? styles.active : ''}`}>
            {method}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Payment;
