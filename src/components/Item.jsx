import React from "react";
import ItemStyles from "../styles/Item.module.css";
import { ImTab } from "react-icons/im";
import Button from "./MyLink";
import { TbBrandWhatsapp } from "react-icons/tb";

const Item = ({ name, image, price, specs, refr, description }) => {
  return (
    <div className={ItemStyles.container}>
      <div className={ItemStyles.image__container}>
        {Array.isArray(image) && image.length > 0 ? (
          image.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`${name} ${index + 1}`}
              width="150"
            />
          ))
        ) : (
          <p>No images available</p>
        )}
      </div>
      <div className={ItemStyles.text__container}>
        <div className={ItemStyles.item__title}>
          <h2>{name}</h2>
        </div>
        <div className={ItemStyles.item__description}>
          <p>{description}</p>
        </div>
        <ul className={ItemStyles.specs}>
          {specs?.map((spec, index) => (
            <li key={index}>
              <ImTab />
              {spec.btu}
            </li>
          ))}
        </ul>
        <div className={ItemStyles.item__price}>
          <p className={ItemStyles.price}>${price}</p>
        </div>
        <div className={ItemStyles.item__button}>
          <Button
          text="​¡Pide ya!"
          url={`https://api.whatsapp.com/send?phone=573005515224&text=Hola%20quiero%20más%20información%20de%20${name}`}
          icon={<TbBrandWhatsapp />}
        />
        </div>
        
      </div>
    </div>
  );
};

export default Item;
