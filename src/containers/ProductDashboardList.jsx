import { useEffect, useState } from "react";
import styles from "../styles/ProductDashboardList.module.css";
import { TbSearch } from "react-icons/tb";
import ProductForm from "../components/ProductForm";

const ProductDashboardList = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [addProduct, setAddProduct] = useState(false);
  const itemsPerPage = 25;

  const handleButtonClick = () => {
    setAddProduct(!addProduct);
  };

  const handleClose = () => {
    setAddProduct(false); 
}

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setAddProduct(false);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/ricocondee/genesis-electric/main/src/db/products.json"
    )
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  // Filtrar productos en base al término de búsqueda
  const filteredProducts = products.filter((product) =>
    Object.values(product).some((value) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Paginación
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className={styles.container}>
      {addProduct && <ProductForm func={handleClose}/>}
      <div className={styles.add__product}>
        <h2>Productos</h2>
        <button className={styles.add__product__button} onClick={handleButtonClick}>
          Agregar Producto
        </button>
      </div>
      {/* Barra de búsqueda */}
      <div className={styles.searchBar}>
      <TbSearch/>
        <input
          type="text"
          placeholder={`Buscar productos...`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {/* Tabla de productos */}
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Seleccionar</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Descripción</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {paginatedProducts.map((product) => (
              <tr key={product.id}>
                <td>
                  <input type="checkbox" />
                </td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.description}</td>
                <td>
                  <button className={styles.editButton}>Editar</button>
                  <button className={styles.deleteButton}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      <div className={styles.pagination}>
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Anterior
        </button>
        <span>
          Página {currentPage} de {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default ProductDashboardList;
