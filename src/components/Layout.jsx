import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Layout = ({ children }) => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/live-feed', label: 'Live Feed' },
    { path: '/history', label: 'History' },
    { path: '/settings', label: 'Settings' },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-gray-100 py-4">
        <nav className="container mx-auto flex justify-center space-x-4">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`px-4 py-2 ${
                location.pathname === item.path ? 'font-bold' : ''
              }`}
            >
              {item.label}
            </Link>
          ))}
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