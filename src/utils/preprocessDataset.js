/**
 * preprocessDataset.js
 * Utility script for preprocessing image datasets for training.
 */

import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import * as tf from '@tensorflow/tfjs-node';
import { split } from 'lodash';

const IMAGE_SIZE = 320;
const TRAIN_RATIO = 0.8;

/**
 * Preprocesses a single image.
 * @param {string} imagePath - Path to the image file.
 * @returns {tf.Tensor} - Preprocessed image tensor.
 */
const preprocessImage = async (imagePath) => {
  const image = await sharp(imagePath)
    .resize(IMAGE_SIZE, IMAGE_SIZE)
    .toBuffer();
  const tensor = tf.node.decodeImage(image);
  const normalized = tensor.div(tf.scalar(255));
  return normalized;
};

/**
 * Preprocesses the entire dataset and splits it into training and validation sets.
 * @param {string} datasetDir - Directory containing the dataset images.
 * @param {string} outputDir - Directory to save the preprocessed images.
 */
const preprocessDataset = async (datasetDir, outputDir) => {
  const files = fs.readdirSync(datasetDir);
  const totalFiles = files.length;
  const trainCount = Math.floor(totalFiles * TRAIN_RATIO);
  const shuffledFiles = _.shuffle(files);

  const trainFiles = shuffledFiles.slice(0, trainCount);
  const valFiles = shuffledFiles.slice(trainCount);

  const saveDataset = async (files, subset) => {
    const subsetDir = path.join(outputDir, subset);
    if (!fs.existsSync(subsetDir)) {
      fs.mkdirSync(subsetDir, { recursive: true });
    }

    for (const file of files) {
      const imagePath = path.join(datasetDir, file);
      const processedImage = await preprocessImage(imagePath);
      const outputFilePath = path.join(subsetDir, file);
      const buffer = await tf.node.encodeJpeg(processedImage);
      fs.writeFileSync(outputFilePath, buffer);
    }
  };

  await saveDataset(trainFiles, 'train');
  await saveDataset(valFiles, 'val');
};

export default preprocessDataset;