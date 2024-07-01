/**
 * detection.js
 * Utility functions for object detection and tracking using YOLOv5.
 * 
 * TODO:
 * - Collect new data during app usage.
 * - Retrain the model with new data.
 * - Update the deployed model with the retrained version.
 * - Implement additional features or optimizations as needed.
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

  // Load the YOLOv5 model
  await yolo.load();
  const ctx = canvas.getContext('2d');

  // Function to process each frame of the video
  const processFrame = async () => {
    // Perform object detection on the current frame
    const predictions = await yolo.detect(video);

    // Clear the canvas before drawing new detections
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    predictions.forEach(prediction => {
      const [x, y, width, height] = prediction.bbox;
      ctx.strokeStyle = 'green';
      ctx.lineWidth = 2;
      ctx.strokeRect(x, y, width, height);
      ctx.fillText(`ID: ${prediction.class}`, x, y > 10 ? y - 5 : 10);
    });

    // Update the detection counts
    updateCounts(predictions, setCounts);
    requestAnimationFrame(processFrame);
  };

  // Start processing frames
  processFrame();
};

export { detectAndTrackObjects };