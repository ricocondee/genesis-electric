
import ServiceOrderForm from '../components/ServiceOrderForm';
import styles from '../styles/ServiceOrderPage.module.css';

const ServiceOrder = () => {
  return (
    <div className={styles.container}>
      <h1>Crear Orden de Servicio</h1>
      <ServiceOrderForm />
    </div>
  );
};

export default ServiceOrder;