import React from 'react';
import Modal from 'react-modal';
import ServiceOrderForm from './ServiceOrderForm';
import styles from '../styles/ServiceOrderModal.module.css';

Modal.setAppElement('#root');

const ServiceOrderModal = ({ isOpen, onRequestClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName={styles.overlay}
      className={styles.modal}
    >
      <ServiceOrderForm onClose={onRequestClose} />
    </Modal>
  );
};

export default ServiceOrderModal;
