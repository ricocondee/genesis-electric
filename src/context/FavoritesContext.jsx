import { createContext, useState, useContext, useEffect, useCallback } from 'react';
import axiosInstance from '../api/axios';
import { showToast } from '../utils/toast';

const FavoritesContext = createContext();

export const useFavorites = () => {
  return useContext(FavoritesContext);
};

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchFavorites = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get('/favorites');
      if (Array.isArray(response.data)) {
        setFavorites(response.data);
      } else {
        setFavorites([]);
      }
    } catch (error) {
      showToast('Error fetching favorites:' + error.message, "error");
      setFavorites([]); // Clear favorites on error
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchFavorites();
    } else {
      setFavorites([]); // Clear favorites if no token
    }
  }, [fetchFavorites]);

  const addFavorite = useCallback(async (product) => {
    try {
      await axiosInstance.post('/favorites', { productId: product._id });
      fetchFavorites();
    } catch (error) {
      showToast('Error adding favorite:' + error.message, "error");
    }
  }, [fetchFavorites]);

  const removeFavorite = useCallback(async (productId) => {
    const previousFavorites = favorites;
    // Optimistic update
    setFavorites(prev => prev.filter(fav => fav.productId._id !== productId));
    try {
      await axiosInstance.delete(`/favorites/${productId}`);
    } catch (error) {
      showToast('Error removing favorite:' + error.message, "error");
      // Revert if error
      setFavorites(previousFavorites);
    }
  }, [favorites]);

  const isFavorite = (productId) => {
    return favorites.some(fav => fav.productId?._id === productId);
  };

  const value = {
    favorites,
    loading,
    addFavorite,
    removeFavorite,
    isFavorite,
  };

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
};
