
import { useFavorites } from '../context/FavoritesContext';
import FavoriteCard from '../components/FavoriteCard';
import styles from '../styles/Favorites.module.css';
import EmptyFavorites from '../components/EmptyFavorites';
import Loader from '../components/Loader';

const Favorites = () => {
  const { favorites, loading, removeFavorite } = useFavorites();

  if (loading) {
    return <Loader />;
  }

  const productsForCards = favorites.map(fav => ({
    ...fav.productId,
    price: fav.productId.clientPrice,
    iva: fav.productId.IVA,
    netPrice: fav.productId.netPrice,
    imageUrl: fav.productId.imageUrls?.[0] || fav.productId.imageUrl,
  }));

  return (
    <div className={styles.container}>
      <h1>Mis Favoritos</h1>
      {favorites.length > 0 ? (
        <div className={styles.cardsGrid}>
          {productsForCards.map(product => (
            <FavoriteCard key={product._id} product={product} onRemove={removeFavorite} />
          ))}
        </div>
      ) : (
        <EmptyFavorites />
      )}
    </div>
  );
};

export default Favorites;
