import React from 'react';
import styles from '../../../../styles/admin/v2/pos/CustomerSearch.module.css';

const CustomerSearch = ({ searchTerm, onSearchChange, results, onSelectCustomer, selectedCustomer, onClearCustomer, onAddNewCustomer }) => {

  return (
    <div className={styles.container}>
      <h3>Cliente</h3>
      {selectedCustomer ? (
        <div className={styles.selectedCustomer}>
          <div className={styles.customerDetails}>
            <span className={styles.customerName}>{selectedCustomer.name} {selectedCustomer.lastname}</span>
            <span className={styles.customerInfo}>{selectedCustomer.email}</span>
            <span className={styles.customerInfo}>{selectedCustomer.phone}</span>
          </div>
          <button onClick={onClearCustomer} className={styles.changeButton}>Cambiar</button>
        </div>
      ) : (
        <div className={styles.searchWrapper}>
          <input 
            type="text"
            placeholder="Ej. Juan Pérez, 1023456789 o juan@email.com"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className={styles.searchInput}
          />
          {results.length > 0 && (
            <div className={styles.resultsContainer}>
              {results.map(customer => (
                <div key={customer._id} className={styles.resultItem} onClick={() => onSelectCustomer(customer)}>
                  <span>{customer.name} {customer.lastname}</span>
                  <span>{customer.nationalId}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      {!selectedCustomer && 
        <button onClick={onAddNewCustomer} className={styles.addButton}>Crear Nuevo Cliente</button>
      }
    </div>
  );
};

export default CustomerSearch;