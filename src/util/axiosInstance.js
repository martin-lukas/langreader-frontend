import Axios from 'axios';

const axiosInstance = Axios.create({
  baseURL: 'http://localhost:8080/api'
});

axiosInstance.interceptors.request.use((config) => ({
  ...config,
  headers: {
    ...{
      'Content-type': 'application/json'
    }
  }
}))

export default axiosInstance;