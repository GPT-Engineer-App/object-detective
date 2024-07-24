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
      <main className="flex-grow pb-16 md:pb-0">{children}</main>
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t md:relative md:border-t-0 md:border-b">
        <div className="flex justify-around md:justify-start md:space-x-4 p-2">
          {navItems.map((item) => (
            <Link 
              key={item.path} 
              to={item.path}
              className={`flex flex-col items-center md:flex-row md:space-x-2 px-3 py-2 rounded-md ${
                location.pathname === item.path ? 'bg-gray-200' : ''
              }`}
            >
              <span className="text-xs md:text-sm">{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default Layout;