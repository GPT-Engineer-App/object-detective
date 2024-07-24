import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Layout = ({ children }) => {
  const location = useLocation();

  const NavLink = ({ to, children }) => (
    <Link to={to} className={`px-4 py-2 ${location.pathname === to ? 'font-bold' : ''}`}>
      {children}
    </Link>
  );

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-gray-100 py-4">
        <nav className="container mx-auto flex justify-center space-x-4">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/live-feed">Live Feed</NavLink>
          <NavLink to="/history">History</NavLink>
          <NavLink to="/settings">Settings</NavLink>
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