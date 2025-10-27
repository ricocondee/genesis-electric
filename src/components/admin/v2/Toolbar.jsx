import React, { useRef } from 'react';
import styles from '../../../styles/admin/v2/Toolbar.module.css';
import { Search, ChevronDown, Plus } from 'lucide-react';

const Toolbar = ({ searchTerm, setSearchTerm, status, setStatus, category, setCategory, categories, onAddClick, onImport, onExport }) => {
  const fileInputRef = useRef(null);

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      onImport(file);
    }
  };

  return (
    <div className={styles.toolbar}>
      <div className={styles.left}>
        <div className={styles.searchBar}>
          <Search size={20} className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Buscar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className={styles.filters}>
          <div className={styles.dropdownFilter}>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="All">Estado</option>
              <option value="publicado">Publicado</option>
              <option value="borrador">Borrador</option>
              <option value="inactivo">Inactivo</option>
              <option value="agotado">Agotado</option>
            </select>
          </div>
          <div className={styles.dropdownFilter}>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="All">Categoría</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <button className={styles.filterButton}>Filtrar</button>
        </div>
      </div>
      <div className={styles.actions}>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept=".csv, .xlsx"
          style={{ display: "none" }}
        />
        <button className={styles.importButton} onClick={handleImportClick}>Importar</button>
        <button className={styles.exportButton} onClick={onExport}>Exportar</button>
        <button className={styles.addProductButton} onClick={onAddClick}>
          <Plus size={20} />
          <span>Añadir Producto</span>
        </button>
      </div>
    </div>
  );
};

export default Toolbar;
