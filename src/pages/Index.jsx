import React from 'react';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold text-center mb-8">Object Detection App</h1>
      <div className="grid gap-4">
        <Link to="/live-feed" className="block p-4 bg-blue-500 text-white rounded-lg text-center">
          Go to Live Feed
        </Link>
        <Link to="/history" className="block p-4 bg-gray-200 rounded-lg text-center">
          View History
        </Link>
        <Link to="/settings" className="block p-4 bg-gray-200 rounded-lg text-center">
          Open Settings
        </Link>
      </div>
    </div>
  );
};

export default Index;