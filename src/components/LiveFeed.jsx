import React, { useState, useEffect } from 'react';

const LiveFeed = () => {
  const [counts, setCounts] = useState({ person: 0, car: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      setCounts(prevCounts => ({
        person: prevCounts.person + Math.floor(Math.random() * 2),
        car: prevCounts.car + Math.floor(Math.random() * 2)
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const handleReset = () => {
    setCounts({ person: 0, car: 0 });
  };

  return (
    <div>
      <h1>Object Detection Simulation</h1>
      <div>
        <h2>Detected Objects</h2>
        <ul>
          <li>Person: {counts.person}</li>
          <li>Car: {counts.car}</li>
        </ul>
        <button onClick={handleReset}>Reset Counts</button>
      </div>
    </div>
  );
};

export default LiveFeed;