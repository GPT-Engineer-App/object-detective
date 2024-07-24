import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-backend-webgl';
import * as yolo from 'yolov5js';
import { updateCounts } from './storage';

const MODEL_PATH = '/path/to/your/yolov5/model.json'; // Update this path
const CLASS_NAMES = ['aluminium can', 'HDPE2 plastic bottle', 'PET1 plastic bottle', 'glass bottle', 'milk carton'];

let model;

const loadModel = async () => {
  if (!model) {
    model = await yolo.load(MODEL_PATH);
  }
  return model;
};

const detectAndTrackObjects = async (video, canvas, setCounts) => {
  await tf.setBackend('webgl');
  const yoloModel = await loadModel();

  const ctx = canvas.getContext('2d');
  let objectIds = {};
  let nextId = 1;

  const processFrame = async () => {
    const [modelWidth, modelHeight] = yoloModel.inputShape;
    const input = tf.tidy(() => {
      return tf.image.resizeBilinear(tf.browser.fromPixels(video), [modelWidth, modelHeight])
        .div(255.0)
        .expandDims(0);
    });

    const predictions = await yoloModel.predict(input);
    input.dispose();

    const detections = yolo.filterBoxes(predictions, 0.25, 0.45);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const newCounts = {};

    for (const detection of detections) {
      const [x, y, width, height] = detection.bbox;
      const className = CLASS_NAMES[detection.class];

      // Simple tracking: assign new ID if object is not already tracked
      if (!objectIds[className]) {
        objectIds[className] = nextId++;
      }
      const id = objectIds[className];

      // Draw bounding box
      ctx.strokeStyle = 'green';
      ctx.lineWidth = 2;
      ctx.strokeRect(x, y, width, height);

      // Draw label
      ctx.fillStyle = 'green';
      ctx.font = '16px Arial';
      ctx.fillText(`${className} (ID: ${id})`, x, y > 20 ? y - 5 : 15);

      // Update counts
      if (!newCounts[className]) {
        newCounts[className] = 0;
      }
      newCounts[className]++;
    }

    updateCounts(newCounts, setCounts);
    requestAnimationFrame(processFrame);
  };

  processFrame();
};

export { detectAndTrackObjects };