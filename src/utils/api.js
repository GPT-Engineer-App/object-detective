const API_BASE_URL = 'https://backengine-m6trgnlp.fly.dev';

export const saveCounts = async (counts) => {
  try {
    const response = await fetch(`${API_BASE_URL}/counts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(counts),
    });

    if (!response.ok) {
      throw new Error('Failed to save counts');
    }

    return await response.json();
  } catch (error) {
    console.error('Error saving counts:', error);
    throw error;
  }
};

export const getCounts = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/counts`);

    if (!response.ok) {
      throw new Error('Failed to fetch counts');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching counts:', error);
    throw error;
  }
};