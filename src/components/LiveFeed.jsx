import React, { useEffect, useRef, useState } from 'react';
import { detectAndTrackObjects } from '../utils/detection';

const LiveFeed = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [counts, setCounts] = useState({});
  const [error, setError] = useState(null);

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

  const handleDetectionUpdate = (newCounts) => {
    setCounts(newCounts);
  };

  const handleReset = () => {
    setCounts({});
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
      <h1 style={{ fontSize: '24px', marginBottom: '20px' }}>Real-time Object Detection and Tracking</h1>
      {error && (
        <div style={{ backgroundColor: '#ffcccc', padding: '10px', marginBottom: '20px', borderRadius: '5px' }}>
          <strong>Error: </strong>
          <span>{error}</span>
        </div>
      )}
      <div style={{ position: 'relative', marginBottom: '20px' }}>
        <video ref={videoRef} style={{ border: '1px solid #ccc', borderRadius: '5px' }} autoPlay playsInline muted />
        <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0 }} />
      </div>
      <div style={{ width: '100%', maxWidth: '400px', backgroundColor: '#f0f0f0', padding: '20px', borderRadius: '5px' }}>
        <h2 style={{ fontSize: '20px', marginBottom: '10px' }}>Detected Objects</h2>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {Object.entries(counts).map(([key, value]) => (
            <li key={key} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
              <span>{key}:</span>
              <span>{value}</span>
            </li>
          ))}
        </ul>
        <button
          onClick={handleReset}
          style={{
            backgroundColor: '#4CAF50',
            border: 'none',
            color: 'white',
            padding: '10px 20px',
            textAlign: 'center',
            textDecoration: 'none',
            display: 'inline-block',
            fontSize: '16px',
            margin: '4px 2px',
            cursor: 'pointer',
            borderRadius: '5px',
            width: '100%'
          }}
        >
          Reset Counts
        </button>
      </div>
    </div>
  );
};

export default LiveFeed;