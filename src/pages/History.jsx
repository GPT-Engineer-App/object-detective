import React, { useEffect, useState } from 'react';
import { getCountHistory, exportCountsToCSV } from '../utils/storage';
import { Button } from "../components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table"

const History = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      const data = await getCountHistory();
      setHistory(data);
    };
    fetchHistory();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Detection History</h1>
      <Button onClick={exportCountsToCSV} className="mb-4">Export to CSV</Button>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Type</TableHead>
            <TableHead>Count</TableHead>
            <TableHead>Timestamp</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {history.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.type}</TableCell>
              <TableCell>{item.count}</TableCell>
              <TableCell>{new Date(item.timestamp).toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default History;