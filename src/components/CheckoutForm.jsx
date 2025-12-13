import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/CheckoutForm.module.css';
import { useCart } from '../context/CartContext';
import axiosInstance from '../api/axios';
import { showToast } from '../utils/toast';
import { useUser } from '../context/UserContext';
import ConfirmationModal from './ConfirmationModal';
import ColombiaLocationSelect from './ColombiaLocationSelect';

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
  const { cart, clearCart, cartTotal, cartIva } = useCart();
  const navigate = useNavigate();
  const { user, setUser } = useUser();

  const wompiStatus = useWompi();

  useEffect(() => {
    if (wompiStatus === 'ready') {
      setIsWompiReady(true);
    } else if (wompiStatus === 'error' || wompiStatus === 'timeout') {
      showToast('Error cargando el método de pago. Por favor recarga la página.', 'error');
    }
  }, [wompiStatus]);

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const processCheckout = useCallback(async () => {
    if (!user?.email) {
      showToast('Por favor inicia sesión antes de continuar.', 'error');
      return;
    }

    if (cartTotal <= 0) {
      showToast('Tu carrito está vacío.', 'error');
      return;
    }

    setIsSubmitting(true);

    try {
      // Step 1: Create the order on the backend
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
        paymentInfo: {
          paymentType: 'Wompi',
        },
        totalPrice: parseFloat(cartTotal.toFixed(2)),
      };

      const orderResponse = await axiosInstance.post('/orders', orderPayload);
      console.log('Order Payload:', orderPayload);
      const orderNumber = orderResponse.data.data.order.orderNumber;

      // Step 2: Use the orderNumber as the reference for Wompi
      const amountInCents = Math.round(cartTotal * 100);

      const { data } = await axiosInstance.post('/wompi/generate-signature', {
        amount_in_cents: amountInCents,
        currency: 'COP',
        reference: orderNumber,
        customer_email: user.email,
      });

      const integritySignature = data.signature;

      const checkoutOptions = {
        currency: 'COP',
        amountInCents,
        reference: orderNumber,
        publicKey: import.meta.env.VITE_WOMPI_PUBLIC_KEY,
        signature: { integrity: integritySignature },
        redirectUrl: `${window.location.origin}/order-status`,
      };

      if (cartIva > 0) {
        checkoutOptions.taxInCents = { vat: Math.round(cartIva * 100) };
      }

      const checkout = new WidgetCheckout(checkoutOptions);

      checkout.open((result) => {
        setIsSubmitting(false);

        if (result?.transaction?.status === 'APPROVED') {
          clearCart();
        }
      });
    } catch (err) {
      console.error('Error during checkout process:', err);
      showToast(err.response?.data?.message || 'Error al iniciar el checkout.', 'error');
      setIsSubmitting(false);
    }
  }, [cart, cartTotal, cartIva, user, formData]);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const requiredContactFields = ['nationalId', 'address', 'phone'];
      const currentMissingFields = requiredContactFields.filter(field => !user[field]);

      if (currentMissingFields.length > 0) {
        setMissingFields(currentMissingFields);
        setShowUpdateProfileModal(true);
        return;
      }

      await processCheckout();
    },
    [user, processCheckout]
  );

  const handleUpdateProfile = async (updatedData) => {
    try {
      const response = await axiosInstance.patch('/auth/profile', updatedData);
      setUser(response.data.data);
      showToast('Perfil actualizado exitosamente', 'success');
      setShowUpdateProfileModal(false);
      await processCheckout();
    } catch (error) {
      const message = error.response?.data?.message || 'Error al actualizar el perfil';
      showToast(message, 'error');
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
            : 'Cargando método de pago...'}
        </button>
      </form>

      {showUpdateProfileModal && (
        <ConfirmationModal
          isOpen={showUpdateProfileModal}
          onClose={() => setShowUpdateProfileModal(false)}
          message="Por favor, completa tu información de contacto antes de continuar."
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
                <label htmlFor="modal-nationalId">Cédula/NIT</label>
                <input
                  type="text"
                  id="modal-nationalId"
                  name="nationalId"
                  defaultValue={user?.nationalId}
                  required
                />
              </div>
            )}
            {missingFields.includes('address') && (
              <div className={styles.formGroup}>
                <label htmlFor="modal-address">Dirección</label>
                <input
                  type="text"
                  id="modal-address"
                  name="address"
                  defaultValue={user?.address?.street}
                  required
                />
              </div>
            )}
            {missingFields.includes('phone') && (
              <div className={styles.formGroup}>
                <label htmlFor="modal-phone">Teléfono</label>
                <input
                  type="tel"
                  id="modal-phone"
                  name="phone"
                  defaultValue={user?.phone}
                  required
                />
              </div>
            )}
            <button type="submit" className={styles.submitButton}>
              Actualizar Perfil
            </button>
          </form>
        </ConfirmationModal>
      )}
    </div>
  );
};

export default CheckoutForm;
