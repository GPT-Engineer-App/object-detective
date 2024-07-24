import React, { useState, useEffect } from 'react';
import { sendDetectionData } from '../utils/api';

const LiveFeed = () => {
  const [counts, setCounts] = useState({});

  useEffect(() => {
    const simulateDetection = () => {
      const objects = ['person', 'car', 'dog', 'cat'];
      const newCounts = {};
      objects.forEach(obj => {
        newCounts[obj] = Math.floor(Math.random() * 5);
      });
      setCounts(newCounts);
      sendDetectionData(newCounts).catch(console.error);
    };

    const interval = setInterval(simulateDetection, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleReset = () => {
    setCounts({});
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Simulated Object Detection</h1>
      <div className="mb-4">
        {Object.entries(counts).map(([key, value]) => (
          <p key={key}>{key}: {value}</p>
        ))}
      </div>
      <button 
        onClick={handleReset}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Reset Counts
      </button>
    </div>
  );
};

export default LiveFeed;