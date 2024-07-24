import axios from 'axios';

const API_BASE_URL = 'https://backengine-m6trgnlp.fly.dev';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

export const signup = async (email, password) => {
  try {
    const response = await api.post('/signup', { email, password });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const login = async (email, password) => {
  try {
    const response = await api.post('/login', { email, password });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getApiKey = async () => {
  try {
    const response = await api.get('/api-key');
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const healthCheck = async () => {
  try {
    const response = await api.get('/health');
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const storeDetectionCounts = async (counts) => {
  try {
    const response = await api.post('/detection-counts', counts);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export default api;