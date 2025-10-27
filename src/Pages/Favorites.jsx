import React from 'react';
import { useFavorites } from '../context/FavoritesContext';
import FavoritesTable from '../components/FavoritesTable';
import styles from '../styles/Product.module.css';
import EmptyFavorites from '../components/EmptyFavorites';

const Favorites = () => {
  const { favorites, loading, removeFavorite } = useFavorites();

  if (loading) {
    return <div>Loading...</div>;
  }

  const productsForTable = favorites.map(fav => ({
    ...fav.productId,
    price: fav.productId.price,
  }));

  return (
    <div className={styles.container}>
      <h1>Mis Favoritos</h1>
      {favorites.length > 0 ? (
        <FavoritesTable products={productsForTable} onRemove={removeFavorite} />
      ) : (
        <EmptyFavorites />
      )}
    </div>
  );
};

export default Favorites;
