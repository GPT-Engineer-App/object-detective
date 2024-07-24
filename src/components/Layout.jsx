import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const Layout = ({ children }) => {
  const location = useLocation();

  const NavLink = ({ to, children }) => (
    <Link to={to}>
      <Button
        variant={location.pathname === to ? "default" : "ghost"}
        className="w-full justify-start"
      >
        {children}
      </Button>
    </Link>
  );

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <nav className="flex items-center space-x-4 lg:space-x-6">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/live-feed">Live Feed</NavLink>
            <NavLink to="/history">History</NavLink>
            <NavLink to="/settings">Settings</NavLink>
          </nav>
        </div>
      </header>
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
      <footer className="border-t">
        <div className="container mx-auto px-4 py-6 text-center text-sm">
          © 2024 Object Detection App
        </div>
      </footer>
    </div>
  );
};

export default Layout;