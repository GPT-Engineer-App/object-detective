import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

const dbPromise = open({
  filename: './counts.db',
  driver: sqlite3.Database
});

const initDB = async () => {
  const db = await dbPromise;
  await db.exec('CREATE TABLE IF NOT EXISTS counts (id INTEGER PRIMARY KEY, type TEXT, count INTEGER)');
};

const updateCounts = async (predictions, setCounts) => {
  const db = await dbPromise;
  const counts = {};

  for (const prediction of predictions) {
    const type = prediction.class;
    if (!counts[type]) {
      counts[type] = 0;
    }
    counts[type] += 1;
  }

  for (const [type, count] of Object.entries(counts)) {
    await db.run('INSERT INTO counts (type, count) VALUES (?, ?) ON CONFLICT(type) DO UPDATE SET count = count + ?', [type, count, count]);
  }

  const rows = await db.all('SELECT type, SUM(count) as count FROM counts GROUP BY type');
  const newCounts = {};
  rows.forEach(row => {
    newCounts[row.type] = row.count;
  });

  setCounts(newCounts);
};

const getCounts = async () => {
  const db = await dbPromise;
  const rows = await db.all('SELECT type, SUM(count) as count FROM counts GROUP BY type');
  const counts = {};
  rows.forEach(row => {
    counts[row.type] = row.count;
  });
  return counts;
};

const resetCounts = async () => {
  const db = await dbPromise;
  await db.exec('DELETE FROM counts');
};

initDB();

export { updateCounts, getCounts, resetCounts };