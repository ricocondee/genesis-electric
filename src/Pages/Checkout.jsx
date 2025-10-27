import React from 'react';
import styles from '../styles/Checkout.module.css';
import CheckoutForm from '../components/CheckoutForm';
import OrderSummary from '../components/OrderSummary';

const Checkout = () => {
  return (
    <div className={styles.container}>
      <h1>Finalizar Compra</h1>
      <div className={styles.mainLayout}>
        <div className={styles.leftColumn}>
          <CheckoutForm />
        </div>
        <div className={styles.rightColumn}>
          <OrderSummary />
        </div>
      </div>
    </div>
  );
};

export default Checkout;