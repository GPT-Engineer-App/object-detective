const API_BASE_URL = 'https://api.enginelabs.ai'; // Replace with the actual API base URL

export const sendDetectionData = async (detectionData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/detection-data`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(detectionData),
    });
    return await response.json();
  } catch (error) {
    console.error('Error sending detection data:', error);
    throw error;
  }
};

export const fetchCountHistory = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/count-history`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching count history:', error);
    throw error;
  }
};