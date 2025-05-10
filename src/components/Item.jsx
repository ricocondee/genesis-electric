import ItemStyles from "../styles/Item.module.css";
import { Heart, Leaf, Star, Wifi, Palette, GaugeCircle} from "lucide-react";
import PropTypes from "prop-types";

const Item = ({
  name,
  image,
  price,
  specs,
  description,
  urlID,
  originalPrice,
  score,
  seer,
  color,
  wifi,
  type,
}) => {
  const handleClick = ({ name, specs }) => {
    const phoneNumber = "573005515224";

    let specsText = "";
    if (Array.isArray(specs) && specs.length > 0) {
      specsText = specs.map((spec) => `${spec.volt} - ${spec.btu}`).join(", ");
    }

    const message = `Hola, quiero más información sobre el ${name}${
      specsText ? `. Especificaciones: ${specsText}` : ""
    }.`;

    const url = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(
      message
    )}`;

    const newWindow = window.open(url, "_blank");

    if (!newWindow) {
      alert("Por favor permite las ventanas emergentes para abrir WhatsApp.");
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("es-CO").format(price); // Formato colombiano
  };

  const currentMonth = new Date().getMonth();
  const showDiscount = currentMonth === 4;

  return (
    <div className={ItemStyles.container}>
      <div className={ItemStyles.image__container}>
        {showDiscount && <div className={ItemStyles.discountStamp}>5% OFF</div>}
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

          <div className={ItemStyles.price__score}>
            <div className={ItemStyles.priceBlock}>
              {showDiscount && originalPrice && (
                <span className={ItemStyles.oldPrice}>
                  ${formatPrice(originalPrice)}
                </span>
              )}
              <span className={ItemStyles.price}>${formatPrice(price)}</span>
            </div>
            <span className={ItemStyles.score}>
              <Star size={24} color="#f8af0d" className={ItemStyles.star} />
            </span>
          </div>

          <div className={ItemStyles.features}>
            {color && (
              <div className={ItemStyles.feature}>
                <span className={ItemStyles.icon}>
                  <Palette size={18} />
                </span>
                <span>
                  <strong>Color:</strong> {color}
                </span>
              </div>
            )}

            {seer && (
              <div className={ItemStyles.feature}>
                <span className={ItemStyles.icon}>
                  <GaugeCircle size={18} />
                </span>
                <span>
                  <strong>Seer:</strong> {seer}
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
        <button onClick={() => handleClick({ name, specs })}>Saber más</button>
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
