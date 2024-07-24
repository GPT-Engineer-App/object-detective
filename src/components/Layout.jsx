import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";

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
      <header className="border-b">
        <nav className="container mx-auto py-4 flex flex-wrap justify-center md:justify-start space-x-4">
          {navItems.map((item) => (
            <Button
              key={item.path}
              variant={location.pathname === item.path ? "default" : "ghost"}
              asChild
            >
              <Link to={item.path}>{item.label}</Link>
            </Button>
          ))}
        </nav>
      </header>

      <main className="flex-grow container mx-auto py-4 px-4 md:px-0">
        {children}
      </main>

      <footer className="border-t">
        <div className="container mx-auto py-4 text-center">
          © 2023 Object Detection App
        </div>
      </footer>
    </div>
  );
};

export default Layout;