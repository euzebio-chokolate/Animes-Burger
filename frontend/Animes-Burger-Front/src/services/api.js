import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;
    
    const refreshToken = localStorage.getItem('refreshToken');

    if (err.response?.status === 401 && !originalRequest._retry && refreshToken) {
      originalRequest._retry = true; // Marca que já tentou
      
      try {
        const { data } = await api.post("/usuarios/refresh", { refreshToken });

        const newAccessToken = data.accessToken;
        
        localStorage.setItem('token', newAccessToken);
        
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
        
      } catch (refreshErr) {
        console.error("Sessão expirada. Faça login novamente.", refreshErr);
        localStorage.clear(); 
        window.location.href = '/login';
        return Promise.reject(refreshErr);
      }
    }

    return Promise.reject(err);
  }
);

export default api;