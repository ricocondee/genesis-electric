import styles from "../styles/SearchBar.module.css";
import { Search } from "lucide-react";

const SearchBar = ({ searchTerm, setSearchTerm, placeholder }) => {

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className={styles.searchContainer}>
      <input
        type="text"
        className={styles.searchInput}
        placeholder={placeholder || "Buscar..."}
        value={searchTerm}
        onChange={handleSearch}
      />
      <Search className={styles.searchIcon}/>
    </div>
  );
};

export default SearchBar;