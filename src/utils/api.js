const API_BASE_URL = 'https://backengine-m6trgnlp.fly.dev';

export const sendDetectionData = async (detectionData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/detection-counts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        detection_type: Object.keys(detectionData).join(','),
        count: Object.values(detectionData).reduce((a, b) => a + b, 0),
        timestamp: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to send detection data');
    }

    return await response.json();
  } catch (error) {
    console.error('Error sending detection data:', error);
    throw error;
  }
};

export const fetchSettings = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/settings`);
    if (!response.ok) {
      throw new Error('Failed to fetch settings');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching settings:', error);
    throw error;
  }
};

export const updateSettings = async (settings) => {
  try {
    const response = await fetch(`${API_BASE_URL}/settings`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(settings),
    });
    if (!response.ok) {
      throw new Error('Failed to update settings');
    }
    return await response.json();
  } catch (error) {
    console.error('Error updating settings:', error);
    throw error;
  }
};