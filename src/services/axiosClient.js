import axios from 'axios';

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// 1. Interceptor REQUEST: Tự động gắn Token vào mọi request
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Lấy token từ bộ nhớ
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 2. Interceptor RESPONSE: Xử lý dữ liệu trả về cho gọn
axiosClient.interceptors.response.use(
  (response) => {
    // Chỉ lấy phần data, bỏ qua các header thừa của axios
    return response.data;
  },
  (error) => {
    // Xử lý lỗi chung (Ví dụ: Hết hạn token -> Đá ra trang login)
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosClient;