import { useState, useEffect } from "react";
import Item from "../components/Item";
import ItemsStyles from "../styles/Items.module.css";
import SortFilter from "../components/SortFilter";
import SearchBar from "../components/SearchBar";
import Void from "../components/Void";
import { showToast } from "../utils/toast";

const Items = () => {
  const [products, setProducts] = useState([]);
  const [sortedProducts, setSortedProducts] = useState([]);
  const [sortOption, setSortOption] = useState("priceAsc");
  const [filters, setFilters] = useState({ q: "" });
  const currentMonth = new Date().getMonth();
  const showDiscount = currentMonth === 4;

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
          const priceWithIncrements = originalPrice * 1.2 * 1.19;
          const priceWithDiscount = originalPrice * 1.15 * 1.19;
  
          return {
            ...product,
            price: showDiscount ? priceWithDiscount : priceWithIncrements, // Actualizamos el precio con el aumento
            originalPrice: priceWithIncrements, // Guardamos el precio original
            relevance: parseFloat(product.relevance) || 0,
          };
        });
        setProducts(cleanedData);
      })
      .catch((error) => showToast("Error loading JSON:" + error.message, "error"));
  }, []);
  

  useEffect(() => {
    if (products.length > 0) {
      const filteredProducts = products.filter(
        (product) =>
          product.name.toLowerCase().includes(filters.q.toLowerCase()) ||
          product.description.toLowerCase().includes(filters.q.toLowerCase()) ||
          product.refr.toLowerCase().includes(filters.q.toLowerCase()) ||
          (product.brand && product.brand.toLowerCase().includes(filters.q.toLowerCase())) // Evita error si brand es undefined
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
  }, [sortOption, products, filters]);

  return (
    <div>
      <div className={ItemsStyles.container}>
        <div className={ItemsStyles.filters__container}>
          <SortFilter setSortOption={setSortOption} />
          <SearchBar filters={filters} setFilters={setFilters} />
        </div>
        {sortedProducts.length > 0 ? (
          sortedProducts.map((product) => (
            <Item
              key={product.id}
              name={product.name}
              image={product.image}
              originalPrice={product.originalPrice}
              price={product.clientPrice}
              iva={product.iva}
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
          <Void
            message="No encontramos productos con estos filtros"
            suggestion="Intenta con una búsqueda diferente o ajusta los filtros."
          />
        )}
      </div>
    </div>
  );
};

export default Items;
