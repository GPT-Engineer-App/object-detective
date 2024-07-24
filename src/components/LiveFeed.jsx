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
          console.error("Error accessing the camera: ", err);
          setError("Failed to access the camera. Please check your permissions and try again.");
        }
      } else {
        setError("Your browser doesn't support getUserMedia.");
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
    setCounts(prevCounts => {
      const updatedCounts = { ...prevCounts };
      Object.entries(newCounts).forEach(([key, value]) => {
        updatedCounts[key] = (updatedCounts[key] || 0) + value;
      });
      return updatedCounts;
    });
    console.log("Updated counts:", newCounts);
  };

  const handleReset = () => {
    setCounts({});
    console.log("Counts reset");
  };

  if (error) {
    return <div style={{ color: 'red' }}>{error}</div>;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '1rem' }}>
      <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', marginBottom: '1rem' }}>Real-time Object Detection and Tracking</h1>
      <div style={{ position: 'relative', marginBottom: '1rem' }}>
        <video ref={videoRef} style={{ border: '1px solid black', borderRadius: '0.25rem' }} autoPlay playsInline muted />
        <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0 }} />
      </div>
      <div style={{ width: '100%', maxWidth: '20rem', border: '1px solid #ccc', borderRadius: '0.25rem', padding: '1rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Detected Objects</h2>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {Object.entries(counts).map(([key, value]) => (
            <li key={key} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span>{key}:</span>
              <span>{value}</span>
            </li>
          ))}
        </ul>
        <button onClick={handleReset} style={{ width: '100%', padding: '0.5rem', backgroundColor: '#4299e1', color: 'white', border: 'none', borderRadius: '0.25rem', cursor: 'pointer' }}>Reset Counts</button>
      </div>
    </div>
  );
};

export default LiveFeed;