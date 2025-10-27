import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/CheckoutForm.module.css';
import { useCart } from '../context/CartContext';
import axiosInstance from '../api/axios';
import { showToast } from '../utils/toast';

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
  const { cart, clearCart, cartTotal } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axiosInstance.get('/auth/profile');
        if (response.data && response.data.user) {
          const { user } = response.data;
          setFormData(prevData => ({
            ...prevData,
            fullName: user.name || '',
            email: user.email || '',
          }));
        }
      } catch (error) {
        showToast("Failed to fetch user profile: " + error.message, "error");
      }
    };

    fetchUserProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const orderData = {
      shippingAddress: {
        fullName: formData.fullName,
        address: formData.address,
        city: formData.city,
        postalCode: 'N/A', // Add a postal code field if you have one
        country: formData.country,
      },
      paymentMethod: 'ePayco',
      items: cart.items.map(item => ({
        productId: item.productId._id,
        name: item.productId.name,
        quantity: item.quantity,
        price: item.productId.price,
      })),
      totalPrice: cartTotal,
    };

    try {
      const response = await axiosInstance.post('/orders', orderData);
      const createdOrder = response.data.order;

      const handler = window.ePayco.checkout.configure({
        key: 'asdss3eqsr3rfs3er566',
        test: true
      });

      handler.open({
        // Epayco Checkout options
        class: 'epayco-button',
        // Epayco Data
        name: 'Compra Genesis Electric',
        description: `Compra de ${cart.items.length} productos`,
        invoice: createdOrder._id, // Use the order ID as the invoice
        currency: 'cop',
        amount: cartTotal,
        tax_base: '0',
        tax: '0',
        country: 'co',
        lang: 'es',

        // OnClose event
        onClose: function (response) {
          if (response.success) {
            clearCart();
            navigate('/order-success');
          }
        },

        // External info
        external: 'false',

        // Button text
        button: 'Pagar (ePayco)',

        // Response confirmation page
        response: `${window.location.origin}/order-success`,
      });

    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to create order', "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Detalles de Envío</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="fullName">Nombre Completo</label>
          <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} required />
        </div>
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="email">Correo Electrónico</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="phone">Número de Teléfono</label>
            <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
          </div>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="address">Dirección</label>
          <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} required />
        </div>
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="city">Ciudad</label>
            <input type="text" id="city" name="city" value={formData.city} onChange={handleChange} required />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="department">Departamento</label>
            <input type="text" id="department" name="department" value={formData.department} onChange={handleChange} required />
          </div>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="country">País</label>
          <input type="text" id="country" name="country" value={formData.country} onChange={handleChange} required />
        </div>

        <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
          {isSubmitting ? 'Procesando...' : 'Pagar con ePayco'}
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;