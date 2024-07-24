import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-backend-webgl';
import * as cocossd from '@tensorflow-models/coco-ssd';

let model;

const loadModel = async () => {
  if (!model) {
    try {
      model = await cocossd.load();
    } catch (error) {
      console.error('Error loading model:', error);
      throw error;
    }
  }
  return model;
};

const detectAndTrackObjects = async (video, canvas, updateCounts) => {
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

      ctx.strokeStyle = 'green';
      ctx.lineWidth = 2;
      ctx.strokeRect(x, y, width, height);

      ctx.fillStyle = 'green';
      ctx.font = '16px Arial';
      ctx.fillText(`${className} (${Math.round(prediction.score * 100)}%)`, x, y > 20 ? y - 5 : 15);

      newCounts[className] = (newCounts[className] || 0) + 1;
    });

    updateCounts(newCounts);

    requestAnimationFrame(processFrame);
  };

  processFrame();
};

export { detectAndTrackObjects };