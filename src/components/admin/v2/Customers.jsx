import React, { useState, useEffect } from 'react';
import axiosInstance from '../../../api/axios';
import styles from '../../../styles/admin/v2/ProductsTable.module.css';
import Pagination from './Pagination';
import SearchBar from '../../SearchBar';
import { useDebounce } from '../../../hooks/useDebounce';
import { showToast } from '../../../utils/toast';

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    const fetchCustomers = async () => {
      setLoading(true);
      try {
        const params = { page, limit, search: debouncedSearchTerm };
        const response = await axiosInstance.get('/customers', { params });
        if (response.data && Array.isArray(response.data.customers)) {
          setCustomers(response.data.customers);
          setTotalCustomers(response.data.total);
        } else {
          setCustomers([]);
          setTotalCustomers(0);
        }
      } catch (error) {
        showToast('Error fetching customers:' + error.message, "error");
        setCustomers([]);
        setTotalCustomers(0);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, [page, limit, debouncedSearchTerm]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className={styles.header}>
        <h1 className={styles.pageTitle}>Clientes</h1>
        <div className={styles.headerActions}>
          <SearchBar setSearchTerm={setSearchTerm} placeholder="Buscar clientes..." />
        </div>
      </div>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Cédula</th>
              <th>Dirección</th>
              <th>Teléfono</th>
              <th>Correo Electrónico</th>
              <th>Fecha de Creación</th>
            </tr>
          </thead>
          <tbody>
            {customers.map(customer => (
              <tr key={customer._id}>
                <td>{customer.name}</td>
                <td>{customer.lastname}</td>
                <td>{customer.nationalId}</td>
                <td>{customer.address}</td>
                <td>{customer.phone}</td>
                <td>{customer.email}</td>
                <td>{new Date(customer.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination 
        page={page}
        setPage={setPage}
        limit={limit}
        setLimit={setLimit}
        totalProducts={totalCustomers}
      />
    </div>
  );
};

export default Customers;