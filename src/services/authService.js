import axios from "axios";

const API_URL = "https://api.genesiselectricsas.com/api/auth";

// Registro de usuario
export const register = async (userData, token) => {
    try {
      const res = await axios.post(
        `${API_URL}/register`,
        userData,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      return res.data;
    } catch (error) {
      throw error.response?.data || { message: "Error de conexión" };
    }
  };
  

// Login de usuario
export const login = async (userData) => {
  try {
    const res = await axios.post(`${API_URL}/login`, userData);
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: "Error de conexión" };
  }
};

// Obtener perfil (requiere autenticación)
export const getProfile = async (token) => {
  try {
    const res = await axios.get(`${API_URL}/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: "Error de conexión" };
  }
};
