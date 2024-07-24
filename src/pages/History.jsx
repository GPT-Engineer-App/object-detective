import React, { useEffect, useState } from 'react';
import { exportCountsToCSV } from '../utils/storage';
import { fetchCountHistory } from '../utils/api';
import { Button } from "../components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table"
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert"
import { AlertCircle } from "lucide-react"

const History = () => {
  const [history, setHistory] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await fetchCountHistory();
        setHistory(data);
      } catch (err) {
        setError('Failed to load count history. Please try again later.');
        console.error('Error fetching count history:', err);
      }
    };
    fetchHistory();
  }, []);

  const handleExport = async () => {
    try {
      await exportCountsToCSV();
    } catch (err) {
      setError('Failed to export counts. Please try again.');
      console.error('Error exporting counts:', err);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Detection History</h1>
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <Button onClick={handleExport} className="mb-4">Export to CSV</Button>
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