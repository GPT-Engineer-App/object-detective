import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-backend-webgl';
import * as cocossd from '@tensorflow-models/coco-ssd';
import { updateCounts } from './storage';
import { sendDetectionData } from './api';

let model;

const loadModel = async () => {
  if (!model) {
    model = await cocossd.load();
  }
  return model;
};

const detectAndTrackObjects = async (video, canvas, setCounts) => {
  await tf.setBackend('webgl');
  const cocoModel = await loadModel();

  const ctx = canvas.getContext('2d');
  let objectCounts = {};

  const processFrame = async () => {
    const predictions = await cocoModel.detect(video);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const newCounts = {};

    predictions.forEach((prediction) => {
      const [x, y, width, height] = prediction.bbox;
      const className = prediction.class;

      // Draw bounding box
      ctx.strokeStyle = 'green';
      ctx.lineWidth = 2;
      ctx.strokeRect(x, y, width, height);

      // Draw label
      ctx.fillStyle = 'green';
      ctx.font = '16px Arial';
      ctx.fillText(`${className} (${Math.round(prediction.score * 100)}%)`, x, y > 20 ? y - 5 : 15);

      // Update counts
      if (!newCounts[className]) {
        newCounts[className] = 0;
      }
      newCounts[className]++;
    });

    // Update object counts
    objectCounts = { ...objectCounts, ...newCounts };
    await updateCounts(objectCounts);
    setCounts(objectCounts);

    // Send detection data to backend
    try {
      await sendDetectionData(objectCounts);
    } catch (error) {
      console.error('Error sending detection data to backend:', error);
    }

    requestAnimationFrame(processFrame);
  };

  processFrame();
};

export { detectAndTrackObjects };