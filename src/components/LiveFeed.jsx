import React, { useState } from 'react';

function LiveFeed() {
  const [counts, setCounts] = useState({});

  const simulateDetection = () => {
    const objects = ['person', 'car', 'dog', 'cat'];
    const detectedObject = objects[Math.floor(Math.random() * objects.length)];
    setCounts(prevCounts => ({
      ...prevCounts,
      [detectedObject]: (prevCounts[detectedObject] || 0) + 1
    }));
  };

  const resetCounts = () => {
    setCounts({});
  };

  return (
    <div>
      <h1>Object Detection Simulation</h1>
      <button onClick={simulateDetection}>Simulate Detection</button>
      <button onClick={resetCounts}>Reset Counts</button>
      <ul>
        {Object.entries(counts).map(([object, count]) => (
          <li key={object}>{object}: {count}</li>
        ))}
      </ul>
    </div>
  );
}

export default LiveFeed;