import axiosInstance from "../api/axios";

const API_URL = "/auth";

// Registro de usuario
export const register = async (userData) => {
    try {
      const res = await axiosInstance.post(
        `${API_URL}/register`,
        userData
      );
      return res.data;
    } catch (error) {
      throw error.response?.data || { message: "Error de conexión" };
    }
  };
  

// Login de usuario
export const login = async (userData) => {
  try {
    const res = await axiosInstance.post(`${API_URL}/login`, userData);
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: "Error de conexión" };
  }
};

// Obtener perfil (requiere autenticación)
export const getProfile = async () => {
  try {
    const res = await axiosInstance.get(`${API_URL}/profile`);
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: "Error de conexión" };
  }
};

export const refreshToken = async () => {
  const response = await axiosInstance.post('/auth/refresh-token');
  return response.data.accessToken;
};

export const logout = async () => {
  await axiosInstance.post('/auth/logout');
};