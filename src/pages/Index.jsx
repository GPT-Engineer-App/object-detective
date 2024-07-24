import React from 'react';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Welcome to the Object Detection App</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-2">Live Feed</h2>
          <p className="mb-4">Start real-time object detection</p>
          <Link to="/live-feed" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Go to Live Feed
          </Link>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-2">History</h2>
          <p className="mb-4">View past detection results</p>
          <Link to="/history" className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
            View History
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;