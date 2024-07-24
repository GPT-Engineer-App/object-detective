import axios from 'axios';

const API_BASE_URL = 'https://api.enginelabs.ai'; // Replace with the actual base URL
const API_KEY = 'your-api-key'; // Replace with your actual API key

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Authorization': `Bearer ${API_KEY}`,
    'Content-Type': 'application/json',
  },
});

export const uploadImage = async (imageFile) => {
  const formData = new FormData();
  formData.append('image', imageFile);

  try {
    const response = await api.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};

export const getDetectionResults = async (imageId) => {
  try {
    const response = await api.get(`/detection/${imageId}`);
    return response.data;
  } catch (error) {
    console.error('Error getting detection results:', error);
    throw error;
  }
};

export const getUserSettings = async () => {
  try {
    const response = await api.get('/user/settings');
    return response.data;
  } catch (error) {
    console.error('Error getting user settings:', error);
    throw error;
  }
};

export const updateUserSettings = async (settings) => {
  try {
    const response = await api.put('/user/settings', settings);
    return response.data;
  } catch (error) {
    console.error('Error updating user settings:', error);
    throw error;
  }
};