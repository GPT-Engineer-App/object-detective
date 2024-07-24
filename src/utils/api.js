const API_BASE_URL = 'https://api.enginelabs.ai'; // Replace with the actual base URL
const API_KEY = 'your-api-key'; // Replace with your actual API key

export const uploadImage = async (imageFile) => {
  const formData = new FormData();
  formData.append('image', imageFile);

  try {
    const response = await fetch(`${API_BASE_URL}/upload`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
      },
      body: formData,
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};

export const getDetectionResults = async (imageId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/detection/${imageId}`, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
      },
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error getting detection results:', error);
    throw error;
  }
};

export const getUserSettings = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/user/settings`, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
      },
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error getting user settings:', error);
    throw error;
  }
};

export const updateUserSettings = async (settings) => {
  try {
    const response = await fetch(`${API_BASE_URL}/user/settings`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(settings),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error updating user settings:', error);
    throw error;
  }
};