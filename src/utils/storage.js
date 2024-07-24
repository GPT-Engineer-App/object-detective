import Dexie from 'dexie';

const db = new Dexie('ObjectDetectionDB');
db.version(1).stores({
  counts: '++id, type, count, timestamp'
});

const updateCounts = async (newCounts) => {
  const timestamp = new Date().toISOString();
  
  await db.transaction('rw', db.counts, async () => {
    for (const [type, count] of Object.entries(newCounts)) {
      await db.counts.add({ type, count, timestamp });
    }
  });
};

const getCounts = async () => {
  const counts = await db.counts.toArray();
  return counts.reduce((acc, curr) => {
    if (!acc[curr.type]) {
      acc[curr.type] = 0;
    }
    acc[curr.type] += curr.count;
    return acc;
  }, {});
};

const resetCounts = async () => {
  await db.counts.clear();
};

const getCountHistory = async () => {
  return await db.counts.toArray();
};

const exportCountsToCSV = async () => {
  const counts = await getCountHistory();
  const csvContent = [
    ['Type', 'Count', 'Timestamp'],
    ...counts.map(count => [count.type, count.count, count.timestamp])
  ].map(row => row.join(',')).join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'object_detection_counts.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

export { updateCounts, getCounts, resetCounts, getCountHistory, exportCountsToCSV };