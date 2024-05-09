import { store } from '@/store/store';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: Number(import.meta.env.VITE_APP_AXIOS_TIMEOUT)
});

axiosInstance.interceptors.request.use(
  (config) => {
    if (config.headers) {
      const authInfo = store.getState().auth;
      const accessToken = authInfo.tokens?.accessToken;

      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
