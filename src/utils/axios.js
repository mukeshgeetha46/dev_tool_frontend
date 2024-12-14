import axios from 'axios';

const api_url = import.meta.env.VITE_APP_API_URL;

const axiosServices = axios.create({ baseURL: api_url || 'http://localhost:3010/' });

// ==============================|| AXIOS - FOR MOCK SERVICES ||============================== //

axiosServices.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem('serviceToken');
    if (accessToken) {
      config.headers['authorization'] = accessToken;
    } else {
      window.location.pathname = '/login';
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosServices.interceptors.response.use(
  (response) => {console.log(response); return response;},
  (error) => {
    if (error.response.status === 401 && !window.location.href.includes('/login')) {
      window.location.pathname = '/maintenance/500';
    }
    return Promise.reject((error.response && error.response.data) || 'Wrong Services');
  }
);

export default axiosServices;

export const fetcher = async (args) => {
//   const [url, config] = Array.isArray(args) ? args : [args];

  const res = await axiosServices.get(api_url);

  return res.data;
};

export const fetcherPost = async (slug,data) => {

  const res = await axiosServices.post(api_url+slug, data);

  return res.data;
};