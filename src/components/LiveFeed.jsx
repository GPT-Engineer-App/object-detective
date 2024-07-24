import React, { useState } from 'react';

const LiveFeed = () => {
  const [counts, setCounts] = useState({});

  const simulateDetection = () => {
    const detectedObject = Math.random() > 0.5 ? 'person' : 'car';
    setCounts(prevCounts => ({
      ...prevCounts,
      [detectedObject]: (prevCounts[detectedObject] || 0) + 1
    }));
  };

  const handleReset = () => {
    setCounts({});
  };

  return (
    <div>
      <h1>Object Detection Simulation</h1>
      <div>
        <h2>Detected Objects</h2>
        <ul>
          {Object.entries(counts).map(([object, count]) => (
            <li key={object}>{object}: {count}</li>
          ))}
        </ul>
        <button onClick={simulateDetection}>Simulate Detection</button>
        <button onClick={handleReset}>Reset Counts</button>
      </div>
    </div>
  );
};

export default LiveFeed;