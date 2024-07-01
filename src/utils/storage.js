import AWS from 'aws-sdk';
import mockS3 from 'aws-sdk-mock';

// Initialize the mock S3 service
mockS3.setSDKInstance(AWS);
mockS3.mock('S3', 'putObject', (params, callback) => {
  callback(null, { ETag: '"mock-etag"' });
});

/**
 * storage.js
 * Utility functions for managing detection counts using IndexedDB.
 * 
 * TODO:
 * - Collect new data during app usage.
 * - Retrain the model with new data.
 * - Update the deployed model with the retrained version.
 * - Implement additional features or optimizations as needed.
 */

/**
 * Initializes the IndexedDB database for storing detection counts.
 */
const initDB = async () => {
  if (!window.indexedDB) {
    console.error("Your browser doesn't support a stable version of IndexedDB.");
    return;
  }

  const request = indexedDB.open('countsDB', 1);

  request.onupgradeneeded = (event) => {
    const db = event.target.result;
    if (!db.objectStoreNames.contains('counts')) {
      db.createObjectStore('counts', { keyPath: 'type' });
    }
  };

  request.onerror = (event) => {
    console.error('Database error:', event.target.errorCode);
  };
};

/**
 * Updates the detection counts in the IndexedDB.
 * @param {Array} predictions - Array of detection predictions.
 * @param {Function} setCounts - Function to update the detection counts.
 */
const updateCounts = async (predictions, setCounts) => {
  const request = indexedDB.open('countsDB', 1);

  request.onsuccess = (event) => {
    const db = event.target.result;
    const transaction = db.transaction(['counts'], 'readwrite');
    const store = transaction.objectStore('counts');

    const counts = {};

    predictions.forEach(prediction => {
      const type = prediction.class;
      if (!counts[type]) {
        counts[type] = 0;
      }
      counts[type] += 1;
    });

    for (const [type, count] of Object.entries(counts)) {
      const getRequest = store.get(type);
      getRequest.onsuccess = () => {
        const data = getRequest.result || { type, count: 0 };
        data.count += count;
        store.put(data);
      };
    }

    transaction.oncomplete = async () => {
      const allCounts = await getCounts();
      setCounts(allCounts);
    };
  };

  request.onerror = (event) => {
    console.error('Database error:', event.target.errorCode);
  };
};

/**
 * Retrieves the detection counts from the IndexedDB.
 * @returns {Promise<Object>} - A promise that resolves to an object containing detection counts.
 */
const getCounts = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('countsDB', 1);

    request.onsuccess = (event) => {
      const db = event.target.result;
      const transaction = db.transaction(['counts'], 'readonly');
      const store = transaction.objectStore('counts');

      const allCounts = {};
      store.openCursor().onsuccess = (event) => {
        const cursor = event.target.result;
        if (cursor) {
          allCounts[cursor.key] = cursor.value.count;
          cursor.continue();
        } else {
          resolve(allCounts);
        }
      };
    };

    request.onerror = (event) => {
      console.error('Database error:', event.target.errorCode);
      reject(event.target.errorCode);
    };
  });
};

/**
 * Resets the detection counts in the IndexedDB.
 */
const resetCounts = () => {
  const request = indexedDB.open('countsDB', 1);

  request.onsuccess = (event) => {
    const db = event.target.result;
    const transaction = db.transaction(['counts'], 'readwrite');
    const store = transaction.objectStore('counts');
    store.clear();
  };

  request.onerror = (event) => {
    console.error('Database error:', event.target.errorCode);
  };
};

initDB();

export { updateCounts, getCounts, resetCounts };