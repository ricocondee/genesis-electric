import { useState, useEffect } from "react";
import Item from "../components/Item";
import ItemsStyles from "../styles/Items.module.css";
import SortFilter from "../components/SortFilter";
import SearchBar from "../components/SearchBar";
import Void from "../components/Void";

const Items = () => {
  const [products, setProducts] = useState([]);
  const [sortedProducts, setSortedProducts] = useState([]);
  const [sortOption, setSortOption] = useState("priceAsc");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/ricocondee/genesis-electric/main/src/db/products.json"
    )
      .then((response) => response.json())
      .then((data) => {
        const cleanedData = data.map((product) => {
          // Primero limpiamos el precio (eliminando puntos y convirtiendo a número)
          const originalPrice = parseFloat(product.price.replace(/\./g, "")) || 0;
          
          // Aplicamos los incrementos del 20% y luego el 19%
          const priceWithIncrements = originalPrice * 1.15 * 1.19;
  
          return {
            ...product,
            price: priceWithIncrements, // Actualizamos el precio con el aumento
            relevance: parseFloat(product.relevance) || 0,
          };
        });
        setProducts(cleanedData);
      })
      .catch((error) => console.error("Error loading JSON:", error));
  }, []);
  

  useEffect(() => {
    if (products.length > 0) {
      const filteredProducts = products.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm) ||
          product.description.toLowerCase().includes(searchTerm) ||
          product.refr.toLowerCase().includes(searchTerm) ||
          (product.brand && product.brand.toLowerCase().includes(searchTerm)) // Evita error si brand es undefined
      );

      const sorted = [...filteredProducts].sort((a, b) => {
        switch (sortOption) {
          case "priceAsc":
            return Number(a.price) - Number(b.price);
          case "priceDesc":
            return Number(b.price) - Number(a.price);
          case "relevance":
            return Number(b.relevance || 0) - Number(a.relevance || 0);
          default:
            return 0;
        }
      });

      setSortedProducts(sorted);
    }
  }, [sortOption, products, searchTerm]);

  return (
    <div>
      <div className={ItemsStyles.container}>
        <div className={ItemsStyles.filters__container}>
          <SortFilter setSortOption={setSortOption} />
          <SearchBar setSearchTerm={setSearchTerm} />
        </div>
        {sortedProducts.length > 0 ? (
          sortedProducts.map((product) => (
            <Item
              key={product.id}
              name={product.name}
              image={product.image}
              price={product.price}
              specs={product.specs}
              description={product.description}
              urlID={product.publicId}
              score={product.score}
              wifi={product.wifi}
              type={product.type}
              seer={product.seer}
              color={product.color}
            />
          ))
        ) : (
          <Void />
        )}
      </div>
    </div>
  );
};

export default Items;
