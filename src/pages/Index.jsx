import React, { useEffect, useRef } from 'react';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import '@tensorflow/tfjs';

const Index = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const loadModelAndDetect = async () => {
      const model = await cocoSsd.load();
      const video = videoRef.current;

      if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
          .then((stream) => {
            video.srcObject = stream;
            video.onloadedmetadata = () => {
              video.play();
              detectFrame(video, model);
            };
          })
          .catch((err) => {
            console.error("Error accessing the camera: ", err);
          });
      }
    };

    const detectFrame = (video, model) => {
      model.detect(video).then(predictions => {
        renderPredictions(predictions);
        requestAnimationFrame(() => {
          detectFrame(video, model);
        });
      });
    };

    const renderPredictions = (predictions) => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;

      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      predictions.forEach(prediction => {
        if (['bottle', 'can'].includes(prediction.class)) {
          ctx.beginPath();
          ctx.rect(...prediction.bbox);
          ctx.lineWidth = 2;
          ctx.strokeStyle = 'green';
          ctx.fillStyle = 'green';
          ctx.stroke();
          ctx.fillText(
            `${prediction.class} (${Math.round(prediction.score * 100)}%)`,
            prediction.bbox[0],
            prediction.bbox[1] > 10 ? prediction.bbox[1] - 5 : 10
          );
        }
      });
    };

    loadModelAndDetect();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4">Real-time Object Detection</h1>
      <video ref={videoRef} className="border rounded mb-4" autoPlay playsInline muted width="640" height="480" />
      <canvas ref={canvasRef} className="border rounded" />
    </div>
  );
};

export default Index;