import React, { useState, useEffect } from 'react';

const LiveFeed = () => {
  const [counts, setCounts] = useState({});
  const [lastDetection, setLastDetection] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate object detection
      const detectedObject = Math.random() > 0.5 ? 'person' : 'car';
      setLastDetection(detectedObject);
      
      setCounts(prevCounts => ({
        ...prevCounts,
        [detectedObject]: (prevCounts[detectedObject] || 0) + 1
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const handleReset = () => {
    setCounts({});
    setLastDetection(null);
  };

  return (
    <div>
      <h1>Improved Object Detection Simulation</h1>
      <div>
        <h2>Detected Objects</h2>
        <ul>
          {Object.entries(counts).map(([object, count]) => (
            <li key={object}>{object}: {count}</li>
          ))}
        </ul>
        <p>Last detected: {lastDetection || 'None'}</p>
        <button onClick={handleReset}>Reset Counts</button>
      </div>
    </div>
  );
};

export default LiveFeed;