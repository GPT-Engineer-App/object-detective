import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "../components/ui/button"

const Index = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-8">Welcome to the Object Detection App</h1>
      <div className="space-y-4">
        <Link to="/live-feed">
          <Button className="w-full">Go to Live Feed</Button>
        </Link>
        <Link to="/history">
          <Button className="w-full" variant="outline">View History</Button>
        </Link>
        <Link to="/settings">
          <Button className="w-full" variant="outline">Settings</Button>
        </Link>
      </div>
    </div>
  );
};

export default Index;