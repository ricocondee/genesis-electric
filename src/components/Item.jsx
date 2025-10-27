import { useCart } from "../context/CartContext";
import { useFavorites } from "../context/FavoritesContext";
import { useState } from "react";
import ItemStyles from "../styles/Item.module.css";
import { Snowflake, Zap, Leaf, Heart, Star, Wifi, ChevronDown, ChevronUp } from "lucide-react";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";

const specTranslations = {
  btu: "BTU",
  voltage: "Voltaje",
  color: "Color",
  seer: "SEER",
  energyType: "Eficiencia",
  refrigerant: "Refrigerante",
  system: "Sistema",
  brand: "Marca",
};

const Item = ({
  name,
  image,
  price,
  iva,
  netPrice,
  description,
  urlID,
  score = 4.5, // Default score
  status,
  stockQuantity,
  specs, 
}) => {
  const { addItem } = useCart();
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const [isAdding, setIsAdding] = useState(false);
  const [isSpecsCollapsed, setIsSpecsCollapsed] = useState(true);
  const navigate = useNavigate();

  const isFav = isFavorite(urlID);

  const handleFavoriteClick = () => {
    if (isFav) {
      removeFavorite(urlID);
    } else {
      const product = { _id: urlID, name, imageUrl: image, price, description, quantity: stockQuantity, status, specs };
      addFavorite(product);
    }
  };

  const isOutOfStock = status === 'agotado';

  const handleAddToCart = () => {
    const product = { _id: urlID, name, imageUrl: image, price, iva, netPrice, description, quantity: stockQuantity, specs };
    addItem(product);
    setIsAdding(true);
    setTimeout(() => setIsAdding(false), 500);
  };

  const handleBuyNow = () => {
    const product = { _id: urlID, name, imageUrl: image, price, iva, netPrice, description, quantity: stockQuantity, specs };
    addItem(product);

    const token = localStorage.getItem('token');
    if (token && token !== "undefined") {
      navigate('/checkout');
    } else {
      navigate('/login', { state: { from: '/checkout' } });
    }
  };

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

  const renderStars = () => {    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          size={16}
          fill={i <= score ? "#f8af0d" : "#e2e8f0"}
          stroke="none"
        />
      );
    }
    return stars;
  };

  return (
    <div className={`${ItemStyles.container} ${isAdding ? ItemStyles.addedToCart : ''}`}>
      <div className={ItemStyles.favorite__icon} onClick={handleFavoriteClick} aria-label={isFav ? "Remove from favorites" : "Add to favorites"}>
        <Heart fill={isFav ? "red" : "none"} color={isFav ? "red" : "currentColor"} />
      </div>
      <Link to={`/products/${urlID}`} className={ItemStyles.image__container}>
        <img src={image} alt={name} />
      </Link>
      <div className={ItemStyles.text__container}>
        <Link to={`/products/${urlID}`} className={ItemStyles.titleLink}>
          <h3>{name}</h3>
        </Link>
        <div className={ItemStyles.score__container}>{renderStars()}</div>
        <p className={ItemStyles.description}>{description}</p>

        {specs && Object.keys(specs).length > 0 && (
          <div className={ItemStyles.specsToggle} onClick={() => setIsSpecsCollapsed(!isSpecsCollapsed)}>
            <h4>Especificaciones {isSpecsCollapsed ? <ChevronDown size={16} /> : <ChevronUp size={16} />}</h4>
          </div>
        )}

        {!isSpecsCollapsed && specs && Object.keys(specs).length > 0 && (
          <div className={`${ItemStyles.specs} ${!isSpecsCollapsed ? ItemStyles.specsExpanded : ''}`}>
            {Object.entries(specs)
              .filter(([_, value]) => value)
              .map(([key, value]) => (
                <div className={ItemStyles.spec} key={key}>
                  <span>{specTranslations[key] || key}: {value}</span>
                </div>
              ))}
          </div>
        )}

        <div className={ItemStyles.price__container}>
          {isOutOfStock ? (
            <span className={ItemStyles.outOfStockLabel}>Agotado</span>
          ) : (
            <span className={ItemStyles.price}>{formatPrice(price)}</span>
          )}
        </div>

        <div className={ItemStyles.button__container}>
          <button className={ItemStyles.cart__button} onClick={handleAddToCart} disabled={isOutOfStock}>
            Añadir al carrito
          </button>
          <button className={ItemStyles.buy__button} onClick={handleBuyNow} disabled={isOutOfStock}>
            Comprar ahora
          </button>
        </div>
      </div>
    </div>
  );
};

Item.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  urlID: PropTypes.string.isRequired,
  score: PropTypes.number,
  status: PropTypes.string,
  stockQuantity: PropTypes.number,
  specs: PropTypes.object,
};

export default Item;