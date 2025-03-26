import { useState } from "react";
import styles from "../styles/SearchBar.module.css";
import { Search } from "lucide-react";

const SearchBar = ({ setSearchTerm }) => {
  const [query, setQuery] = useState("");

  const handleSearch = (event) => {
    const value = event.target.value;
    setQuery(value);
    setSearchTerm(value.toLowerCase());
  };

  return (
    <div className={styles.searchContainer}>
      <input
        type="text"
        className={styles.searchInput}
        placeholder="Buscar productos..."
        value={query}
        onChange={handleSearch}
      />
      <Search className={styles.searchIcon}/>
    </div>
  );
};

export default SearchBar;
