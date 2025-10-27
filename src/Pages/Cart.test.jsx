import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Cart from './Cart';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { showToast } from '../utils/toast';

// Mock the contexts and navigation hook
vi.mock('../context/CartContext');
vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
  Link: vi.fn(({ children }) => children), // Mock Link if used in Cart.jsx
}));
vi.mock('../utils/toast'); // Mock the toast utility

// Mock localStorage for handleCheckout
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => {
      store[key] = value.toString();
    },
    clear: () => {
      store = {};
    },
  };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('Cart', () => {
  const mockUpdateItemQuantity = vi.fn();
  const mockRemoveItem = vi.fn();
  const mockUseNavigate = vi.fn();

  const mockCartItem = {
    _id: 'cartItem1',
    productId: {
      _id: 'prod1',
      name: 'Product 1',
      imageUrl: 'image1.jpg',
      price: 12000,
      netPrice: 10000,
      iva: 2000,
      quantity: 5, // stock quantity
    },
    quantity: 2, // quantity in cart
  };

  const mockCartItem2 = {
    _id: 'cartItem2',
    productId: {
      _id: 'prod2',
      name: 'Product 2',
      imageUrl: 'image2.jpg',
      price: 24000,
      netPrice: 20000,
      iva: 4000,
      quantity: 10, // stock quantity
    },
    quantity: 1, // quantity in cart
  };

  beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.clear();
    useNavigate.mockReturnValue(mockUseNavigate);
  });

  // Test 1: Renders empty cart
  it('renders EmptyCart component when cart is empty', () => {
    useCart.mockReturnValue({
      cart: { items: [] },
      loading: false,
      error: null,
      updateItemQuantity: mockUpdateItemQuantity,
      removeItem: mockRemoveItem,
      cartTotal: 0,
      totalItems: 0,
    });
    render(<Cart />);
    expect(screen.getByText(/tu carrito está vacío/i)).toBeInTheDocument(); // Assuming EmptyCart renders this text
  });

  // Test 2: Renders loading state
  it('renders loading state', () => {
    useCart.mockReturnValue({
      cart: { items: [] },
      loading: true,
      error: null,
      updateItemQuantity: mockUpdateItemQuantity,
      removeItem: mockRemoveItem,
      cartTotal: 0,
      totalItems: 0,
    });
    render(<Cart />);
    expect(screen.getByText(/cargando carrito/i)).toBeInTheDocument();
  });

  // Test 3: Renders error state
  it('renders error state', () => {
    useCart.mockReturnValue({
      cart: { items: [] },
      loading: false,
      error: 'Failed to fetch cart',
      updateItemQuantity: mockUpdateItemQuantity,
      removeItem: mockRemoveItem,
      cartTotal: 0,
      totalItems: 0,
    });
    render(<Cart />);
    expect(screen.getByText(/error: failed to fetch cart/i)).toBeInTheDocument();
    expect(showToast).toHaveBeenCalledWith('Failed to fetch cart', 'error');
  });

  // Test 4: Displays cart items and summary
  it('displays cart items and summary correctly', () => {
    useCart.mockReturnValue({
      cart: { items: [mockCartItem, mockCartItem2] },
      loading: false,
      error: null,
      updateItemQuantity: mockUpdateItemQuantity,
      removeItem: mockRemoveItem,
      cartTotal: 36000, // 12000*2 + 24000*1
      totalItems: 3,
    });
    render(<Cart />);

    // Check Product 1 details
    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByAltText('Product 1')).toHaveAttribute('src', 'image1.jpg');
    expect(screen.getByText(/precio neto: \$ 10.000/i)).toBeInTheDocument();
    expect(screen.getByText(/iva: \$ 2.000/i)).toBeInTheDocument();
    expect(screen.getByText(/total por unidad: \$ 12.000/i)).toBeInTheDocument();
    expect(screen.getAllByText('2')[0]).toBeInTheDocument(); // Quantity for Product 1

    // Check Product 2 details
    expect(screen.getByText('Product 2')).toBeInTheDocument();
    expect(screen.getByAltText('Product 2')).toHaveAttribute('src', 'image2.jpg');
    expect(screen.getByText(/precio neto: \$ 20.000/i)).toBeInTheDocument();
    expect(screen.getByText(/iva: \$ 4.000/i)).toBeInTheDocument();
    expect(screen.getByText(/total por unidad: \$ 24.000/i)).toBeInTheDocument();
    expect(screen.getAllByText('1')[0]).toBeInTheDocument(); // Quantity for Product 2

    // Check summary
    expect(screen.getByText(/subtotal:/i)).toBeInTheDocument();
    expect(screen.getByText(/envío:/i)).toBeInTheDocument();
    expect(screen.getByText('Total:')).toBeInTheDocument();

    // Assert full formatted price strings for summary values
    expect(screen.getByText(/subtotal:/i).nextSibling).toHaveTextContent('$ 36.000,00');
    expect(screen.getByText(/envío:/i).nextSibling).toHaveTextContent('$ 0,00');
    expect(screen.getByText('Total:').nextSibling).toHaveTextContent('$ 36.000,00');
  });

  // Test 5: Increase quantity
  it('calls updateItemQuantity with increased quantity when "+" button is clicked', () => {
    useCart.mockReturnValue({
      cart: { items: [mockCartItem] },
      loading: false,
      error: null,
      updateItemQuantity: mockUpdateItemQuantity,
      removeItem: mockRemoveItem,
      cartTotal: 24000,
      totalItems: 2,
    });
    render(<Cart />);
    const increaseButton = screen.getByRole('button', { name: /increase quantity/i });
    fireEvent.click(increaseButton);
    expect(mockUpdateItemQuantity).toHaveBeenCalledWith('prod1', 3);
  });

  // Test 6: Decrease quantity
  it('calls updateItemQuantity with decreased quantity when "-" button is clicked', () => {
    useCart.mockReturnValue({
      cart: { items: [mockCartItem] },
      loading: false,
      error: null,
      updateItemQuantity: mockUpdateItemQuantity,
      removeItem: mockRemoveItem,
      cartTotal: 24000,
      totalItems: 2,
    });
    render(<Cart />);
    const decreaseButton = screen.getByRole('button', { name: /decrease quantity/i });
    fireEvent.click(decreaseButton);
    expect(mockUpdateItemQuantity).toHaveBeenCalledWith('prod1', 1);
  });

  // Test 7: Decrease quantity disables button at 1
  it('disables "-" button when item quantity is 1', () => {
    const singleItem = { ...mockCartItem, quantity: 1 };
    useCart.mockReturnValue({
      cart: { items: [singleItem] },
      loading: false,
      error: null,
      updateItemQuantity: mockUpdateItemQuantity,
      removeItem: mockRemoveItem,
      cartTotal: 12000,
      totalItems: 1,
    });
    render(<Cart />);
    const decreaseButton = screen.getByRole('button', { name: /decrease quantity/i });
    expect(decreaseButton).toBeDisabled();
  });

  // Test 8: Stock limit warning
  it('shows toast warning when increasing quantity beyond stock', () => {
    const maxStockItem = { ...mockCartItem, quantity: 5 }; // Cart quantity equals stock
    useCart.mockReturnValue({
      cart: { items: [maxStockItem] },
      loading: false,
      error: null,
      updateItemQuantity: mockUpdateItemQuantity,
      removeItem: mockRemoveItem,
      cartTotal: 60000,
      totalItems: 5,
    });
    render(<Cart />);
    const increaseButton = screen.getByRole('button', { name: /increase quantity/i });
    fireEvent.click(increaseButton);
    expect(showToast).toHaveBeenCalledWith('Solo tenemos 5 unidades disponibles', 'warn');
    expect(mockUpdateItemQuantity).not.toHaveBeenCalled(); // Should not update quantity
  });

  // Test 9: Remove item
  it('calls removeItem when trash icon is clicked', () => {
    useCart.mockReturnValue({
      cart: { items: [mockCartItem] },
      loading: false,
      error: null,
      updateItemQuantity: mockUpdateItemQuantity,
      removeItem: mockRemoveItem,
      cartTotal: 24000,
      totalItems: 2,
    });
    render(<Cart />);
    const removeButton = screen.getByRole('button', { name: /remove item/i });
    fireEvent.click(removeButton);
    expect(mockRemoveItem).toHaveBeenCalledWith('prod1');
  });

  // Test 10: Checkout when logged in
  it('navigates to checkout when "Proceder al Pago" is clicked and user is logged in', () => {
    localStorage.setItem('token', 'fake-token');
    useCart.mockReturnValue({
      cart: { items: [mockCartItem] },
      loading: false,
      error: null,
      updateItemQuantity: mockUpdateItemQuantity,
      removeItem: mockRemoveItem,
      cartTotal: 24000,
      totalItems: 2,
    });
    render(<Cart />);
    fireEvent.click(screen.getByRole('button', { name: /proceder al pago/i }));
    expect(mockUseNavigate).toHaveBeenCalledWith('/checkout');
  });

  // Test 11: Checkout when not logged in
  it('navigates to login when "Proceder al Pago" is clicked and user is not logged in', () => {
    useCart.mockReturnValue({
      cart: { items: [mockCartItem] },
      loading: false,
      error: null,
      updateItemQuantity: mockUpdateItemQuantity,
      removeItem: mockRemoveItem,
      cartTotal: 24000,
      totalItems: 2,
    });
    render(<Cart />);
    fireEvent.click(screen.getByRole('button', { name: /proceder al pago/i }));
    expect(mockUseNavigate).toHaveBeenCalledWith('/login', { state: { from: '/checkout' } });
  });

  // Test 12: Shipping cost updates total
  it('updates final total when shipping cost changes', async () => {
    // Mock ShippingCalculator to control its onShippingCostChange prop
    vi.mock('../components/ShippingCalculator', () => ({
      __esModule: true,
      default: ({ onShippingCostChange }) => (
        <div data-testid="shipping-calculator">
          <button onClick={() => onShippingCostChange(5000)}>Set Shipping 5000</button>
        </div>
      ),
    }));

    useCart.mockReturnValue({
      cart: { items: [mockCartItem] },
      loading: false,
      error: null,
      updateItemQuantity: mockUpdateItemQuantity,
      removeItem: mockRemoveItem,
      cartTotal: 24000,
      totalItems: 2,
    });
    render(<Cart />);

    // Initial total
    expect(screen.getByText(/subtotal:/i).nextSibling).toHaveTextContent('$ 24.000,00');
    expect(screen.getByText(/envío:/i).nextSibling).toHaveTextContent('$ 0,00');
    expect(screen.getByText('Total:').nextSibling).toHaveTextContent('$ 24.000,00');

    // Simulate shipping cost change
    fireEvent.click(screen.getByText('Set Shipping 5000'));

    // Assert updated total
    expect(screen.getByText(/envío:/i).nextSibling).toHaveTextContent('$ 5.000,00');
    expect(screen.getByText('Total:').nextSibling).toHaveTextContent('$ 29.000,00'); // 24000 + 5000
  });
});
