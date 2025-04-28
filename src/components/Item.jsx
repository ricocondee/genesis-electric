import React from "react";
import ItemStyles from "../styles/Item.module.css";
import { Heart, Leaf, Star, Wifi, Palette} from "lucide-react";
import PropTypes from "prop-types";

const Item = ({
  name,
  image,
  price,
  specs,
  description,
  urlID,
  score,
  seer,
  color,
  wifi,
  type,
}) => {
  const handleClick = () => {
    window.open(
      "https://api.whatsapp.com/send?phone=573005515224&text=Hola%20quiero%20más%20información%20de%20este%20aire",
      "_blank"
    );
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("es-CO").format(price); // Formato colombiano
  };

  return (
    <div className={ItemStyles.container}>
      <div className={ItemStyles.image__container}>
        <img src={image} alt={name} />
      </div>
      <a href={`/products/${urlID}`}>
        <div className={ItemStyles.text__container}>
          <h3>{name}</h3>
          <p>{description}</p>

          {/* Mapeo de specs */}
          <p>
            {specs &&
              specs.map((spec, index) => (
                <span key={index}>
                  {spec.volt}, {spec.btu}
                  {index < specs.length - 1 && ", "}
                </span>
              ))}
          </p>

          {/* Mostrar SEER solo si existe */}
          {seer && (
            <p>
              <strong>SEER:</strong> {seer}
            </p>
          )}

          <div className={ItemStyles.price__score}>
            <span className={ItemStyles.price}>{formatPrice(price)}</span>
            <span className={ItemStyles.score}>
              <Star size={24} color="#f8af0d" className={ItemStyles.star} />
            </span>
          </div>

          <div className={ItemStyles.features}>
            {color && (
              <div className={ItemStyles.feature}>
                <span className={ItemStyles.icon}>
                  <Palette size={18}/>
                </span>
                <span>
                  <strong>Color:</strong> {color}
                </span>
              </div>
            )}

            {wifi !== null && (
              <div className={ItemStyles.feature}>
                <span className={ItemStyles.icon}>
                  <Wifi size={18} />
                </span>
                <span>
                  <strong>Wifi:</strong> {wifi ? "Sí" : "No"}
                </span>
              </div>
            )}

            {type && (
              <div className={ItemStyles.feature}>
                <span className={ItemStyles.icon}>
                  <Leaf size={18} />
                </span>
                <span>
                  <strong>Tipo:</strong> {type}
                </span>
              </div>
            )}
          </div>
        </div>
      </a>
      <div className={ItemStyles.item__button}>
        <button onClick={handleClick}>Saber más</button>
      </div>
    </div>
  );
};
Item.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  specs: PropTypes.arrayOf(
    PropTypes.shape({
      volt: PropTypes.string,
      btu: PropTypes.string,
    })
  ),
  description: PropTypes.string.isRequired,
  urlID: PropTypes.string.isRequired,
  score: PropTypes.number,
  seer: PropTypes.number,
  color: PropTypes.string,
  wifi: PropTypes.bool,
  type: PropTypes.string,
};

export default Item;
