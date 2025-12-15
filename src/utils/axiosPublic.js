import axios from 'axios';

const axiosPublic = axios.create({
  baseURL: 'https://api.genesiselectricsas.com/api',
});

export default axiosPublic;
