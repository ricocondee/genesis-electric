import React, { useState, useMemo, useEffect, useCallback } from 'react';
import styles from '../../../styles/admin/v2/POS.module.css';
import ProductCatalog from './pos/ProductCatalog';
import OrderSummary from './pos/OrderSummary';
import CustomerSearch from './pos/CustomerSearch';
import PaymentConfirmationModal from './pos/PaymentConfirmationModal';
import ReceiptModal from './pos/ReceiptModal';
import axiosInstance from '../../../api/axios';
import { showToast } from '../../../utils/toast';
import { useDebounce } from '../../../hooks/useDebounce';

const POS = () => {
  const [cartItems, setCartItems] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [receiptData, setReceiptData] = useState(null);
  const [customerSearchTerm, setCustomerSearchTerm] = useState('');
  const [customerResults, setCustomerResults] = useState([]);
  const [showCustomerForm, setShowCustomerForm] = useState(false);
  const [discount, setDiscount] = useState(0);
  const debouncedCustomerSearchTerm = useDebounce(customerSearchTerm, 300);

  useEffect(() => {
    if (!debouncedCustomerSearchTerm) {
      setCustomerResults([]);
      return;
    }

    const fetchCustomers = async () => {
      try {
        const { data } = await axiosInstance.get(`/customers?search=${debouncedCustomerSearchTerm}`);
        setCustomerResults(data.customers);
      } catch (error) {
        showToast('Error fetching customers:' + error.message, "error");
      }
    };

    fetchCustomers();
  }, [debouncedCustomerSearchTerm]);

  const onSelectCustomer = (customer) => {
    setSelectedCustomer(customer);
    setCustomerSearchTerm('');
    setCustomerResults([]);
  };

  const onClearCustomer = () => {
    setSelectedCustomer(null);
  };

  const onAddProduct = useCallback((product) => {
    setCartItems(prevItems => {
      const exist = prevItems.find(item => item._id === product._id);
      if (exist) {
        if (exist.quantity < product.quantity) {
          return prevItems.map(item => 
            item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
          );
        } else {
          showToast(`No hay más stock para ${product.name}`, "warn");
          return prevItems;
        }
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  }, []);

  const onUpdateQuantity = useCallback((productId, quantity) => {
    setCartItems(prevItems => {
      const itemToUpdate = prevItems.find(item => item._id === productId);
      if (itemToUpdate && quantity > itemToUpdate.quantity) {
        showToast(`No hay más stock para ${itemToUpdate.name}`, "warn");
        return prevItems;
      }
      return prevItems.map(item => 
        item._id === productId ? { ...item, quantity } : item
      ).filter(item => item.quantity > 0)
    });
  }, []);

  const onRemoveItem = useCallback((productId) => {
    setCartItems(prevItems => prevItems.filter(item => item._id !== productId));
  }, []);

  const cartTotal = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.netPrice * item.quantity, 0);
  }, [cartItems]);

  const totalAfterDiscount = useMemo(() => {
    return cartTotal - discount;
  }, [cartTotal, discount]);

  const handleProcessPayment = (paymentMethod) => {
    if (cartItems.length === 0) {
      return showToast('El carrito está vacío.', "error");
    }
    if (!selectedCustomer) {
      return showToast('Por favor, selecciona un cliente.', "error");
    }
    setSelectedPaymentMethod(paymentMethod);
    setShowPaymentModal(true);
  };

  const onConfirmPayment = async (paymentInfo) => {
    const orderData = {
      customerId: selectedCustomer._id,
      items: cartItems.map(item => ({
        productId: item._id,
        name: item.name,
        quantity: item.quantity,
        price: item.netPrice,
      })),
      paymentMethod: selectedPaymentMethod,
      paymentInfo: paymentInfo,
      totalPrice: totalAfterDiscount,
      discount: discount,
    };

    try {
      const response = await axiosInstance.post('/pos/orders', orderData);
      const createdOrder = response.data.order;
      showToast('¡Orden creada con éxito!', "success");
      setCartItems([]);
      setSelectedCustomer(null);
      setShowPaymentModal(false);

      const receiptResponse = await axiosInstance.get(`/orders/${createdOrder._id}/receipt`);
      setReceiptData(receiptResponse.data);
      setShowReceiptModal(true);

    } catch (error) {
      showToast('Error al crear la orden.', "error");
    }
  };

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.pageTitle}>Punto de Venta (POS)</h1>
      <div className={styles.container}>
        <div className={styles.leftColumn}>
          <ProductCatalog onAddProduct={onAddProduct} />
        </div>
        <div className={styles.rightColumn}>
          <CustomerSearch 
            searchTerm={customerSearchTerm}
            onSearchChange={setCustomerSearchTerm}
            results={customerResults}
            onSelectCustomer={onSelectCustomer}
            selectedCustomer={selectedCustomer}
            onClearCustomer={onClearCustomer}
            onAddNewCustomer={() => setShowCustomerForm(true)}
          />
          <OrderSummary 
            cartItems={cartItems} 
            onUpdateQuantity={onUpdateQuantity} 
            onRemoveItem={onRemoveItem} 
            cartTotal={cartTotal} 
            discount={discount}
            setDiscount={setDiscount}
            onProcessPayment={handleProcessPayment}
            selectedPaymentMethod={selectedPaymentMethod}
            setSelectedPaymentMethod={setSelectedPaymentMethod}
          />
        </div>
      </div>
      {showPaymentModal && (
        <PaymentConfirmationModal 
          isOpen={showPaymentModal}
          onRequestClose={() => setShowPaymentModal(false)}
          onConfirm={onConfirmPayment}
          cartTotal={totalAfterDiscount}
          paymentMethod={selectedPaymentMethod}
        />
      )}
      {showReceiptModal && (
        <ReceiptModal 
          isOpen={showReceiptModal}
          onRequestClose={() => setShowReceiptModal(false)}
          receiptData={receiptData}
        />
      )}
      {showCustomerForm && <CustomerForm onClose={() => setShowCustomerForm(false)} onSave={onSelectCustomer} />}
    </div>
  );
};

export default POS;
