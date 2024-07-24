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
      const canvas = canvasRef.current;
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true });
          video.srcObject = stream;
          video.onloadedmetadata = () => {
            video.play();
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            detectAndTrackObjects(video, canvas, setCounts);
          };
        } catch (err) {
          console.error("Error accessing the camera: ", err);
        }
      }
    };

    startDetection();
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const handleReset = () => {
    resetCounts();
    setCounts({});
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold mb-4">Real-time Object Detection</h1>
      <div className="relative aspect-video mb-4">
        <video ref={videoRef} className="w-full h-full object-cover rounded-lg" autoPlay playsInline muted />
        <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />
      </div>
      <div className="bg-white shadow rounded-lg p-4">
        <h2 className="text-xl font-semibold mb-2">Detected Objects</h2>
        <ul className="space-y-2">
          {Object.entries(counts).map(([key, value]) => (
            <li key={key} className="flex justify-between">
              <span>{key}:</span>
              <span>{value}</span>
            </li>
          ))}
        </ul>
        <button onClick={handleReset} className="mt-4 w-full bg-red-500 text-white p-2 rounded">Reset Counts</button>
      </div>
    </div>
  );
};

export default LiveFeed;