import { createContext, useState, useContext, useEffect, useCallback } from 'react';
import axiosInstance from '../api/axios';
import { showToast } from '../utils/toast';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const localCart = localStorage.getItem('cart');
      return localCart ? JSON.parse(localCart) : { items: [] };
    } catch (error) {
      showToast("Error al cargar el carrito desde el almacenamiento local:" + error.message, "error");
      return { items: [] }; // Return a default value in case of error
    }
  });
  const [loading, setLoading] = useState(false); // No longer need loading state for cart

  useEffect(() => {
    // Persist cart to local storage whenever it changes
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addItem = useCallback((product, quantity = 1) => {
    setCart(prevCart => {
      const existingItemIndex = prevCart.items.findIndex(item => item.productId._id === product._id);
      let updatedItems;

      if (existingItemIndex > -1) {
        updatedItems = [...prevCart.items];
        updatedItems[existingItemIndex].quantity += quantity;
      } else {
        updatedItems = [...prevCart.items, { productId: product, quantity: quantity, _id: product._id }];
      }
      return { ...prevCart, items: updatedItems };
    });
  }, []);

  const updateItemQuantity = useCallback((productId, quantity) => {
    setCart(prevCart => {
      const updatedItems = prevCart.items.map(item =>
        item.productId._id === productId ? { ...item, quantity } : item
      ).filter(item => item.quantity > 0); // Remove item if quantity is 0
      return { ...prevCart, items: updatedItems };
    });
  }, []);

  const removeItem = useCallback((productId) => {
    setCart(prevCart => {
      const updatedItems = prevCart.items.filter(item => item.productId._id !== productId);
      return { ...prevCart, items: updatedItems };
    });
  }, []);

  const clearCart = useCallback(() => {
    setCart({ items: [] });
  }, []);

  const mergeCart = useCallback(async () => {
    if (cart.items && cart.items.length > 0) {
      try {
        await axiosInstance.post('/cart/merge', { items: cart.items });
        clearCart();
      } catch (error) {
        showToast("Error al fusionar el carrito:" + error.message, "error");
      }
    }
  }, [cart, clearCart]);

  const cartTotal = cart ? cart.items.reduce((total, item) => {
    return total + (item.productId.price * item.quantity);
  }, 0) : 0;

  const totalItems = cart ? cart.items.reduce((total, item) => {
    return total + item.quantity;
  }, 0) : 0;

  

  const value = {
    cart,
    loading,
    addItem,
    updateItemQuantity,
    removeItem,
    clearCart,
    mergeCart,
    cartTotal,
    totalItems,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};