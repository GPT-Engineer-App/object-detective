import React from 'react';
import { Link } from 'react-router-dom';

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-gray-100 py-4">
        <nav className="container mx-auto flex justify-center space-x-4">
          <Link to="/" className="px-4 py-2">Home</Link>
          <Link to="/live-feed" className="px-4 py-2">Live Feed</Link>
          <Link to="/history" className="px-4 py-2">History</Link>
          <Link to="/settings" className="px-4 py-2">Settings</Link>
        </nav>
      </header>
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
      <footer className="bg-gray-100 py-4">
        <div className="container mx-auto text-center text-sm">
          © 2024 Object Detection App
        </div>
      </footer>
    </div>
  );
};

export default Layout;