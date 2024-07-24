import React, { useEffect, useRef, useState } from 'react';
import { detectAndTrackObjects } from '../utils/detection';
import { getCounts, resetCounts } from '../utils/storage';

const LiveFeed = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [counts, setCounts] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const startDetection = async () => {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      if (navigator.mediaDevices.getUserMedia) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true });
          video.srcObject = stream;
          video.onloadedmetadata = () => {
            video.play();
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            detectAndTrackObjects(video, canvas, handleDetectionUpdate);
          };
        } catch (err) {
          setError("Error accessing the camera. Please check your camera permissions.");
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

  const handleDetectionUpdate = async (newCounts) => {
    setCounts(newCounts);
  };

  const handleReset = async () => {
    try {
      await resetCounts();
      setCounts({});
    } catch (error) {
      setError("Failed to reset counts. Please try again.");
      console.error('Failed to reset counts:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-4">Real-time Object Detection and Tracking</h1>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      <div className="relative mb-4">
        <video ref={videoRef} className="border rounded" autoPlay playsInline muted />
        <canvas ref={canvasRef} className="absolute top-0 left-0" />
      </div>
      <div className="w-full max-w-md bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-xl font-bold mb-2">Detected Objects</h2>
        <ul className="space-y-2">
          {Object.entries(counts).map(([key, value]) => (
            <li key={key} className="flex justify-between">
              <span>{key}:</span>
              <span>{value}</span>
            </li>
          ))}
        </ul>
        <button
          onClick={handleReset}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 w-full"
        >
          Reset Counts
        </button>
      </div>
    </div>
  );
};

export default LiveFeed;