import axiosInstance from '../api/axios';

export const productService = {
  createProduct: async (productData) => {
    try {
      const response = await axiosInstance.post('/products', productData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to create product');
    }
  },

  getAllProducts: async (filters = {}) => {
    try {
      const response = await axiosInstance.get('/products', { params: filters });
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch products');
    }
  },

  getProductById: async (id) => {
    try {
      const response = await axiosInstance.get(`/products/${id}`);
      return response.data;
    } catch (error) {
      throw new Error('Product not found');
    }
  },

  updateProduct: async (id, productData) => {
    try {
      const response = await axiosInstance.put(`/products/${id}`, productData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to update product');
    }
  },

  patchProduct: async (id, updates) => {
    try {
      const response = await axiosInstance.patch(`/products/${id}`, updates);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to update product');
    }
  },

  deleteProduct: async (id) => {
    try {
      const response = await axiosInstance.delete(`/products/${id}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to delete product');
    }
  },

  getBrands: async (category) => {
    try {
      const params = {};
      if (category) {
        params.category = category;
      }
      const response = await axiosInstance.get('/products/brands', { params });
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch brands');
    }
  },

  getCategories: async () => {
    try {
      const response = await axiosInstance.get('/products/categories');
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch categories');
    }
  },

  bulkUpdateSpecs: async (productIds, specsToAdd, specsToRemove) => {
    try {
      const response = await axiosInstance.post('/products/bulk-update-specs', {
        productIds,
        specsToAdd,
        specsToRemove,
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to bulk update specs');
    }
  },
};
