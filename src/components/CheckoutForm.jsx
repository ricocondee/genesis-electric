import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/CheckoutForm.module.css';
import { useCart } from '../context/CartContext';
import axiosInstance from '../api/axios';
import { showToast } from '../utils/toast';
import { useUser } from '../context/UserContext';
import ConfirmationModal from './ConfirmationModal';
import ColombiaLocationSelect from './ColombiaLocationSelect';
import { calculateShippingCost } from '../utils/shipping';
import useWompi from '../hooks/useWompi';

const CheckoutForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    department: '',
    country: 'Colombia',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isWompiReady, setIsWompiReady] = useState(false);
  const [showUpdateProfileModal, setShowUpdateProfileModal] = useState(false);
  const [missingFields, setMissingFields] = useState([]);
  
  const { cart, clearCart, cartTotal, cartIva, shippingCost, setShippingCost } = useCart();
  const navigate = useNavigate();
  const { user, setUser } = useUser();
  const wompiStatus = useWompi();

  // 1. Monitor Wompi Script Status
  useEffect(() => {
    if (wompiStatus === 'ready') {
      setIsWompiReady(true);
    } else if (wompiStatus === 'error' || wompiStatus === 'timeout') {
      console.error("Wompi failed to load. Check console for 'undefined' or '404' errors.");
      showToast('Error cargando la pasarela de pagos.', 'error');
    }
  }, [wompiStatus]);

  // 2. Load User Data
  useEffect(() => {
    if (user) {
      setFormData(prevData => ({
        ...prevData,
        fullName: `${user.name || ''} ${user.lastname || ''}`.trim(),
        email: user.email || '',
        phone: user.phone || '',
        address: user.address?.street || '',
        nationalId: user.nationalId || '',
        city: user.address?.city || '',
        department: user.address?.department || '',
        country: user.address?.country || 'Colombia',
      }));
    }
  }, [user]);

  // 3. Calculate Shipping
  useEffect(() => {
    if (formData.department && formData.city) {
      const cost = calculateShippingCost(formData.department, cart?.items);
      setShippingCost(cost);
    }
  }, [formData.department, formData.city, cart, setShippingCost]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 4. MAIN CHECKOUT LOGIC
  const processCheckout = useCallback(async () => {
    if (!user?.email) {
      showToast('Por favor inicia sesión.', 'error');
      return;
    }
    if (cartTotal <= 0) {
      showToast('El carrito está vacío.', 'error');
      return;
    }

    // --- FIX: CLEANUP OLD MODALS ---
    // This removes any stuck "Waybox" modals from previous attempts
    const existingModals = document.querySelectorAll('.waybox-modal, .waybox-backdrop');
    existingModals.forEach(el => el.remove());
    // -------------------------------

    setIsSubmitting(true);

    try {
      // Step A: Create Order on Backend
      const orderPayload = {
        items: cart.items.map(item => ({
          productId: item.productId._id,
          name: item.productId.name,
          quantity: item.quantity,
          price: parseFloat(item.productId.price.toFixed(2)),
          subtotal: parseFloat((item.quantity * item.productId.price).toFixed(2)),
        })),
        shippingAddress: {
          fullName: formData.fullName,
          address: formData.address,
          city: formData.city,
          department: formData.department,
          country: formData.country,
          postalCode: 'N/A',
        },
        paymentMethod: 'Wompi',
        paymentInfo: { paymentType: 'Wompi' },
        totalPrice: parseFloat((cartTotal + shippingCost).toFixed(2)),
      };

      const orderResponse = await axiosInstance.post('/orders', orderPayload);
      const orderNumber = orderResponse.data.data.order.orderNumber;

      // Step B: Generate Signature
      const amountInCents = Math.round((cartTotal + shippingCost) * 100);
      const { data } = await axiosInstance.post('/wompi/generate-signature', {
        amount_in_cents: amountInCents,
        currency: 'COP',
        reference: orderNumber,
        customer_email: user.email,
      });

      // Step C: Initialize Widget
      const checkoutOptions = {
        currency: 'COP',
        amountInCents,
        reference: orderNumber,
        // Ensure this variable is clean in your .env
        publicKey: import.meta.env.VITE_WOMPI_PUBLIC_KEY?.trim(), 
        signature: { integrity: data.signature },
        redirectUrl: "https://genesiselectricsas.com/order-status", 
      };

      if (cartIva > 0) {
        checkoutOptions.taxInCents = { vat: Math.round(cartIva * 100) };
      }

      const checkout = new WidgetCheckout(checkoutOptions);

      // Step D: Open Widget & Handle Callback
      checkout.open((result) => {
        const transaction = result?.transaction;

        // Handle case where user closes window without paying
        if (!transaction) {
          console.log("Usuario cerró el widget sin pagar.");
          setIsSubmitting(false); 
          return;
        }

        // Handle Approved Payment
        if (transaction.status === 'APPROVED') {
          clearCart();
          // --- FIX: CLIENT SIDE REDIRECT ---
          navigate(`/order-status?id=${transaction.id}`, { 
            state: {
              orderNumber: orderNumber 
            },
            replace: true 
          });
        } 
        // Handle Errors/Declines
        else if (transaction.status === 'DECLINED' || transaction.status === 'ERROR') {
          setIsSubmitting(false);
          showToast(`Transacción ${transaction.status_message || 'rechazada'}`, 'error');
        }
      });

    } catch (err) {
      console.error('Checkout error:', err);
      showToast(err.response?.data?.message || 'Error iniciando el pago.', 'error');
      setIsSubmitting(false);
    }
  }, [cart, cartTotal, cartIva, user, formData, shippingCost, navigate, clearCart]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();

    if (!formData.department || !formData.city) {
      showToast('Selecciona departamento y ciudad.', 'error');
      return;
    }

    const requiredContactFields = ['nationalId', 'address', 'phone'];
    const currentMissingFields = requiredContactFields.filter(field => !user[field]);

    if (currentMissingFields.length > 0) {
      setMissingFields(currentMissingFields);
      setShowUpdateProfileModal(true);
      return;
    }

    await processCheckout();
  }, [user, processCheckout, formData]);

  const handleUpdateProfile = async (updatedData) => {
    try {
      const response = await axiosInstance.patch('/auth/profile', updatedData);
      setUser(response.data.data);
      showToast('Perfil actualizado', 'success');
      setShowUpdateProfileModal(false);
      await processCheckout();
    } catch (error) {
      showToast('Error actualizando perfil', 'error');
    }
  };

  const handleSelectDepartment = useCallback((dept) => {
    setFormData(prev => ({ ...prev, department: dept, city: '' }));
  }, []);

  const handleSelectCity = useCallback((city) => {
    setFormData(prev => ({ ...prev, city }));
  }, []);

  return (
    <div className={styles.container}>
      <h2>Detalles de Envío</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="fullName">Nombre Completo</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="email">Correo Electrónico</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="phone">Número de Teléfono</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="address">Dirección</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="department">Departamento</label>
            <ColombiaLocationSelect
              selectedDepartment={formData.department}
              selectedCity={formData.city}
              onSelectDepartment={handleSelectDepartment}
              onSelectCity={handleSelectCity}
              required={true}
            />
          </div>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="country">País</label>
          <input
            type="text"
            id="country"
            name="country"
            value={formData.country}
            readOnly
          />
        </div>

        <button
          type="submit"
          className={styles.submitButton}
          disabled={isSubmitting || !isWompiReady}
        >
          {isSubmitting
            ? 'Procesando...'
            : isWompiReady
            ? 'Pagar con Wompi'
            : 'Cargando pasarela...'}
        </button>
      </form>

      {showUpdateProfileModal && (
        <ConfirmationModal
          isOpen={showUpdateProfileModal}
          onClose={() => setShowUpdateProfileModal(false)}
          message="Completa tu información para continuar."
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const updatedData = {};
              missingFields.forEach(field => {
                const value = e.target[field].value;
                if (field === 'address') {
                  updatedData.address = {
                    street: value,
                    city: formData.city,
                    department: formData.department,
                    country: formData.country,
                  };
                } else {
                  updatedData[field] = value;
                }
              });
              handleUpdateProfile(updatedData);
            }}
          >
            {missingFields.includes('nationalId') && (
              <div className={styles.formGroup}>
                <label>Cédula/NIT</label>
                <input name="nationalId" defaultValue={user?.nationalId} required />
              </div>
            )}
            {missingFields.includes('address') && (
              <div className={styles.formGroup}>
                <label>Dirección</label>
                <input name="address" defaultValue={user?.address?.street} required />
              </div>
            )}
            {missingFields.includes('phone') && (
              <div className={styles.formGroup}>
                <label>Teléfono</label>
                <input name="phone" defaultValue={user?.phone} required />
              </div>
            )}
            <button type="submit" className={styles.submitButton}>
              Actualizar y Pagar
            </button>
          </form>
        </ConfirmationModal>
      )}
    </div>
  );
};

export default CheckoutForm;