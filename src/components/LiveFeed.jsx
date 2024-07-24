import React, { useEffect, useRef, useState } from 'react';
import { detectAndTrackObjects } from '../utils/detection';
import { getCounts, resetCounts } from '../utils/storage';
import { uploadImage, getDetectionResults } from '../utils/api';
import { Button } from "../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"

const LiveFeed = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [counts, setCounts] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);

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

  const handleCapture = async () => {
    setIsProcessing(true);
    try {
      const canvas = canvasRef.current;
      canvas.toBlob(async (blob) => {
        const file = new File([blob], "capture.jpg", { type: "image/jpeg" });
        const uploadResult = await uploadImage(file);
        const detectionResults = await getDetectionResults(uploadResult.imageId);
        // Process and update counts based on detectionResults
        const newCounts = detectionResults.reduce((acc, result) => {
          acc[result.class] = (acc[result.class] || 0) + 1;
          return acc;
        }, {});
        setCounts(newCounts);
      }, 'image/jpeg');
    } catch (error) {
      console.error("Error processing image:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-4">Real-time Object Detection and Tracking</h1>
      <div className="relative mb-4">
        <video ref={videoRef} className="border rounded" autoPlay playsInline muted />
        <canvas ref={canvasRef} className="absolute top-0 left-0" />
      </div>
      <div className="flex space-x-4 mb-4">
        <Button onClick={handleCapture} disabled={isProcessing}>
          {isProcessing ? 'Processing...' : 'Capture and Analyze'}
        </Button>
        <Button onClick={handleReset} variant="outline">Reset Counts</Button>
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
        </CardContent>
      </Card>
    </div>
  );
};

export default LiveFeed;