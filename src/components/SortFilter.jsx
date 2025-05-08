import { useState } from "react";
import styles from "../styles/SortFilter.module.css";

const SortFilter = ({ setSortOption }) => {
  const [selectedOption, setSelectedOption] = useState("priceAsc");

  const handleSortChange = (event) => {
    const value = event.target.value;
    setSelectedOption(value);
    setSortOption(value);
  };

  return (
    <div className={styles.sortContainer}>
      <label className={styles.label}>Ordenar por:</label>
      <select className={styles.select} value={selectedOption} onChange={handleSortChange}>
        <option value="priceAsc">Precio de menor a mayor</option>
        <option value="priceDesc">Precio de mayor a menor</option>
        <option value="relevance">Relevancia</option>
      </select>
    </div>
  );
};

export default SortFilter;
