import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { path: '/', label: 'Home' },
  { path: '/live-feed', label: 'Live Feed' },
  { path: '/history', label: 'History' },
  { path: '/settings', label: 'Settings' },
];

const Layout = ({ children }) => {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gray-800 text-white">
        <nav className="container mx-auto py-4">
          <ul className="flex flex-wrap justify-center md:justify-start space-x-4">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`px-3 py-2 rounded-md ${
                    location.pathname === item.path
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main className="flex-grow container mx-auto py-4 px-4 md:px-0">
        {children}
      </main>

      <footer className="bg-gray-800 text-white">
        <div className="container mx-auto py-4 text-center">
          © 2023 Object Detection App
        </div>
      </footer>
    </div>
  );
};

export default Layout;