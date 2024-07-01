import React from 'react';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4">Welcome to the Object Detection App</h1>
      <Link to="/live-feed" className="p-4 bg-blue-500 text-white rounded">Go to Live Feed</Link>
    </div>
  );
};

export default Index;