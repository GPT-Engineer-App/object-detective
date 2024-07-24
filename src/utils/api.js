import axios from 'axios';

const API_BASE_URL = 'https://api.enginelabs.ai'; // Replace with the actual API base URL

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const sendDetectionData = async (detectionData) => {
  try {
    const response = await api.post('/detection-data', detectionData);
    return response.data;
  } catch (error) {
    console.error('Error sending detection data:', error);
    throw error;
  }
};

export const fetchModelUpdates = async () => {
  try {
    const response = await api.get('/model-updates');
    return response.data;
  } catch (error) {
    console.error('Error fetching model updates:', error);
    throw error;
  }
};

export const fetchSettings = async () => {
  try {
    const response = await api.get('/settings');
    return response.data;
  } catch (error) {
    console.error('Error fetching settings:', error);
    throw error;
  }
};

export const updateSettings = async (settings) => {
  try {
    const response = await api.put('/settings', settings);
    return response.data;
  } catch (error) {
    console.error('Error updating settings:', error);
    throw error;
  }
};

export default api;