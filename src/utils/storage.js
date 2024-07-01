import { openDB } from 'idb';

const DB_NAME = 'object-detection-db';
const DB_VERSION = 1;
const STORE_NAME = 'counts';

const initDB = async () => {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
      }
    },
  });
};

export const saveCount = async (count) => {
  const db = await initDB();
  const tx = db.transaction(STORE_NAME, 'readwrite');
  await tx.store.add({ count, timestamp: new Date() });
  await tx.done;
};

export const getCounts = async () => {
  const db = await initDB();
  return db.getAll(STORE_NAME);
};

export const clearCounts = async () => {
  const db = await initDB();
  const tx = db.transaction(STORE_NAME, 'readwrite');
  await tx.store.clear();
  await tx.done;
};