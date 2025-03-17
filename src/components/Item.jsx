import React from "react";
import ItemStyles from "../styles/Item.module.css";
import { Heart, Star } from "lucide-react";

const Item = ({ name, image, price, specs, description, score }) => {
  const handleClick = () => {
    window.open('https://api.whatsapp.com/send?phone=573005515224&text=Hola%20quiero%20más%20información%20de%20este%20aire', '_blank');
  }
  return (
    <div className={ItemStyles.container}>
      <div className={ItemStyles.image__container}>
        <img src={image} alt={name} />
      </div>
      <div className={ItemStyles.text__container}>
        <h3>{name}</h3>
        <p>{description}</p>
        <p>{specs}</p>
        <div className={ItemStyles.price__score}>
          <span className={ItemStyles.price}>{price}</span>{" "}
          <span className={ItemStyles.score}>
            <Star size={24} color="yellow" className={ItemStyles.star} />
          </span>
        </div>
        <div>
          <Heart size={24} color="grey" className={ItemStyles.fav} />
        </div>
      </div>
      <div className={ItemStyles.item__button}>
        <button onClick={handleClick}>Saber m&aacute;s</button>
      </div>
    </div>
  );
};

export default Item;
