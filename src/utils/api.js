import axios from 'axios';

const API_BASE_URL = 'https://api.enginelabs.ai'; // Replace with the actual base URL

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    // Add any other default headers here
  },
});

// Function to set the authentication token
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

// Upload image for detection
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

// Retrieve detection results
export const getDetectionResults = async (imageId) => {
  try {
    const response = await api.get(`/detection/${imageId}`);
    return response.data;
  } catch (error) {
    console.error('Error getting detection results:', error);
    throw error;
  }
};

// Get user settings
export const getUserSettings = async () => {
  try {
    const response = await api.get('/settings');
    return response.data;
  } catch (error) {
    console.error('Error getting user settings:', error);
    throw error;
  }
};

// Update user settings
export const updateUserSettings = async (settings) => {
  try {
    const response = await api.put('/settings', settings);
    return response.data;
  } catch (error) {
    console.error('Error updating user settings:', error);
    throw error;
  }
};

export default api;