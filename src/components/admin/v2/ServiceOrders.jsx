import { useState, useEffect, useCallback } from 'react';
import FilterBar from './service_orders/FilterBar';
import OrdersTable from './service_orders/OrdersTable';
import Pagination from './layout/Pagination';
import styles from '/src/styles/admin/v2/ServiceOrders.module.css';
import { serviceOrderService } from '../../../services/serviceOrderService';
import { useDebounce } from '../../../hooks/useDebounce';
import Loader from '../Loader';
import { showToast } from '../../../utils/toast';
import CreateServiceOrderModal from './CreateServiceOrderModal';

const ServiceOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState('');
  const [status, setStatus] = useState('All');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalOrders, setTotalOrders] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const searchTerm = useDebounce(searchInput, 500);

  const fetchServiceOrders = useCallback(async () => {
    try {
      setLoading(true);
      const params = {
        search: searchTerm,
        page,
        limit,
      };
      if (status !== 'All') {
        params.status = status;
      }

      const response = await serviceOrderService.getAllServiceOrders(params);
      const ordersData = response && Array.isArray(response.orders) ? response.orders : [];
      const total = response ? response.total : 0;

      setOrders(ordersData);
      setTotalOrders(total);

    } catch (err) {
      showToast('Error al cargar las órdenes de servicio. Por favor, intente de nuevo más tarde.', "error");
    } finally {
      setLoading(false);
    }
  }, [searchTerm, status, page, limit]);

  useEffect(() => {
    fetchServiceOrders();
  }, [fetchServiceOrders]);

  return (
    <div className={styles.content}>
      <div className={styles.header}>
        <h1 className={styles.title}>Órdenes de Servicio</h1>
        <button onClick={() => setIsModalOpen(true)} className={styles.createButton}>Crear Orden</button>
      </div>
      <FilterBar />
      {loading ? <Loader /> : <OrdersTable orders={orders} />}
      <Pagination
        page={page}
        setPage={setPage}
        limit={limit}
        setLimit={setLimit}
        totalProducts={totalOrders}
      />
      <CreateServiceOrderModal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default ServiceOrders;