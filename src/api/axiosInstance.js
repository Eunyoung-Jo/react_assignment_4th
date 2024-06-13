import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://moneyfulpublicpolicy.co.kr', // 실제 서버의 API base URL을 입력해야 합니다.
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
