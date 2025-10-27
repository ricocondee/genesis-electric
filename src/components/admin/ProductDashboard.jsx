import React, { useState, useEffect, useCallback } from 'react';
import Toolbar from './Toolbar';
import ProductsTable from './ProductsTable';
import Pagination from './Pagination';
import styles from '../../styles/admin/ProductDashboard.module.css';
import { productService } from '../../services/productService';
import { useDebounce } from '../../hooks/useDebounce';
import Loader from './Loader';
import ProductForm from './ProductForm';
import ConfirmationModal from '../ConfirmationModal';
import { showToast } from '../../utils/toast';

const ProductDashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState('');
  const [status, setStatus] = useState('All');
  const [category, setCategory] = useState('All');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalProducts, setTotalProducts] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const searchTerm = useDebounce(searchInput, 500);

  const handleAddClick = () => {
    setEditingProduct(null);
    setShowForm(true);
  };

  const handleEditClick = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleDelete = async (id) => {
    try {
      await productService.deleteProduct(id);
      fetchProducts();
      showToast('Producto eliminado exitosamente!', "success");
    } catch (error) {
      showToast('Error al eliminar el producto.', "error");
    }
  };

  const openDeleteModal = (id) => {
    setProductToDelete(id);
    setIsModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsModalOpen(false);
    setProductToDelete(null);
  };

  const confirmDelete = () => {
    handleDelete(productToDelete);
    closeDeleteModal();
  };

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const params = {
        search: searchTerm,
        page,
        limit,
        status: status === 'All' ? '' : status,
        category: category === 'All' ? '' : category,
      };

      const response = await productService.getAllProducts(params);
      const productsData = Array.isArray(response.data) ? response.data : [];
      const total = response.pagination.total || productsData.length;

      const transformedProducts = productsData.map((p, index) => {
        return {
          id: p._id || index,
          name: p.name,
          description: p.description,
          image: p.imageUrl || 'https://via.placeholder.com/40',
          price: p.providersPrice,
          quantity: p.quantity,
          category: p.category,
          status: p.status,
          specs: p.specs || {},
        };
      });
      setProducts(transformedProducts);
      setTotalProducts(total);
    } catch (err) {
      showToast('Error al cargar los productos. Por favor, intente de nuevo más tarde.', "error");
    } finally {
      setLoading(false);
    }
  }, [searchTerm, status, category, page, limit]);


  const handleSave = useCallback(async (formData) => {
    try {
      const payload = {
        name: formData.name,
        description: formData.description,
        imageUrl: formData.imageUrl || (editingProduct ? editingProduct.imageUrl : ''), // Use existing imageUrl if not provided
        providersPrice: parseFloat(formData.providersPrice),
        profitPercentage: parseFloat(formData.profitPercentage),
        quantity: parseInt(formData.quantity, 10),
        status: formData.status,
        category: formData.category,
        specs: formData.specs,
      };

      if (formData.id) {
        await productService.patchProduct(formData.id, payload);
      } else {
        await productService.createProduct(payload);
      }

      fetchProducts();
      setShowForm(false);
      showToast('Producto guardado exitosamente!', "success");
    } catch (error) {
      if (error.response && error.response.data) {
        showToast(`Error al guardar el producto: ${JSON.stringify(error.response.data)}`, "error");
      } else {
        showToast('Error al guardar el producto.', "error");
      }
    }
  }, [fetchProducts, editingProduct]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div className={styles.productDashboard}>
      {showForm && (
        <ProductForm
          onSave={handleSave}
          product={editingProduct}
          onClose={handleCloseForm}
        />
      )}
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
        message="¿Estás seguro de que quieres eliminar este producto?"
      />
      <h1 className={styles.title}>Lista de Productos</h1>
      <Toolbar
        searchTerm={searchInput}
        setSearchTerm={setSearchInput}
        status={status}
        setStatus={setStatus}
        category={category}
        setCategory={setCategory}
        onAddClick={handleAddClick}
      />
      <div className={`${styles.tableContainer} ${loading ? styles.loading : ''}`}>
        {loading && <Loader />}
        <ProductsTable products={products} onEdit={handleEditClick} onDelete={openDeleteModal} />
      </div>
      <Pagination
        page={page}
        setPage={setPage}
        limit={limit}
        setLimit={setLimit}
        totalProducts={totalProducts}
      />
    </div>
  );
};

export default ProductDashboard;