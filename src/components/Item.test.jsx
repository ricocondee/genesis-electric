import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Item from './Item';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import { useNavigate } from 'react-router-dom';

// Mock the contexts and navigation hook
vi.mock('../context/CartContext');
vi.mock('../context/FavoritesContext');
vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
  Link: vi.fn(({ children }) => children), // Mock Link to just render its children
}));

// Mock localStorage for handleBuyNow
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


describe('Item', () => {
  const mockProduct = {
    _id: '123',
    name: 'Test Product',
    image: 'test-image.jpg',
    price: 10000,
    iva: 1900,
    netPrice: 8100,
    description: 'This is a test product description.',
    urlID: 'test-product',
    status: 'disponible',
    stockQuantity: 10,
    specs: {
      btu: '12000',
      voltage: '220V',
    },
  };

  // Mock implementations for the hooks
  const mockAddItem = vi.fn();
  const mockAddFavorite = vi.fn();
  const mockRemoveFavorite = vi.fn();
  const mockIsFavorite = vi.fn();
  const mockUseNavigate = vi.fn();

  beforeEach(() => {
    // Reset mocks before each test
    mockAddItem.mockClear();
    mockAddFavorite.mockClear();
    mockRemoveFavorite.mockClear();
    mockIsFavorite.mockClear();
    mockUseNavigate.mockClear();
    localStorageMock.clear();

    useCart.mockReturnValue({
      addItem: mockAddItem,
    });
    useFavorites.mockReturnValue({
      addFavorite: mockAddFavorite,
      removeFavorite: mockRemoveFavorite,
      isFavorite: mockIsFavorite,
    });
    useNavigate.mockReturnValue(mockUseNavigate);
  });

  // Test 1: Basic Rendering
  it('renders product information correctly', () => {
    render(<Item {...mockProduct} />);

    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('This is a test product description.')).toBeInTheDocument();
    expect(screen.getByText('$ 10.000')).toBeInTheDocument();
    expect(screen.getByText(',00')).toHaveClass('decimal-part');
    expect(screen.getByAltText('Test Product')).toHaveAttribute('src', 'test-image.jpg');
  });

  // Test 2: Add to Cart functionality
  it('calls addItem when "Añadir al carrito" button is clicked', () => {
    render(<Item {...mockProduct} />);
    fireEvent.click(screen.getByRole('button', { name: /añadir al carrito/i }));
    expect(mockAddItem).toHaveBeenCalledTimes(1);
    expect(mockAddItem).toHaveBeenCalledWith({
      _id: 'test-product', // urlID is used as _id in the product object passed to addItem
      name: 'Test Product',
      imageUrl: 'test-image.jpg',
      price: 10000,
      iva: 1900,
      netPrice: 8100,
      description: 'This is a test product description.',
      quantity: 10,
      specs: { btu: '12000', voltage: '220V' },
    });
  });

  // Test 3: Buy Now functionality (logged in)
  it('calls addItem and navigates to checkout when "Comprar ahora" is clicked and user is logged in', () => {
    localStorage.setItem('token', 'fake-token');
    render(<Item {...mockProduct} />);
    fireEvent.click(screen.getByRole('button', { name: /comprar ahora/i }));
    expect(mockAddItem).toHaveBeenCalledTimes(1);
    expect(mockUseNavigate).toHaveBeenCalledWith('/checkout');
  });

  // Test 4: Buy Now functionality (not logged in)
  it('calls addItem and navigates to login when "Comprar ahora" is clicked and user is not logged in', () => {
    render(<Item {...mockProduct} />);
    fireEvent.click(screen.getByRole('button', { name: /comprar ahora/i }));
    expect(mockAddItem).toHaveBeenCalledTimes(1);
    expect(mockUseNavigate).toHaveBeenCalledWith('/login', { state: { from: '/checkout' } });
  });

  // Test 5: Favorite functionality - Add
  it('calls addFavorite when heart icon is clicked and product is not a favorite', () => {
    mockIsFavorite.mockReturnValue(false); // Not a favorite initially
    render(<Item {...mockProduct} />);
    fireEvent.click(screen.getByLabelText(/add to favorites/i));
    expect(mockAddFavorite).toHaveBeenCalledTimes(1);
    expect(mockAddFavorite).toHaveBeenCalledWith({
      _id: 'test-product',
      name: 'Test Product',
      imageUrl: 'test-image.jpg',
      price: 10000,
      description: 'This is a test product description.',
      quantity: 10,
      status: 'disponible',
      specs: { btu: '12000', voltage: '220V' },
    });
  });

  // Test 6: Favorite functionality - Remove
  it('calls removeFavorite when heart icon is clicked and product is already a favorite', () => {
    mockIsFavorite.mockReturnValue(true); // Already a favorite
    render(<Item {...mockProduct} />);
    fireEvent.click(screen.getByLabelText(/remove from favorites/i));
    expect(mockRemoveFavorite).toHaveBeenCalledTimes(1);
    expect(mockRemoveFavorite).toHaveBeenCalledWith('test-product');
  });

  // Test 7: Specs Toggle functionality
  it('toggles specs visibility when "Especificaciones" is clicked', async () => {
    render(<Item {...mockProduct} />);

    // Specs should be collapsed initially
    expect(screen.queryByText('BTU: 12000')).not.toBeInTheDocument();

    // Click to expand
    fireEvent.click(screen.getByText(/especificaciones/i));
    expect(screen.getByText('BTU: 12000')).toBeInTheDocument();

    // Click to collapse again
    fireEvent.click(screen.getByText(/especificaciones/i));
    expect(screen.queryByText('BTU: 12000')).not.toBeInTheDocument();
  });

  // Test 8: Out of Stock status
  it('displays "Agotado" and disables buttons when product is out of stock', () => {
    const outOfStockProduct = { ...mockProduct, status: 'agotado' };
    render(<Item {...outOfStockProduct} />);

    expect(screen.getByText('Agotado')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /añadir al carrito/i })).toBeDisabled();
    expect(screen.getByRole('button', { name: /comprar ahora/i })).toBeDisabled();
  });

  // Test 9: Price formatting with decimal part
  it('formats price with smaller decimal part', () => {
    const productWithDecimalPrice = { ...mockProduct, price: 10000.50 };
    render(<Item {...productWithDecimalPrice} />);
    // Check for the main part and the decimal part separately
    expect(screen.getByText('$ 10.000')).toBeInTheDocument();
    expect(screen.getByText(',50')).toHaveClass('decimal-part');
  });

  // Test 10: Specs section not rendered if no specs
  it('does not render specs toggle or section if no specs are provided', () => {
    const productWithoutSpecs = { ...mockProduct, specs: {} };
    render(<Item {...productWithoutSpecs} />);

    expect(screen.queryByText(/especificaciones/i)).not.toBeInTheDocument();
    expect(screen.queryByText('BTU: 12000')).not.toBeInTheDocument();
  });
});