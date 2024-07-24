import React, { useEffect, useRef, useState } from 'react';

const LiveFeed = () => {
  const videoRef = useRef(null);
  const [counts, setCounts] = useState({});

  useEffect(() => {
    const startCamera = async () => {
      if (navigator.mediaDevices.getUserMedia) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true });
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        } catch (err) {
          console.error("Error accessing the camera: ", err);
        }
      }
    };

    startCamera();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const handleDetection = () => {
    // Simulating object detection
    const detectedObject = ['person', 'car', 'dog'][Math.floor(Math.random() * 3)];
    setCounts(prevCounts => ({
      ...prevCounts,
      [detectedObject]: (prevCounts[detectedObject] || 0) + 1
    }));
  };

  return (
    <div>
      <h1>Real-time Object Detection</h1>
      <video ref={videoRef} autoPlay playsInline muted />
      <button onClick={handleDetection}>Simulate Detection</button>
      <div>
        <h2>Detected Objects:</h2>
        <ul>
          {Object.entries(counts).map(([key, value]) => (
            <li key={key}>{key}: {value}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LiveFeed;