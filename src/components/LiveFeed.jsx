import React, { useState, useEffect } from 'react';

const LiveFeed = () => {
  const [counts, setCounts] = useState({});

  useEffect(() => {
    const interval = setInterval(() => {
      const detectedObject = Math.random() > 0.5 ? 'person' : 'car';
      setCounts(prevCounts => ({
        ...prevCounts,
        [detectedObject]: (prevCounts[detectedObject] || 0) + 1
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

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
        <button onClick={handleReset}>Reset Counts</button>
      </div>
    </div>
  );
};

export default LiveFeed;