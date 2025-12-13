import { useState, useMemo, useEffect, useCallback } from 'react';
import styles from '../../../styles/admin/v2/POS.module.css';
import ProductCatalog from './pos/ProductCatalog';
import OrderSummary from './pos/OrderSummary';
import CustomerSearch from './pos/CustomerSearch';
import PaymentConfirmationModal from './pos/PaymentConfirmationModal';
import ReceiptModal from './pos/ReceiptModal';
import axiosInstance from '../../../api/axios';
import { showToast } from '../../../utils/toast';
import { useDebounce } from '../../../hooks/useDebounce';
import useWompi from '../../../hooks/useWompi';

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
  const [isWompiReady, setIsWompiReady] = useState(false);

  const wompiStatus = useWompi();

  useEffect(() => {
    if (wompiStatus === 'ready') {
      setIsWompiReady(true);
    } else if (wompiStatus === 'error' || wompiStatus === 'timeout') {
      showToast('Error cargando el método de pago Wompi. Por favor recarga la página.', 'error');
    }
  }, [wompiStatus]);

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

  const handleWompiPayment = async () => {
    const orderData = {
      customerId: selectedCustomer._id,
      items: cartItems.map(item => ({
        productId: item._id,
        name: item.name,
        quantity: item.quantity,
        price: item.netPrice,
        subtotal: item.quantity * item.netPrice,
      })),
      shippingAddress: {
        fullName: selectedCustomer.name,
        address: selectedCustomer.address?.street || 'N/A',
        city: selectedCustomer.address?.city || 'N/A',
        postalCode: selectedCustomer.address?.postalCode || 'N/A',
        country: selectedCustomer.address?.country || 'Colombia',
      },
      paymentMethod: 'Wompi',
    };

    try {
      const orderResponse = await axiosInstance.post('/pos/orders', orderData);
      const orderNumber = orderResponse.data.orderNumber;

      const amountInCents = Math.round(totalAfterDiscount * 100);

      const { data } = await axiosInstance.post('/wompi/generate-signature', {
        amount_in_cents: amountInCents,
        currency: 'COP',
        reference: orderNumber,
        customer_email: selectedCustomer.email,
      });

      const integritySignature = data.signature;

      const checkout = new WidgetCheckout({
        currency: 'COP',
        amountInCents,
        reference: orderNumber,
        publicKey: import.meta.env.VITE_WOMPI_PUBLIC_KEY,
        signature: { integrity: integritySignature },
        redirectUrl: `${window.location.origin}/admin/pos`,
      });

      checkout.open((result) => {
        if (result?.transaction?.status === 'APPROVED') {
          showToast('¡Pago con Wompi exitoso!', "success");
          setCartItems([]);
          setSelectedCustomer(null);
        }
      });

    } catch (error) {
      console.error('Error processing Wompi payment:', error);
      showToast('Error al procesar el pago con Wompi.', "error");
    }
  };

  const handleProcessPayment = (paymentMethod) => {
    if (cartItems.length === 0) {
      return showToast('El carrito está vacío.', "error");
    }
    if (!selectedCustomer) {
      return showToast('Por favor, selecciona un cliente.', "error");
    }

    if (paymentMethod === 'Wompi') {
      if (isWompiReady) {
        handleWompiPayment();
      } else {
        showToast('El método de pago Wompi no está listo. Por favor espere.', 'warn');
      }
    } else {
      setSelectedPaymentMethod(paymentMethod);
      setShowPaymentModal(true);
    }
  };

  const onConfirmPayment = async (paymentInfo) => {
    const orderData = {
      customerId: selectedCustomer._id,
      items: cartItems.map(item => ({
        productId: item._id,
        name: item.name,
        quantity: item.quantity,
        price: item.netPrice,
        subtotal: item.quantity * item.netPrice,
      })),
      shippingAddress: {
        fullName: selectedCustomer.name,
        address: selectedCustomer.address?.street || 'N/A',
        city: selectedCustomer.address?.city || 'N/A',
        postalCode: selectedCustomer.address?.postalCode || 'N/A',
        country: selectedCustomer.address?.country || 'Colombia',
      },
      paymentMethod: selectedPaymentMethod,
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
