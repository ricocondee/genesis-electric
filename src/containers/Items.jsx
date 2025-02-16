import { useState, useEffect } from "react";
import Item from "../components/Item";
import ItemsStyles from "../styles/Items.module.css";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://raw.githubusercontent.com/ricocondee/genesis-electric/main/src/db/products.json")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error loading JSON:", error));
  }, []);

  return (
    <div>
      <div className={ItemsStyles.container}>
        {products.map((product, index) => (
          <Item 
            key={index} 
            name={product.name} 
            description={product.description}
            spec1={product.btu}
            spec2={product.volt}
            price={product.price}
            image={product.image}
            refr={product.refr}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
