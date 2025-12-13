import { useState, useEffect, useCallback } from 'react';
import Toolbar from './Toolbar';
import ProductsTable from './ProductsTable';
import Pagination from './Pagination';
import styles from '../../../styles/admin/v2/ProductDashboard.module.css';
import { productService } from '../../../services/productService';
import { useDebounce } from '../../../hooks/useDebounce';
import Loader from '../Loader';
import ProductForm from './ProductForm';
import ConfirmationModal from '../../ConfirmationModal';
import { showToast } from '../../../utils/toast';
import { useUser } from '../../../context/UserContext';
import { ArrowLeft, Search, Plus } from 'lucide-react';

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
  const [categories, setCategories] = useState([]);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const { user } = useUser();

  const canDelete = user && (user.role === 'admin' || user.role === 'manager');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await productService.getCategories();
        setCategories(response.data);
      } catch (error) {
        showToast('Error al cargar las categorías.', "error");
      }
    };
    fetchCategories();
  }, []);

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

  const handleStatusChange = async (productId, newStatus) => {
    try {
      await productService.patchProduct(productId, { status: newStatus });
      fetchProducts();
      showToast('Estado del producto actualizado.', "success");
    } catch (error) {
      showToast('Error al actualizar el estado del producto.', "error");
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
        let imageUrls = [];
        if (p.imageUrls && p.imageUrls.length > 0) {
          imageUrls = p.imageUrls;
        } else if (p.imageUrl) {
          imageUrls = [p.imageUrl];
        }

        return {
          id: p._id || index,
          name: p.name,
          description: p.description,
          image: imageUrls.length > 0 ? imageUrls[0] : 'https://placehold.co/40x40',
          providersPrice: p.providersPrice,
          profitPercentage: p.profitPercentage,
          brand: p.brand,
          quantity: p.quantity,
          category: p.category,
          status: p.status,
          SKU: p.SKU,
          specs: p.specs || {},
          imageUrls: imageUrls, // Pass the full array for editing
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
        brand: formData.brand,
        SKU: formData.SKU,
        description: formData.description,
        imageUrls: formData.imageUrls, // Use imageUrls array
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
      <div className={styles.mobileHeader}>
        <button className={styles.backButton}><ArrowLeft size={24} /></button>
        <h1 className={styles.mobileTitle}>Products</h1>
        <div className={styles.mobileActions}>
          <button className={styles.actionButton} onClick={() => setIsSearchVisible(true)}><Search size={24} /></button>
          <button className={styles.actionButton} onClick={handleAddClick}><Plus size={24} /></button>
        </div>
      </div>
      <h1 className={styles.desktopTitle}>Lista de Productos</h1>
      <Toolbar
        searchTerm={searchInput}
        setSearchTerm={setSearchInput}
        status={status}
        setStatus={setStatus}
        category={category}
        setCategory={setCategory}
        categories={categories}
        onAddClick={handleAddClick}
        isSearchVisible={isSearchVisible}
        setIsSearchVisible={setIsSearchVisible}
      />
      <div className={`${styles.tableContainer} ${loading ? styles.loading : ''}`}>
        {loading && <Loader />}
        <ProductsTable products={products} onEdit={handleEditClick} onDelete={openDeleteModal} canDelete={canDelete} onStatusChange={handleStatusChange} />
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
