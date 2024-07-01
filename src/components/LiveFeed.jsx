import React, { useEffect, useRef, useState } from 'react';
import { detectAndTrackObjects } from '../utils/detection';
import { getCounts, resetCounts } from '../utils/storage';

const LiveFeed = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [counts, setCounts] = useState({});

  useEffect(() => {
    const startDetection = async () => {
      const video = videoRef.current;
      if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
          .then((stream) => {
            video.srcObject = stream;
            video.onloadedmetadata = () => {
              video.play();
              detectAndTrackObjects(video, canvasRef.current, setCounts);
            };
          })
          .catch((err) => {
            console.error("Error accessing the camera: ", err);
          });
      }
    };

    startDetection();
  }, []);

  const handleReset = () => {
    resetCounts();
    setCounts({});
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen relative">
      <h1 className="text-3xl font-bold mb-4">Real-time Object Detection and Tracking</h1>
      <div className="relative">
        <video ref={videoRef} className="border rounded mb-4" autoPlay playsInline muted width="640" height="480" />
        <canvas ref={canvasRef} className="absolute top-0 left-0" />
      </div>
      <div className="absolute top-0 right-0 p-4 bg-white bg-opacity-75 rounded">
        <h2 className="text-xl font-bold mb-2">Detected Objects</h2>
        <ul>
          {Object.entries(counts).map(([key, value]) => (
            <li key={key}>{key}: {value}</li>
          ))}
        </ul>
        <button onClick={handleReset} className="mt-4 p-2 bg-red-500 text-white rounded">Reset Counts</button>
      </div>
    </div>
  );
};

export default LiveFeed;