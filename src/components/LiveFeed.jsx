import React, { useState, useEffect } from 'react';

const LiveFeed = () => {
  const [counts, setCounts] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulating object detection
    const interval = setInterval(() => {
      const detectedObject = simulateObjectDetection();
      updateCounts(detectedObject);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const simulateObjectDetection = () => {
    const objects = ['car', 'person', 'bicycle', 'dog'];
    return objects[Math.floor(Math.random() * objects.length)];
  };

  const updateCounts = async (detectedObject) => {
    setCounts(prevCounts => {
      const newCounts = {
        ...prevCounts,
        [detectedObject]: (prevCounts[detectedObject] || 0) + 1
      };

      // Send updated count to backend
      sendCountToBackend(detectedObject, newCounts[detectedObject]);

      return newCounts;
    });
  };

  const sendCountToBackend = async (detectionType, count) => {
    try {
      const response = await fetch('https://backengine-m6trgnlp.fly.dev/api/detection-counts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          detection_type: detectionType,
          count: count,
          timestamp: new Date().toISOString(),
          // user_id is optional, so we're not including it for now
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send count to backend');
      }

      console.log('Count sent successfully');
    } catch (error) {
      console.error('Error sending count to backend:', error);
      setError('Failed to send count to backend. Please try again later.');
    }
  };

  const resetCounts = () => {
    setCounts({});
    setError(null);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Live Object Detection</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="mb-4">
        {Object.entries(counts).map(([object, count]) => (
          <p key={object}>{object}: {count}</p>
        ))}
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={resetCounts}
      >
        Reset Counts
      </button>
    </div>
  );
};

export default LiveFeed;