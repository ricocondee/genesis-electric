import axiosInstance from '../api/axios';

export const serviceOrderService = {
  getAllServiceOrders: async (filters = {}) => {
    try {
      const response = await axiosInstance.get('/service-orders', { params: filters });
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        window.location.href = '/login';
      }
      throw error;
    }
  },

  getServiceOrderById: async (id) => {
    try {
      const response = await axiosInstance.get(`/service-orders/${id}`);
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        window.location.href = '/login';
      }
      throw error;
    }
  },

  createServiceOrder: async (orderData) => {
    try {
      const response = await axiosInstance.post('/service-orders', orderData);
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        window.location.href = '/login';
      }
      throw error;
    }
  },
};
