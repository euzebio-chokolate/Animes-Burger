import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

let accessToken = null;
let refreshToken = null;

export function setTokens({ access, refresh }) {
  accessToken = access;
  refreshToken = refresh;
}

api.interceptors.request.use(config => {
  if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
});

api.interceptors.response.use(
  res => res,
  async err => {
    const original = err.config;
    if (err.response && err.response.status === 401 && !original._retry && refreshToken) {
      original._retry = true;
      try {
        const r = await axios.post("http://localhost:3000/api/auth/refresh", { refreshToken });
        accessToken = r.data.accessToken;
        refreshToken = r.data.refreshToken;
        original.headers.Authorization = `Bearer ${accessToken}`;
        return api(original);
        
      } catch (refreshErr) {
        throw refreshErr;
      }
    }
    throw err;
  }
);

export default api;
