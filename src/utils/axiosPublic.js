import axios from 'axios';

const axiosPublic = axios.create({
  baseURL: 'http://localhost:5001/api',
});

export default axiosPublic;
