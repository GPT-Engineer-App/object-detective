import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { detectAndTrackObjects } from '../utils/detection';
import { getCounts, resetCounts } from '../utils/storage';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const LiveFeed = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [counts, setCounts] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

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
            detectAndTrackObjects(video, canvas, setCounts);
          };
        } catch (err) {
          console.error("Error accessing the camera: ", err);
        }
      }
    };

    startDetection();
    return () => {
      // Clean up video stream when component unmounts
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
    };
  }, [navigate]);

  const handleReset = () => {
    resetCounts();
    setCounts({});
  };

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