import React, { useState, useEffect } from 'react';

const LiveFeed = () => {
  const [counts, setCounts] = useState({});

  useEffect(() => {
    const savedCounts = localStorage.getItem('objectCounts');
    if (savedCounts) {
      setCounts(JSON.parse(savedCounts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('objectCounts', JSON.stringify(counts));
  }, [counts]);

  const handleDetection = () => {
    const objects = ['person', 'car', 'dog', 'cat', 'bird'];
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
      <h1>Object Detection Simulator</h1>
      <button onClick={handleDetection}>Simulate Detection</button>
      <button onClick={resetCounts}>Reset Counts</button>
      <div>
        <h2>Detected Objects:</h2>
        <ul>
          {Object.entries(counts).map(([object, count]) => (
            <li key={object}>{object}: {count}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LiveFeed;