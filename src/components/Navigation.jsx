import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Home, Camera, History, Settings } from 'lucide-react';

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/live-feed', icon: Camera, label: 'Live Feed' },
    { path: '/history', icon: History, label: 'History' },
    { path: '/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 sm:px-0 sm:top-0 sm:bottom-auto">
      <div className="flex justify-around sm:justify-center sm:space-x-4">
        {navItems.map((item) => (
          <Link key={item.path} to={item.path}>
            <Button
              variant={location.pathname === item.path ? "default" : "ghost"}
              className="flex flex-col items-center sm:flex-row sm:space-x-2 px-3 py-2"
            >
              <item.icon className="h-5 w-5" />
              <span className="text-xs sm:text-sm">{item.label}</span>
            </Button>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;