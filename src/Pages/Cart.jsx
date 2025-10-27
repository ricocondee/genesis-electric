import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/Cart.module.css';
import { Trash2, Plus, Minus } from 'lucide-react';
import { useState } from 'react';
import { showToast } from '../utils/toast';
import ShippingCalculator from '../components/ShippingCalculator';
import EmptyCart from '../components/EmptyCart';

const Cart = () => {
  const { cart, loading, error, updateItemQuantity, removeItem, cartTotal, totalItems } = useCart();
  const navigate = useNavigate();
  const [shippingCost, setShippingCost] = useState(0);

  const handleShippingCostChange = (cost) => {
    setShippingCost(cost);
  };

  const handleIncreaseQuantity = (item) => {
    const stockQuantity = item.productId.quantity;
    if (stockQuantity !== undefined && item.quantity >= stockQuantity) {
      showToast(`Solo tenemos ${stockQuantity} unidades disponibles`, "warn");
    } else {
      updateItemQuantity(item.productId._id, item.quantity + 1);
    }
  };

  const handleCheckout = () => {
    const token = localStorage.getItem('token');
    if (token && token !== "undefined") {
      navigate('/checkout');
    } else {
      navigate('/login', { state: { from: '/checkout' } });
    }
  };

  if (loading) return <div className={styles.cartContainer}>Cargando carrito...</div>;
  if (error) {
    showToast(error, "error");
    return <div className={styles.cartContainer}>Error: {error}</div>;
  }

  const formatPrice = (price) => {
    const formatted = new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
    }).format(price);
    const parts = formatted.split(',');
    if (parts.length > 1) {
      return <>{parts[0]}<span className="decimal-part">,{parts[1]}</span></>;
    } else {
      return formatted;
    }
  };

  const finalTotal = cartTotal + shippingCost;

  return (
    <div className={styles.cartContainer}>
      <h1>Tu Carrito de Compras</h1>
      {!cart || totalItems === 0 ? (
        <EmptyCart />
      ) : (
        <div className={styles.cartContent}>
          <div className={styles.cartItems}>
            {cart.items.map((item) => (
              <div key={item._id} className={styles.cartItem}>
                <img src={item.productId.imageUrl} alt={item.productId.name} className={styles.itemImage} />
                <div className={styles.itemDetails}>
                  <h3>{item.productId.name}</h3>
                  <p>Precio Neto: {formatPrice(item.productId.netPrice)}</p>
                  <p>IVA: {formatPrice(item.productId.iva)}</p>
                  <p>Total por unidad: {formatPrice(item.productId.price)}</p>
                  <div className={styles.quantityControl}>
                    <button onClick={() => updateItemQuantity(item.productId._id, item.quantity - 1)} disabled={item.quantity === 1} aria-label="Decrease quantity">
                      <Minus size={16} />
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => handleIncreaseQuantity(item)} aria-label="Increase quantity">
                      <Plus size={16} />
                    </button>
                  </div>
                  <button onClick={() => removeItem(item.productId._id)} className={styles.removeButton} aria-label="Remove item">
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.cartSidebar}>
            <div className={styles.cartSummary}>
              <h2>Resumen del Pedido</h2>
              <div className={styles.summaryRow}>
                <span className={styles.summaryLabel}>Subtotal:</span>
                <span className={styles.summaryValue}>{formatPrice(cartTotal)}</span>
              </div>
              <div className={styles.summaryRow}>
                <span className={styles.summaryLabel}>Envío:</span>
                <span className={styles.summaryValue}>{formatPrice(shippingCost)}</span>
              </div>
              <div className={`${styles.summaryRow} ${styles.cartTotal}`}>
                <span className={styles.summaryLabel}>Total:</span>
                <span className={styles.summaryValue}>{formatPrice(finalTotal)}</span>
              </div>
              <button className={styles.checkoutButton} onClick={handleCheckout}>Proceder al Pago</button>
            </div>
            <div className={styles.shippingCalculatorContainer}>
              <ShippingCalculator onShippingCostChange={handleShippingCostChange} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
