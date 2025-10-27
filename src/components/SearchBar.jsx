import { useState } from "react";
import styles from "../styles/SearchBar.module.css";
import { Search } from "lucide-react";

const SearchBar = ({ filters, setFilters, placeholder }) => {

  const handleSearch = (event) => {
    const value = event.target.value;
    setFilters({ ...filters, q: value });
  };

  return (
    <div className={styles.searchContainer}>
      <input
        type="text"
        className={styles.searchInput}
        placeholder={placeholder || "Buscar..."}
        value={filters.q}
        onChange={handleSearch}
      />
      <Search className={styles.searchIcon}/>
    </div>
  );
};

export default SearchBar;