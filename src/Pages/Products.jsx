import { useState, useEffect, useCallback } from 'react';
import { productService } from '../services/productService';
import ProductGrid from "../components/ProductGrid";
import ProductList from "../components/ProductList";
import Filters from "../components/Filters";
import styles from '../styles/Product.module.css';
import { showToast } from '../utils/toast';
import { Filter } from 'lucide-react';
import Loader from '../components/Loader';
import ProductControls from "../components/ProductControls";
import Pagination from '../components/Pagination';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: '',
    status: '',
    brand: [],
    minPrice: '',
    maxPrice: '',
    q: '',
    // Spec filters
    spec_btu: '',
    spec_voltage: '',
    spec_color: ''
  });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    total: 0
  });
  const [view, setView] = useState("grid");
  const [availableBrands, setAvailableBrands] = useState([]);
  const [availableCategories, setAvailableCategories] = useState([]);
  const [sortOption, setSortOption] = useState('priceAsc');
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  const handlePageChange = (page) => {
    setPagination((prev) => ({ ...prev, currentPage: page }));
  };

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const brands = await productService.getBrands(filters.category);
        setAvailableBrands(brands.data);
      } catch (error) {
        showToast(error.message, "error");
      }
    };
    fetchBrands();
  }, [filters.category]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categories = await productService.getCategories();
        setAvailableCategories(categories.data);
      } catch (error) {
        showToast(error.message, "error");
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const cleanFilters = Object.entries({...filters, page: pagination.currentPage})
          .filter(([key, value]) => {
            if (key === 'page') {
              return true;
            }
            if (key === 'brand') {
              return value.length > 0;
            }
            return value !== '' && value.length > 0;
          })
          .reduce((acc, [key, value]) => {
            if (key === 'brand') {
              acc[key] = value.join(',');
            } else {
              acc[key] = value;
            }
            return acc;
          }, {});

        if (sortOption === 'priceAsc') {
          cleanFilters.sortBy = 'clientPrice';
          cleanFilters.sortOrder = 'asc';
        } else if (sortOption === 'priceDesc') {
          cleanFilters.sortBy = 'clientPrice';
          cleanFilters.sortOrder = 'desc';
        } else if (sortOption === 'relevance') {
          cleanFilters.sortBy = 'relevance';
        }

        const response = await productService.getAllProducts(cleanFilters);
        const productsData = Array.isArray(response.data) ? response.data : [];
        const productsWithImages = productsData.map((p) => {
          let imageUrls = [];
          if (p.imageUrls && p.imageUrls.length > 0) {
            imageUrls = p.imageUrls;
          } else if (p.imageUrl) {
            imageUrls = [p.imageUrl];
          }

          return {
            ...p,
            price: p.price,
            iva: p.IVA,
            image: imageUrls.length > 0 ? imageUrls[0] : 'https://placehold.co/300x300',
            imageUrls: imageUrls,
          };
        });

        setProducts(productsWithImages);
        setPagination(response.pagination);

      } catch (err) {
        showToast(err.message, "error");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [JSON.stringify(filters), pagination.currentPage, sortOption]);

  if (loading) return <Loader />;

  return (
    <div className={styles.container}>
      <div className={styles.mainLayout}>
        <div className={styles.leftSidebar}>
          <Filters filters={filters} setFilters={setFilters} availableBrands={availableBrands} availableCategories={availableCategories} />
        </div>
        <div className={styles.mainContent}>
          <ProductControls
            sortOption={sortOption}
            setSortOption={setSortOption}
            filters={filters}
            setFilters={setFilters}
            view={view}
            setView={setView}
            onFilterClick={() => setIsFilterDrawerOpen(true)}
          />
          {view === "grid" ? (
            <ProductGrid 
              products={products} 
            />
          ) : (
            <ProductList
              products={products}
            />
          )}
          <Pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
      <div className={`${styles.filterDrawer} ${isFilterDrawerOpen ? styles.open : ''}`}>
        <div className={styles.drawerHeader}>
          <h3>Filtros</h3>
          <button onClick={() => setIsFilterDrawerOpen(false)}>&times;</button>
        </div>
        <Filters 
            filters={filters} 
            setFilters={setFilters} 
            availableBrands={availableBrands} 
            availableCategories={availableCategories} 
            onClose={() => setIsFilterDrawerOpen(false)}
        />
      </div>
      {isFilterDrawerOpen && <div className={styles.overlay} onClick={() => setIsFilterDrawerOpen(false)}></div>}
    </div>
  );
};

export default Products;