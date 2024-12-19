// axiosConfig.js
import axios from 'axios';

const setupAxiosInterceptors = () => {
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
       window.location.href='/login?sessionexp=1';
      }
      return Promise.reject(error);
    }
  );
};

export default setupAxiosInterceptors;
