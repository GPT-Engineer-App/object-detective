/**
 * detection.js
 * Utility functions for object detection and tracking using YOLOv5.
 */

import * as tf from '@tensorflow/tfjs';
import { YOLOv5 } from 'yolov5';
import { updateCounts } from './storage';

/**
 * Detects and tracks objects in the video stream.
 * @param {HTMLVideoElement} video - The video element.
 * @param {HTMLCanvasElement} canvas - The canvas element for drawing detections.
 * @param {Function} setCounts - Function to update the detection counts.
 */
const detectAndTrackObjects = async (video, canvas, setCounts) => {
  const yolo = new YOLOv5();

  await yolo.load();
  const ctx = canvas.getContext('2d');

  const processFrame = async () => {
    const predictions = await yolo.detect(video);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    predictions.forEach(prediction => {
      const [x, y, width, height] = prediction.bbox;
      ctx.strokeStyle = 'green';
      ctx.lineWidth = 2;
      ctx.strokeRect(x, y, width, height);
      ctx.fillText(`ID: ${prediction.class}`, x, y > 10 ? y - 5 : 10);
    });

    updateCounts(predictions, setCounts);
    requestAnimationFrame(processFrame);
  };

  processFrame();
};

export { detectAndTrackObjects };