import { useState, useEffect } from 'react';
import styles from '../styles/OrdersPage.module.css';
import OrderCard from '../components/OrderCard';
import { showToast } from '../utils/toast';
import axiosInstance from '../api/axios';
import { useUser } from '../context/UserContext';
import { productService } from '../services/productService';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('current'); // 'current', 'unpaid', 'all'
  const { user, loading: userLoading } = useUser();

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get('/orders/my-orders'); // Assuming an /orders/my-orders endpoint
        const fetchedOrders = response.data; // Assuming response.data is directly the array of orders

        // Fetch product details for each item in each order
        const ordersWithProductDetails = await Promise.all(
          fetchedOrders.map(async (order) => {
            const itemsWithDetails = await Promise.all(
              order.items.map(async (item) => {
                // Check if productId is an object (already populated) or just an ID
                if (typeof item.productId === 'string') {
                  try {
                    const productDetailResponse = await productService.getProductById(item.productId);
                    const productDetails = productDetailResponse.data.data || productDetailResponse.data;
                    return {
                      ...item,
                      productId: {
                        ...productDetails,
                        imageUrl: productDetails.imageUrls?.[0] || productDetails.imageUrl,
                      },
                    };
                  } catch (productError) {
                    console.error(`Error fetching details for product ${item.productId}:`, productError);
                    return {
                      ...item,
                      productId: {
                        _id: item.productId,
                        name: item.name,
                        imageUrl: 'https://via.placeholder.com/150', // Placeholder image
                      },
                    };
                  }
                }
                // If productId is already an object, ensure imageUrl is present
                return {
                  ...item,
                  productId: {
                    ...item.productId,
                    imageUrl: item.productId.imageUrls?.[0] || item.productId.imageUrl || 'https://via.placeholder.com/150',
                  },
                };
              })
            );
            return { ...order, items: itemsWithDetails };
          })
        );

        setOrders(ordersWithProductDetails);
      } catch (error) {
        showToast('Error al cargar los pedidos.', 'error');
      } finally {
        setLoading(false);
      }
    };

    if (!userLoading && user) {
      fetchOrders();
    }
  }, [user, userLoading]);

  const filteredOrders = orders && orders.filter(order => {
    if (activeTab === 'current') {
      return order.status === 'pending' || order.status === 'processing'; // Example statuses
    } else if (activeTab === 'unpaid') {
      return order.status === 'unpaid'; // Example status
    } else {
      return true; // All orders
    }
  });

  if (userLoading) return <div>Cargando pedidos...</div>;

  return (
    <div className={styles.ordersPage}>
      <h2>Mis Pedidos</h2>
      <div className={styles.tabs}>
        <button
          className={`${styles.tabButton} ${activeTab === 'current' ? styles.active : ''}`}
          onClick={() => setActiveTab('current')}
        >
          Actuales
        </button>
        <button
          className={`${styles.tabButton} ${activeTab === 'unpaid' ? styles.active : ''}`}
          onClick={() => setActiveTab('unpaid')}
        >
          Pendientes de Pago
        </button>
        <button
          className={`${styles.tabButton} ${activeTab === 'all' ? styles.active : ''}`}
          onClick={() => setActiveTab('all')}
        >
          Todos
        </button>
      </div>
      <div className={styles.orderList}>
        {filteredOrders && filteredOrders.length > 0 ? (
          filteredOrders.map(order => <OrderCard key={order._id} order={order} />)
        ) : (
          <p>No hay pedidos para mostrar.</p>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
