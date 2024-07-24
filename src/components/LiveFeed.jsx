import React, { useEffect, useRef, useState } from 'react';
import { detectAndTrackObjects } from '../utils/detection';
import { Button } from "../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"

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
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-4">Real-time Object Detection and Tracking</h1>
      <div className="relative mb-4">
        <video ref={videoRef} className="border rounded" autoPlay playsInline muted />
        <canvas ref={canvasRef} className="absolute top-0 left-0" />
      </div>
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Detected Objects</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {Object.entries(counts).map(([key, value]) => (
              <li key={key} className="flex justify-between">
                <span>{key}:</span>
                <span>{value}</span>
              </li>
            ))}
          </ul>
          <Button onClick={handleReset} className="mt-4 w-full">Reset Counts</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default LiveFeed;